import dateAndTime from 'date-and-time';

import { fileIo } from '../../../utils/io/FileIo.js'
import { configLoader } from '../../../utils/io/ConfigLoader.js'
import { raceOddsFetcher } from '../fetcher/RaceOddsFetcher.js'
import { noticeFetcher } from '../fetcher/NoticeFetcher.js';
import { scratchFetcher } from '../fetcher/ScratchFetcher.js';
import { poolFetcher } from '../fetcher/PoolFetcher.js';

const outputDir = configLoader.load("DIRECTORY", "output")

class RacingService {
    constructor(raceData) {
        if (!RacingService.instance) {
            RacingService.instance = this
        }
        return RacingService.instance
    }

    /**
     * Update `RaceData` instance
     */
    async updateRaceData() {
        this.raceData = await raceOddsFetcher.getRaceData()
    }

    async genericDayBase(fn, name) {
        if (!this.raceData) await this.updateRaceData()
        let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
        let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${name}/${time}.json`
        await fileIo.write(await fn(this.raceData), dest)
    }

    async genericRaceBase(fn, name) {
        if (!this.raceData) await this.updateRaceData()
        let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
        await Promise.allSettled(
            Array.from(
                { length: this.raceData.totalRace },
                (elem, index) => fn(this.raceData, index + 1)
            )
        ).then(results => {
            results.forEach(async (result, index, arr) => {
                if (result.status === "fulfilled" && result.value) {
                    let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${(index + 1).toString().padStart(2, 0)}/${name}/${time}.json`
                    await fileIo.write(result.value, dest)
                }
            })
        })
    }

    async importantNotices() {
        await this.genericDayBase(noticeFetcher.getImportantNotice, 'importantnotices')
    }

    async scratched() {
        await this.genericDayBase(scratchFetcher.getScratched, 'scratched')
    }

    async poolTot() {
        await this.genericRaceBase(poolFetcher.getPoolTot, 'pooltot')
    }

    async poolTots() {
        if (!this.raceData) await this.updateRaceData()
        let pools = ["FCT", "TCE", "TRI", "F-F", "QTT", "DBL", "TBL", "D-T", "T-T", "6UP"]
        for (const pool of pools) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            await Promise.allSettled(
                Array.from(
                    { length: this.raceData.totalRace },
                    (elem, index) => poolFetcher.getPoolTots(this.raceData, index + 1, pool)
                )
            ).then(results => {
                results.forEach(async (result, index, arr) => {
                    if (result.status === "fulfilled" && result.value) {
                        let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${(index + 1).toString().padStart(2, 0)}/pooltots/${pool}/${time}.json`
                        await fileIo.write(result.value, dest)
                    }
                })
            })
        }
    }

    async winPlaOddsPre() {
        await this.genericDayBase(raceOddsFetcher.getWinPlaOddsPre, 'winplaoddspre')
    }

    async qinPre() {
        await this.genericRaceBase(raceOddsFetcher.getQinPre, 'qinpre')
    }

    async qplPre() {
        await this.genericRaceBase(raceOddsFetcher.getQplPre, 'qplpre')
    }

    async dblPre() {
        await this.genericRaceBase(raceOddsFetcher.getDblPre, 'dblpre')
    }

    async winOdds() {
        await this.genericDayBase(raceOddsFetcher.getWinOdds, 'winodds')
    }

    async winPlaOdds() {
        await this.genericDayBase(raceOddsFetcher.getWinPlaOdds, 'winplaodds')
    }

    async qin() {
        await this.genericRaceBase(raceOddsFetcher.getQin, 'qin')
    }

    async qpl() {
        await this.genericRaceBase(raceOddsFetcher.getQpl, 'qpl')
    }

    async fct() {
        await this.genericRaceBase(raceOddsFetcher.getFct, 'fct')
    }

    async tceTop() {
        await this.genericRaceBase(raceOddsFetcher.getTceTop, 'tcetop')
    }

    async tceBank() {
        await this.genericRaceBase(raceOddsFetcher.getTceBank, 'tcebank')
    }

    async tceInv() {
        await this.genericRaceBase(raceOddsFetcher.getTceInv, 'tceinv')
    }

    async triTop() {
        await this.genericRaceBase(raceOddsFetcher.getTriTop, 'tritop')
    }

    async triBank() {
        await this.genericRaceBase(raceOddsFetcher.getTriBank, 'tribank')
    }

    async tri() {
        await this.genericRaceBase(raceOddsFetcher.getTri, 'tri')
    }

    async ffTop() {
        await this.genericRaceBase(raceOddsFetcher.getFfTop, 'fftop')
    }

    async ffBank() {
        await this.genericRaceBase(raceOddsFetcher.getFfBank, 'ffbank')
    }

    async ff() {
        await this.genericRaceBase(raceOddsFetcher.getFf, 'ff')
    }

    async qttTop() {
        await this.genericRaceBase(raceOddsFetcher.getQttTop, 'qtttop')
    }

    async qttBank() {
        await this.genericRaceBase(raceOddsFetcher.getQttBank, 'qttbank')
    }

    async dbl() {
        await this.genericRaceBase(raceOddsFetcher.getDbl, 'dbl')
    }

    async jkc() {
        await this.genericDayBase(raceOddsFetcher.getJkc, 'jkc')
    }

    async tnc() {
        await this.genericDayBase(raceOddsFetcher.getTnc, 'tnc')
    }

    async winProg() {
        await this.genericDayBase(raceOddsFetcher.getWinProg, 'winprog')
    }

}

export const racingService = new RacingService()
