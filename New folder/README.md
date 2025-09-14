# 📱 PDF Mobile - Complete PDF Toolkit

A comprehensive web application for PDF processing with 30+ tools, similar to iLovePDF mobile experience.

## 🚀 Features

### 📂 Organize PDF (10 tools)
- ✅ **Compress PDF** - Reduce file size while maintaining quality
- ✅ **Merge PDF** - Combine multiple PDFs into one
- ✅ **Split PDF** - Extract pages into separate files
- ✅ **Remove Pages** - Delete unwanted pages
- ✅ **Extract Pages** - Extract specific pages
- ⚡ **Organize PDF** - Rearrange page order
- ✅ **Scan to PDF** - Convert images to PDF
- ⚡ **Optimize PDF** - Improve performance
- ✅ **Repair PDF** - Fix corrupted files
- ⚡ **OCR PDF** - Make scanned text searchable

### ➡️ Convert to PDF (5 tools)
- ✅ **JPG to PDF** - Convert images to PDF
- ⚡ **WORD to PDF** - Convert Word documents
- ⚡ **POWERPOINT to PDF** - Convert presentations
- ⚡ **EXCEL to PDF** - Convert spreadsheets
- ⚡ **HTML to PDF** - Convert web pages

### ⬅️ Convert from PDF (5 tools)
- ✅ **PDF to JPG** - Extract pages as images
- ⚡ **PDF to WORD** - Convert to editable documents
- ⚡ **PDF to POWERPOINT** - Convert to presentations
- ⚡ **PDF to EXCEL** - Extract tables to spreadsheets
- ⚡ **PDF to PDF/A** - Archive format conversion

### ✏️ Edit PDF (5 tools)
- ✅ **Rotate PDF** - Change page orientation
- ⚡ **Add Page Numbers** - Number your pages
- ✅ **Add Watermark** - Protect with watermarks
- ⚡ **Crop PDF** - Remove unwanted margins
- ⚡ **Edit PDF** - Add text and annotations

### 🔒 PDF Security (5 tools)
- ⚡ **Unlock PDF** - Remove password protection
- ⚡ **Protect PDF** - Add password security
- ⚡ **Sign PDF** - Digital signatures
- ⚡ **Redact PDF** - Remove sensitive information
- ⚡ **Compare PDF** - Find differences between documents

**Legend:** ✅ = Working | ⚡ = Coming Soon

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Quick Start

1. **Clone or download this project**
2. **Open terminal in project folder**
3. **Run the startup script:**

#### On Windows:
```bash
# Double-click on start-server.bat
# OR run in command prompt:
start-server.bat
```

#### On Mac/Linux:
```bash
# Install dependencies
npm install

# Start the server
npm start
```

4. **Open your web browser and go to:**
```
http://localhost:3000
```

## 🎯 How It Works

### Backend (Node.js + Express)
- **Real PDF processing** using pdf-lib, sharp, and other libraries
- **File upload handling** with multer
- **Automatic cleanup** of temporary files
- **RESTful API** endpoints for each tool

### Frontend (HTML + CSS + JavaScript)
- **Mobile-first responsive** design
- **Interactive file upload** with drag & drop
- **Real-time processing** feedback
- **Download management** for processed files

## 📁 Project Structure

```
pdf-mobile/
├── index.html          # Main website
├── styles.css          # Styling and animations
├── script.js           # Frontend interactions
├── api.js              # API communication
├── server.js           # Backend server
├── package.json        # Dependencies
├── start-server.bat    # Windows startup script
├── uploads/            # Temporary upload folder
├── output/             # Processed files folder
└── README.md           # This file
```

## 🔧 Available API Endpoints

```
POST /api/compress-pdf      - Compress PDF files
POST /api/merge-pdf         - Merge multiple PDFs
POST /api/split-pdf         - Split PDF into pages
POST /api/jpg-to-pdf        - Convert images to PDF
POST /api/pdf-to-jpg        - Convert PDF to images
POST /api/add-watermark     - Add watermark to PDF
POST /api/rotate-pdf        - Rotate PDF pages
GET  /download/:filename    - Download processed files
GET  /health               - Server health check
```

## 🎨 Features

### ✨ User Experience
- **Beautiful gradient UI** inspired by iLovePDF
- **Smooth animations** and transitions
- **Loading screens** with progress bars
- **Error handling** with helpful messages
- **Mobile responsive** design

### ⚡ Performance
- **Automatic file cleanup** (files deleted after 1 hour)
- **File size limits** (50MB max)
- **Progress tracking** for long operations
- **Optimized processing** algorithms

### 🔒 Security
- **File type validation**
- **Temporary file storage**
- **Automatic cleanup**
- **No permanent file storage**

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Production
```bash
npm start
```

### Environment Variables
```bash
PORT=3000  # Server port (default: 3000)
```

## 🤝 Contributing

Want to add more PDF tools? Here's how:

1. **Add API endpoint** in `server.js`
2. **Update tool mapping** in `api.js`
3. **Add file type support** for new formats
4. **Test the functionality**

## 📝 License

This project is open source and available under the MIT License.

## 🎉 Acknowledgments

- Inspired by iLovePDF.com mobile experience
- Built with modern web technologies
- Uses open-source PDF processing libraries

---

**Made with ❤️ for PDF processing enthusiasts!**

### 💡 Need Help?

If you encounter any issues:

1. Make sure Node.js is installed
2. Check if port 3000 is available
3. Ensure all dependencies are installed (`npm install`)
4. Check the console for error messages

For more help, check the browser console (F12) for detailed error messages.