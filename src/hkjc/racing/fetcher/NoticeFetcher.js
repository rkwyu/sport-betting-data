import { httpsRequester } from '../../../utils/request/HttpsRequester.js';
import { configLoader } from '../../../utils/io/ConfigLoader.js';

const host = configLoader.load("HKJC", "host")

class NoticeFetcher {
    constructor() {
        if (!NoticeFetcher.instance) {
            NoticeFetcher.instance = this
        }
        return NoticeFetcher.instance
    }

    /**
     * Get important notices from importantNotices.json
     * @returns 
     */
    async getImportantNotice() {
        return await httpsRequester.get(`https://${host}/contentserver/jcbw/cmc/importantNotices.json`)
    }
}

export const noticeFetcher = new NoticeFetcher()
