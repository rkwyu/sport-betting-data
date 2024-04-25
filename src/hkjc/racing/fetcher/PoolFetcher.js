
import { httpsRequester } from '../../../utils/request/HttpsRequester.js';
import { configLoader } from '../../../utils/io/ConfigLoader.js';
import { RaceData } from '../object/RaceData.js';

const host = await configLoader.load("HKJC", "host")

class PoolFetcher {
    constructor() {
        if (!PoolFetcher.instance) {
            PoolFetcher.instance = this
        }
        return PoolFetcher.instance
    }

    /**
     * Get total pool investment in a race from getJSON.aspx
     * @param {RaceData} raceData 
     * @param {int} raceno 
     * @returns 
     */
    async getPoolTot(raceData, raceno) {
        return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=pooltot&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
    }

    /**
     * Get pool investment in a race getJSON.aspx
     * @param {RaceData} raceData 
     * @param {int} raceno 
     * @param {string} pool 
     * @returns 
     */
    async getPoolTots(raceData, raceno, pool) {
        return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=pooltots&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}&pool=${pool}`)
    }
}

export const poolFetcher = new PoolFetcher()