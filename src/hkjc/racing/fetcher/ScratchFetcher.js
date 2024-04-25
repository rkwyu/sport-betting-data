
import { httpsRequester } from '../../../utils/request/HttpsRequester.js';
import { configLoader } from '../../../utils/io/ConfigLoader.js';

const host = await configLoader.load("HKJC", "host")

class ScratchFetcher {
    constructor() {
        if (!ScratchFetcher.instance) {
            ScratchFetcher.instance = this
        }
        return ScratchFetcher.instance
    }

    async getScratched(raceData) {
        let url = `https://${host}/racing/getJSON.aspx?type=scratched&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}`
        return await httpsRequester.get(url)
    }
}

export const scratchFetcher = new ScratchFetcher()