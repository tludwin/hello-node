class FileInfoHandler {

    public getFileName(req: any, res: any): any {

        let filename = req.params.filename
        res.end(JSON.stringify({
            error: null,
            message: 'You asked for ' + filename,
            fileYouAskedFor: filename
        }))
    }
}

export { FileInfoHandler }