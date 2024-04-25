import dateAndTime from 'date-and-time';
import fs from 'fs'

import { resultFetcher } from '../fetcher/ResultFetcher.js'
import { fileIo } from '../../../utils/io/FileIo.js'
import { configLoader } from '../../../utils/io/ConfigLoader.js'

const outputDir = await configLoader.load("DIRECTORY", "output")

class MarksixService {
    constructor() {
        if (!MarksixService.instance) {
            MarksixService.instance = this
        }
        return MarksixService.instance;
    }

    /**
     * Wrote marksix results
     * @param {?int} from 
     *        from year
     * @param {?int} to 
     *        to year
     */
    async marksix(from, to) {
        let curYear = parseInt(dateAndTime.format(new Date(), "YYYY"))
        from = from || 1993
        to = to || curYear
        for (let year = from; year <= to; year++) {
            let dest = `${outputDir}/hkjc/marksix/${year}.json`
            if (year === curYear || !fs.existsSync(dest)) {
                await fileIo.write(await resultFetcher.getResults(year), dest, true)
                console.log(`Wrote ${year} marksix results: ${dest}`)
            }
        }
    }
}

export const marksixService = new MarksixService()
