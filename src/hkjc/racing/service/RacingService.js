import dateAndTime from 'date-and-time';

import { fileIo } from '../../../utils/io/FileIo.js'
import { configLoader } from '../../../utils/io/ConfigLoader.js'
import { raceOddsFetcher } from '../fetcher/RaceOddsFetcher.js'
import { noticeFetcher } from '../fetcher/NoticeFetcher.js';
import { scratchFetcher } from '../fetcher/ScratchFetcher.js';
import { poolFetcher } from '../fetcher/PoolFetcher.js';

const outputDir = await configLoader.load("DIRECTORY", "output")

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
        console.log(`updated race-data`)
    }

    async importantNotices() {
        if (!this.raceData) await this.updateRaceData()
        let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
        let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/importantnotices/${time}.json`
        await fileIo.write(await noticeFetcher.getImportantNotice(), dest)
        console.log(`Wrote scratched: ${dest}`)
    }

    async scratched() {
        if (!this.raceData) await this.updateRaceData()
        let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
        let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/scratched/${time}.json`
        await fileIo.write(await scratchFetcher.getScratched(this.raceData), dest)
        console.log(`Wrote scratched: ${dest}`)
    }

    async poolTot() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/pooltot/${time}.json`
            await fileIo.write(await poolFetcher.getPoolTot(this.raceData, raceno), dest)
            console.log(`Wrote pooltot: ${dest}`)
        }
    }

    async poolTots() {
        if (!this.raceData) await this.updateRaceData()
        let pools = ["FCT", "TCE", "TRI", "F-F", "QTT", "DBL", "TBL", "D-T", "T-T", "6UP"]
        for (const pool of pools) {
            for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
                let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
                let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/pooltots/${pool}/${time}.json`
                await fileIo.write(await poolFetcher.getPoolTots(this.raceData, raceno, pool), dest)
                console.log(`Wrote pooltot: ${dest}`)
            }
        }
    }

    async winPlaOddsPre() {
        if (!this.raceData) await this.updateRaceData()
        let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
        let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/winplaoddspre/${time}.json`
        await fileIo.write(await raceOddsFetcher.getWinPlaOddsPre(this.raceData), dest)
        console.log(`Wrote winplaoddspre: ${dest}`)
    }

    async qinPre() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/qinpre/${time}.json`
            await fileIo.write(await raceOddsFetcher.getQinPre(this.raceData, raceno), dest)
            console.log(`Wrote qinpre: ${dest}`)
        }
    }

    async qplPre() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/qplpre/${time}.json`
            await fileIo.write(await raceOddsFetcher.getQplPre(this.raceData, raceno), dest)
            console.log(`Wrote qplpre: ${dest}`)
        }
    }

    async dblPre() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/dblpre/${time}.json`
            await fileIo.write(await raceOddsFetcher.getDblPre(this.raceData, raceno), dest)
            console.log(`Wrote dblpre: ${dest}`)
        }
    }

    async winOdds() {
        if (!this.raceData) await this.updateRaceData()
        let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
        let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/winodds/${time}.json`
        await fileIo.write(await raceOddsFetcher.getWinOdds(this.raceData), dest)
        console.log(`Wrote winplaodds: ${dest}`)
    }

    async winPlaOdds() {
        if (!this.raceData) await this.updateRaceData()
        let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
        let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/winplaodds/${time}.json`
        await fileIo.write(await raceOddsFetcher.getWinPlaOdds(this.raceData), dest)
        console.log(`Wrote winplaodds: ${dest}`)
    }

    async qin() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/qin/${time}.json`
            await fileIo.write(await raceOddsFetcher.getQin(this.raceData, raceno), dest)
            console.log(`Wrote qin: ${dest}`)
        }
    }

    async qpl() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/qpl/${time}.json`
            await fileIo.write(await raceOddsFetcher.getQpl(this.raceData, raceno), dest)
            console.log(`Wrote qpl: ${dest}`)
        }
    }

    async fct() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/fct/${time}.json`
            await fileIo.write(await raceOddsFetcher.getFct(this.raceData, raceno), dest)
            console.log(`Wrote fct: ${dest}`)
        }
    }

    async tceTop() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/tcetop/${time}.json`
            await fileIo.write(await raceOddsFetcher.getTceTop(this.raceData, raceno), dest)
            console.log(`Wrote tcetop: ${dest}`)
        }
    }

    async tceBank() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/tcebank/${time}.json`
            await fileIo.write(await raceOddsFetcher.getTceBank(this.raceData, raceno), dest)
            console.log(`Wrote tcebank: ${dest}`)
        }
    }

    async tceInv() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/tceinv/${time}.json`
            await fileIo.write(await raceOddsFetcher.getTceInv(this.raceData, raceno), dest)
            console.log(`Wrote tceinv: ${dest}`)
        }
    }

    async triTop() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/tritop/${time}.json`
            await fileIo.write(await raceOddsFetcher.getTriTop(this.raceData, raceno), dest)
            console.log(`Wrote tritop: ${dest}`)
        }
    }

    async triBank() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/tribank/${time}.json`
            await fileIo.write(await raceOddsFetcher.getTriBank(this.raceData, raceno), dest)
            console.log(`Wrote tribank: ${dest}`)
        }
    }

    async tri() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            for (let start = 0; ; start = start + 48) {
                let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
                let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/tri/${start.toString().padStart(3, 0)}_${time}.json`
                let content = await raceOddsFetcher.getTri(this.raceData, raceno, start)
                if (content.trim() === '{"OUT":""}') {
                    break
                } else {
                    await fileIo.write(content, dest)
                    console.log(`Wrote tri: ${dest}`)
                }
            }
        }
    }

    async ffTop() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/fftop/${time}.json`
            await fileIo.write(await raceOddsFetcher.getFfTop(this.raceData, raceno), dest)
            console.log(`Wrote fftop: ${dest}`)
        }
    }

    async ffBank() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/ffbank/${time}.json`
            await fileIo.write(await raceOddsFetcher.getFfBank(this.raceData, raceno), dest)
            console.log(`Wrote ffbank: ${dest}`)
        }
    }

    async ff() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            for (let start = 0; ; start = start + 48) {
                let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
                let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/ff/${start.toString().padStart(3, 0)}_${time}.json`
                let content = await raceOddsFetcher.getFf(this.raceData, raceno, start)
                if (content.trim() === '{"OUT":""}') {
                    break
                } else {
                    await fileIo.write(content, dest)
                    console.log(`Wrote ff: ${dest}`)
                }
            }
        }
    }

    async qttTop() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/qtttop/${time}.json`
            await fileIo.write(await raceOddsFetcher.getQttTop(this.raceData, raceno), dest)
            console.log(`Wrote qtttop: ${dest}`)
        }
    }

    async qttBank() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/qttbank/${time}.json`
            await fileIo.write(await raceOddsFetcher.getQttBank(this.raceData, raceno), dest)
            console.log(`Wrote qttbank: ${dest}`)
        }
    }

    async dbl() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/dbl/${time}.json`
            await fileIo.write(await raceOddsFetcher.getDbl(this.raceData, raceno), dest)
            console.log(`Wrote dbl: ${dest}`)
        }
    }

    async jkc() {
        if (!this.raceData) await this.updateRaceData()
        let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
        let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/jkc/${time}.json`
        await fileIo.write(await raceOddsFetcher.getJkc(this.raceData), dest)
        console.log(`Wrote jkc: ${dest}`)
    }

    async tnc() {
        if (!this.raceData) await this.updateRaceData()
        let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
        let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/tnc/${time}.json`
        await fileIo.write(await raceOddsFetcher.getTnc(this.raceData), dest)
        console.log(`Wrote tnc: ${dest}`)
    }

    async winProg() {
        if (!this.raceData) await this.updateRaceData()
        for (let raceno = 1; raceno <= this.raceData.totalRace; raceno++) {
            let time = dateAndTime.format(new Date(), "YYYYMMDD.HHmmss.SSS")
            let dest = `${outputDir}/hkjc/racing/${this.raceData.mtgDate}_${this.raceData.mtgVenue}/${raceno.toString().padStart(2, 0)}/winprog/${time}.json`
            await fileIo.write(await raceOddsFetcher.getWinProg(this.raceData, raceno), dest)
            console.log(`Wrote winprog: ${dest}`)
        }
    }

}

export const racingService = new RacingService()
