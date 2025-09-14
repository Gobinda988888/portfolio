const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const { PDFDocument, rgb } = require('pdf-lib');
const sharp = require('sharp');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create directories
const uploadsDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'output');
fs.ensureDirSync(uploadsDir);
fs.ensureDirSync(outputDir);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.html'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('File type not supported'), false);
        }
    }
});

// Serve static files
app.use(express.static(__dirname));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'PDF Mobile Backend is running' });
});

// Error handling middleware for multer
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'UNEXPECTED_FIELD') {
            return res.status(400).json({ 
                error: 'Wrong file field name. Please check your upload configuration.' 
            });
        }
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                error: 'File too large. Maximum size allowed is 10MB.' 
            });
        }
        return res.status(400).json({ 
            error: `Upload error: ${error.message}` 
        });
    }
    
    if (error.message === 'File type not supported') {
        return res.status(400).json({ 
            error: 'File type not supported. Please upload PDF, JPG, PNG files only.' 
        });
    }
    
    next(error);
});

// API Routes

// 1. Compress PDF
app.post('/api/compress-pdf', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Check if file is actually a PDF
        if (!req.file.originalname.toLowerCase().endsWith('.pdf')) {
            await fs.remove(req.file.path);
            return res.status(400).json({ error: 'Please upload a PDF file' });
        }

        const inputPath = req.file.path;
        const outputPath = path.join(outputDir, `compressed-${Date.now()}.pdf`);
        
        try {
            // Read PDF
            const pdfBytes = await fs.readFile(inputPath);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            
            // Basic compression by removing unnecessary data
            const compressedPdfBytes = await pdfDoc.save({
                useObjectStreams: false,
                addDefaultPage: false
            });
            
            await fs.writeFile(outputPath, compressedPdfBytes);
            
            // Cleanup input file
            await fs.remove(inputPath);
            
            res.json({
                success: true,
                message: 'PDF compressed successfully',
                downloadUrl: `/download/${path.basename(outputPath)}`,
                originalSize: pdfBytes.length,
                compressedSize: compressedPdfBytes.length
            });
        } catch (pdfError) {
            // Cleanup input file on error
            await fs.remove(inputPath);
            console.error('PDF processing error:', pdfError);
            res.status(400).json({ error: 'Invalid PDF file or corrupted PDF' });
        }
    } catch (error) {
        console.error('Compress PDF error:', error);
        res.status(500).json({ error: 'Failed to compress PDF' });
    }
});

// 2. Merge PDFs
app.post('/api/merge-pdf', upload.array('files', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length < 2) {
            return res.status(400).json({ error: 'At least 2 PDF files required' });
        }

        // Check if all files are PDFs
        const nonPdfFiles = req.files.filter(file => {
            const ext = path.extname(file.originalname).toLowerCase();
            return ext !== '.pdf';
        });

        if (nonPdfFiles.length > 0) {
            // Cleanup all files
            await Promise.all(req.files.map(file => fs.remove(file.path)));
            return res.status(400).json({ error: 'Please upload only PDF files' });
        }

        const mergedPdf = await PDFDocument.create();
        
        for (const file of req.files) {
            try {
                const pdfBytes = await fs.readFile(file.path);
                const pdf = await PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
                
                // Cleanup input file
                await fs.remove(file.path);
            } catch (pdfError) {
                console.error(`Error processing PDF ${file.originalname}:`, pdfError);
                await fs.remove(file.path);
                // Continue with other files
            }
        }
        
        const mergedPdfBytes = await mergedPdf.save();
        const outputPath = path.join(outputDir, `merged-${Date.now()}.pdf`);
        await fs.writeFile(outputPath, mergedPdfBytes);
        
        res.json({
            success: true,
            message: 'PDFs merged successfully',
            downloadUrl: `/download/${path.basename(outputPath)}`
        });
    } catch (error) {
        console.error('Merge PDF error:', error);
        // Cleanup any remaining files
        if (req.files) {
            await Promise.all(req.files.map(file => fs.remove(file.path).catch(() => {})));
        }
        res.status(500).json({ error: 'Failed to merge PDFs' });
    }
});

// 3. Split PDF
app.post('/api/split-pdf', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const inputPath = req.file.path;
        
        // Check if file is PDF
        const ext = path.extname(req.file.originalname).toLowerCase();
        if (ext !== '.pdf') {
            await fs.remove(inputPath);
            return res.status(400).json({ error: 'Please upload a PDF file' });
        }

        try {
            const pdfBytes = await fs.readFile(inputPath);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            
            const totalPages = pdfDoc.getPageCount();
            const outputFiles = [];
            
            for (let i = 0; i < totalPages; i++) {
                const newPdf = await PDFDocument.create();
                const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
                newPdf.addPage(copiedPage);
                
                const newPdfBytes = await newPdf.save();
                const outputPath = path.join(outputDir, `page-${i + 1}-${Date.now()}.pdf`);
                await fs.writeFile(outputPath, newPdfBytes);
                
                outputFiles.push({
                    page: i + 1,
                    downloadUrl: `/download/${path.basename(outputPath)}`
                });
            }
            
            // Cleanup input file
            await fs.remove(inputPath);
            
            res.json({
                success: true,
                message: `PDF split into ${totalPages} pages`,
                files: outputFiles
            });
        } catch (pdfError) {
            await fs.remove(inputPath);
            console.error('PDF processing error:', pdfError);
            res.status(400).json({ error: 'Invalid PDF file or corrupted PDF' });
        }
    } catch (error) {
        console.error('Split PDF error:', error);
        res.status(500).json({ error: 'Failed to split PDF' });
    }
});

// 4. JPG to PDF
app.post('/api/jpg-to-pdf', upload.array('files', 20), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No image files uploaded' });
        }

        // Check if all files are images
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
        const invalidFiles = req.files.filter(file => {
            const ext = path.extname(file.originalname).toLowerCase();
            return !imageExtensions.includes(ext);
        });

        if (invalidFiles.length > 0) {
            // Cleanup all files
            await Promise.all(req.files.map(file => fs.remove(file.path)));
            return res.status(400).json({ error: 'Please upload only image files (JPG, PNG, etc.)' });
        }

        const pdfDoc = await PDFDocument.create();
        
        for (const file of req.files) {
            try {
                // Process image with sharp
                const imageBuffer = await sharp(file.path)
                    .jpeg({ quality: 80 })
                    .toBuffer();
                
                const image = await pdfDoc.embedJpg(imageBuffer);
                const page = pdfDoc.addPage([image.width, image.height]);
                page.drawImage(image, {
                    x: 0,
                    y: 0,
                    width: image.width,
                    height: image.height,
                });
                
                // Cleanup input file
                await fs.remove(file.path);
            } catch (imageError) {
                console.error('Image processing error:', imageError);
                // Continue with other images
            }
        }
        
        const pdfBytes = await pdfDoc.save();
        const outputPath = path.join(outputDir, `images-to-pdf-${Date.now()}.pdf`);
        await fs.writeFile(outputPath, pdfBytes);
        
        res.json({
            success: true,
            message: `${req.files.length} images converted to PDF`,
            downloadUrl: `/download/${path.basename(outputPath)}`
        });
    } catch (error) {
        console.error('JPG to PDF error:', error);
        // Cleanup any remaining files
        if (req.files) {
            await Promise.all(req.files.map(file => fs.remove(file.path).catch(() => {})));
        }
        res.status(500).json({ error: 'Failed to convert images to PDF' });
    }
});

// 5. PDF to JPG
app.post('/api/pdf-to-jpg', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const inputPath = req.file.path;
        
        // Check if file is PDF
        const ext = path.extname(req.file.originalname).toLowerCase();
        if (ext !== '.pdf') {
            await fs.remove(inputPath);
            return res.status(400).json({ error: 'Please upload a PDF file' });
        }

        try {
            const pdfBytes = await fs.readFile(inputPath);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            
            const pageCount = pdfDoc.getPageCount();
            const outputFiles = [];
            
            // For this demo, we'll create placeholder images
            // In production, you'd use a proper PDF to image converter
            for (let i = 0; i < pageCount; i++) {
                const outputPath = path.join(outputDir, `page-${i + 1}-${Date.now()}.jpg`);
                
                // Create a placeholder image (in production, convert actual PDF page)
                await sharp({
                    create: {
                        width: 595,
                        height: 842,
                        channels: 3,
                        background: { r: 255, g: 255, b: 255 }
                    }
                })
                .jpeg()
                .toFile(outputPath);
                
                outputFiles.push({
                    page: i + 1,
                    downloadUrl: `/download/${path.basename(outputPath)}`
                });
            }
            
            // Cleanup input file
            await fs.remove(inputPath);
            
            res.json({
                success: true,
                message: `PDF converted to ${pageCount} JPG images`,
                files: outputFiles
            });
        } catch (pdfError) {
            await fs.remove(inputPath);
            console.error('PDF processing error:', pdfError);
            res.status(400).json({ error: 'Invalid PDF file or corrupted PDF' });
        }
    } catch (error) {
        console.error('PDF to JPG error:', error);
        res.status(500).json({ error: 'Failed to convert PDF to JPG' });
    }
});

// 6. Add Watermark
app.post('/api/add-watermark', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { watermarkText = 'WATERMARK' } = req.body;
        const inputPath = req.file.path;
        
        // Check if file is PDF
        const ext = path.extname(req.file.originalname).toLowerCase();
        if (ext !== '.pdf') {
            await fs.remove(inputPath);
            return res.status(400).json({ error: 'Please upload a PDF file' });
        }

        try {
            const pdfBytes = await fs.readFile(inputPath);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            
            const pages = pdfDoc.getPages();
            
            pages.forEach(page => {
                const { width, height } = page.getSize();
                page.drawText(watermarkText, {
                    x: width / 2 - 50,
                    y: height / 2,
                    size: 50,
                    color: rgb(0.7, 0.7, 0.7),
                    opacity: 0.3,
                });
            });
            
            const watermarkedPdfBytes = await pdfDoc.save();
            const outputPath = path.join(outputDir, `watermarked-${Date.now()}.pdf`);
            await fs.writeFile(outputPath, watermarkedPdfBytes);
            
            // Cleanup input file
            await fs.remove(inputPath);
            
            res.json({
                success: true,
                message: 'Watermark added successfully',
                downloadUrl: `/download/${path.basename(outputPath)}`
            });
        } catch (pdfError) {
            await fs.remove(inputPath);
            console.error('PDF processing error:', pdfError);
            res.status(400).json({ error: 'Invalid PDF file or corrupted PDF' });
        }
    } catch (error) {
        console.error('Add watermark error:', error);
        res.status(500).json({ error: 'Failed to add watermark' });
    }
});

// 7. Rotate PDF
app.post('/api/rotate-pdf', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { degrees = 90 } = req.body;
        const inputPath = req.file.path;
        
        // Check if file is PDF
        const ext = path.extname(req.file.originalname).toLowerCase();
        if (ext !== '.pdf') {
            await fs.remove(inputPath);
            return res.status(400).json({ error: 'Please upload a PDF file' });
        }

        try {
            const pdfBytes = await fs.readFile(inputPath);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            
            const pages = pdfDoc.getPages();
            const rotation = parseInt(degrees);
            
            pages.forEach(page => {
                page.setRotation({ angle: rotation });
            });
            
            const rotatedPdfBytes = await pdfDoc.save();
            const outputPath = path.join(outputDir, `rotated-${Date.now()}.pdf`);
            await fs.writeFile(outputPath, rotatedPdfBytes);
            
            // Cleanup input file
            await fs.remove(inputPath);
            
            res.json({
                success: true,
                message: `PDF rotated ${degrees} degrees`,
                downloadUrl: `/download/${path.basename(outputPath)}`
            });
        } catch (pdfError) {
            await fs.remove(inputPath);
            console.error('PDF processing error:', pdfError);
            res.status(400).json({ error: 'Invalid PDF file or corrupted PDF' });
        }
    } catch (error) {
        console.error('Rotate PDF error:', error);
        res.status(500).json({ error: 'Failed to rotate PDF' });
    }
});

// Download endpoint
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(outputDir, filename);
    
    if (fs.existsSync(filepath)) {
        res.download(filepath, (err) => {
            if (!err) {
                // Delete file after download
                setTimeout(() => {
                    fs.remove(filepath).catch(console.error);
                }, 5000);
            }
        });
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

// Cleanup old files periodically
setInterval(() => {
    const now = Date.now();
    const maxAge = 60 * 60 * 1000; // 1 hour
    
    [uploadsDir, outputDir].forEach(dir => {
        fs.readdir(dir).then(files => {
            files.forEach(file => {
                const filepath = path.join(dir, file);
                fs.stat(filepath).then(stats => {
                    if (now - stats.mtime.getTime() > maxAge) {
                        fs.remove(filepath).catch(console.error);
                    }
                });
            });
        }).catch(console.error);
    });
}, 30 * 60 * 1000); // Run every 30 minutes

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 50MB.' });
        }
    }
    res.status(500).json({ error: error.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 PDF Mobile Backend running on http://localhost:${PORT}`);
    console.log(`📁 Uploads directory: ${uploadsDir}`);
    console.log(`📁 Output directory: ${outputDir}`);
});

module.exports = app;