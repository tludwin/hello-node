import express = require('express')
import morgan = require('morgan')
import multer = require('multer')

class FileService {
    upload: multer;

    constructor() {
        this.upload = multer({ dest: 'uploads/' })
    }

    
}

export { FileService }