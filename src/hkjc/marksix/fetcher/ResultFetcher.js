import { httpsRequester } from '../../../utils/request/HttpsRequester.js'
import { timer } from '../../../utils/timer/Timer.js'
import { configLoader } from '../../../utils/io/ConfigLoader.js'

const host = await configLoader.load("HKJC", "host")

class ResultFetcher {
    constructor() {
        if (!ResultFetcher.instance) {
            ResultFetcher.instance = this
        }
        return ResultFetcher.instance
    }

    /**
     * Get 30 last marksix results
     * @returns {Array<JSON>}
     */
    async getLast30Results() {
        url = `https://${host}/contentserver/jcbw/cmc/last30draw.json`
        let content = JSON.parse(await get(url))
        return content.reverse()
    }

    /**
     * Get marksix results in a year (1993 or later)
     * @param {int} year 
     * @returns {Promise<string>}
     */
    async getResults(year) {
        year = parseInt(year)
        if (year < 1993) {
            throw Exception(`invalid year: ${year}`)
        }
        // max 3 months for a single query
        let urls = [
            `https://${host}/marksix/getJSON.aspx?sd=${year}0101&ed=${year}0331&sb=0`,
            `https://${host}/marksix/getJSON.aspx?sd=${year}0401&ed=${year}0630&sb=0`,
            `https://${host}/marksix/getJSON.aspx?sd=${year}0701&ed=${year}0930&sb=0`,
            `https://${host}/marksix/getJSON.aspx?sd=${year}1001&ed=${year}1231&sb=0`,
        ]
        let result = []
        for (const url of urls) {
            await timer.sleep(1000)
            let content = await httpsRequester.get(url)
            if (content.length > 0) {
                result = result.concat(JSON.parse(content).reverse())
            }
        }
        return JSON.stringify(result)
    }
}

export const resultFetcher = new ResultFetcher()
