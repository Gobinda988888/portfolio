// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Tool mapping to API endpoints
const TOOL_API_MAP = {
    'Compress PDF': 'compress-pdf',
    'Merge PDF': 'merge-pdf',
    'Split PDF': 'split-pdf',
    'JPG to PDF': 'jpg-to-pdf',
    'PDF to JPG': 'pdf-to-jpg',
    'Add Watermark': 'add-watermark',
    'Rotate PDF': 'rotate-pdf',
    'Organize PDF': 'organize-pdf',
    'Remove Pages': 'remove-pages',
    'Extract Pages': 'extract-pages'
};

// File type mappings for each tool
const TOOL_FILE_TYPES = {
    'Compress PDF': ['.pdf'],
    'Merge PDF': ['.pdf'],
    'Split PDF': ['.pdf'],
    'JPG to PDF': ['.jpg', '.jpeg', '.png'],
    'PDF to JPG': ['.pdf'],
    'Add Watermark': ['.pdf'],
    'Rotate PDF': ['.pdf'],
    'WORD to PDF': ['.doc', '.docx'],
    'POWERPOINT to PDF': ['.ppt', '.pptx'],
    'EXCEL to PDF': ['.xls', '.xlsx'],
    'HTML to PDF': ['.html', '.htm']
};

// API call function
async function callAPI(endpoint, formData, onProgress) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Processing failed');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// File upload and processing function
async function processFileWithAPI(toolName, files, options = {}) {
    const endpoint = TOOL_API_MAP[toolName];
    
    if (!endpoint) {
        throw new Error(`Tool "${toolName}" is not yet implemented`);
    }

    const formData = new FormData();
    
    // Handle multiple files vs single file
    if (Array.isArray(files)) {
        files.forEach(file => {
            formData.append('files', file);
        });
    } else {
        formData.append('file', files);
    }

    // Add any additional options
    Object.keys(options).forEach(key => {
        formData.append(key, options[key]);
    });

    return await callAPI(endpoint, formData);
}

// Check if backend is running
async function checkBackendStatus() {
    try {
        const response = await fetch('http://localhost:3000/health');
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Download file function
function downloadFile(downloadUrl, filename) {
    const link = document.createElement('a');
    link.href = `http://localhost:3000${downloadUrl}`;
    link.download = filename || 'processed-file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}