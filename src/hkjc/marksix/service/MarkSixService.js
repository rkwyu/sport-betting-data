import dateAndTime from 'date-and-time';

import { resultFetcher } from '../fetcher/ResultFetcher.js'
import { fileIo } from '../../../utils/io/FileIo.js'
import { configLoader } from '../../../utils/io/ConfigLoader.js'

const outputDir = configLoader.load("DIRECTORY", "output")

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
        let promises = []
        for (let year = from; year <= to; year++) {
            promises.push(resultFetcher.getResults(year))
        }
        return Promise.allSettled(
            promises
        ).then(results => {
            results.forEach(async (result, index, arr) => {
                if (result.status === "fulfilled" && result.value) {
                    let dest = `${outputDir}/hkjc/marksix/${(index + from)}.json`
                    await fileIo.write(result.value, dest)
                }
            })
        })
    }
}

export const marksixService = new MarksixService()
