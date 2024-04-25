import fs, { Dir } from 'fs'
import path from 'path'

class DirectoryIo {
    constructor() {
        if (!DirectoryIo.instance) {
            DirectoryIo.instance = this
        }
        return DirectoryIo.instance
    }

    /**
     * Create directories (recursive)
     * @param {string} dest
     *        path of a directory
     */
    async create(dest) {
        fs.mkdirSync(dest, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
}

export const directoryIo = new DirectoryIo()
