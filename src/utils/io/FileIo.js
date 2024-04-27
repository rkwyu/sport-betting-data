import fs from 'fs'
import path from 'path'

import { directoryIo } from './DirectoryIo.js'

/**
 * File IO
 */
class FileIo {
    constructor() {
        if (!FileIo.instance) {
            FileIo.instance = this
        }
        return FileIo.instance
    }

    /**
     * Write a text content to a file
     * @param {string} content 
     * @param {string} dest 
     *        path of the an output file
     * @param {boolean} overwrite 
     *        default: false
     */
    async write(content, dest, overwrite) {
        if (content) {
            overwrite = overwrite || false
            if (!fs.existsSync(dest) || overwrite) {
                await directoryIo.create(path.dirname(dest))
                fs.writeFileSync(dest, content);
                console.log(`Wrote: ${dest}`)
            } else {
                console.error(`File existed: ${dest}`)
            }
        }
    }
}

export const fileIo = new FileIo()
