import { httpsRequester } from '../../../utils/request/HttpsRequester.js'
import { configLoader } from '../../../utils/io/ConfigLoader.js'

const host = configLoader.load("HKJC", "host")

class ResultFetcher {
    constructor() {
        if (!ResultFetcher.instance) {
            ResultFetcher.instance = this
        }
        return ResultFetcher.instance
    }

    /**
     * Get 30 last marksix results
     * @returns
     */
    async getLast30Results() {
        url = `https://${host}/contentserver/jcbw/cmc/last30draw.json`
        return JSON.stringify(
            JSON.parse(await httpsRequester.get(url)).reverse()
        )
    }

    /**
     * Get marksix results in a year (1993 or later)
     * @param {int} year 
     * @returns
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
        return Promise.allSettled(
            urls.map(url => httpsRequester.get(url))
        ).then(results => {
            return JSON.stringify(
                results.reduce((accumulator, currentValue, currentIndex) => {
                    if (currentValue.status === "fulfilled" && currentValue.value) {
                        return accumulator.concat(JSON.parse(currentValue.value).reverse())
                    } else {
                        return accumulator
                    }
                }, [])
            )
        })
    }
}

export const resultFetcher = new ResultFetcher()
