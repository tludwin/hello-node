// import express = require('express')
// import morgan = require('morgan')
// import multer = require('multer')

class FileHandler {
    // upload: multer;

    // constructor() {
    //     // this.upload = multer({ dest: 'uploads/' })
    // }

    public add(req: any, res: any): any {

        let x = req.params.x
        let y = req.params.y
        res.end(JSON.stringify({
            error: null,
            result: parseInt(x) + parseInt(y)
        }))
    }


}

export { FileHandler }