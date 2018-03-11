import multer = require('multer')

class FileInfoService {
    count: number;

    constructor() {
        this.count = 0
    }

    public getInvokstionCount(): String {
        var localCount = ++this.count

        return 'Invoked ' + localCount + ' time(s)'
    }
}

export { FileInfoService }