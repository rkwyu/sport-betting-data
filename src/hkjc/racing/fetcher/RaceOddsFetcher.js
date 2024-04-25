import dateAndTime from 'date-and-time';
import * as cheerio from 'cheerio';

import { RaceData } from '../object/RaceData.js';
import { httpsRequester } from '../../../utils/request/HttpsRequester.js';
import { configLoader } from '../../../utils/io/ConfigLoader.js';

const host = await configLoader.load("HKJC", "host")

class RaceOddsFetcher {
	constructor() {
		if (!RaceOddsFetcher.instance) {
			RaceOddsFetcher.instance = this
		}
		return RaceOddsFetcher.instance
	}

	/**
	 * Concert venue from full name to short name
	 * @param {string} fullName 
	 * @returns 
	 */
	venueConvert(fullName) {
		switch (fullName) {
			case "Happy Valley":
				return "HV"
			case "Sha Tin":
				return "ST"
			default:
				throw new Error(`unknown venue: ${fullName}`)
		}
	}

	/**
	 * Get `RaceData` from rsdata.js
	 * @param {string} date 
	 * @returns 
	 * @deprecated use `getRaceData` instead
	 */
	async getRsData(date) {
		let url = `https://${host}/racing/script/rsdata.js?lang=en&date=${date}&venue=`

		let raw = await httpsRequester.get(url)
		// let page = await puppeteerSg.getPage(url)
		// let raw = await page.evaluate(() => document.querySelector("body").innerText)
		// await page.close()

		if (raw.includes("var mtgDate = '") && raw.includes("var mtgVenue = '")) {
			let mtgDate = raw.split("var mtgDate = '")[1].split("';")[0]
			let mtgVenue = raw.split("var mtgVenue = '")[1].split("';")[0]
			return new RaceData(mtgDate, mtgVenue)
		} else {
			throw new Error("rsdata.js not ready");
		}
	}

	/**
	 * Get `RaceData` from odds_wp.aspx page
	 * @param {string} date 
	 * @returns 
	 */
	async getRaceData() {
		let url = `https://${host}/racing/pages/odds_wp.aspx?lang=en&dv=local`

		let $ = cheerio.load(await httpsRequester.get(url))
		let mtgInfoDvValue = $("div.mtgInfoDV").text()
		let raceSelLength = $("div.racebg div[id^='raceSel']").length
		// let page = await puppeteerSg.getPage(url)
		// let mtgInfoDv = await page.$("div.mtgInfoDV")
		// let mtgInfoDvValue = await page.evaluate(el => el.textContent, mtgInfoDv)
		// let raceSel = await page.$$("div.racebg div[id^='raceSel'")
		// let raceSelLength = await page.evaluate(el => el.length, raceSel)
		// await page.close()

		let date = dateAndTime.parse(mtgInfoDvValue.split(",")[0].trim(), "DD/MM/YYYY")
		let venue = mtgInfoDvValue.split(",")[2].trim()
		return new RaceData(dateAndTime.format(date, 'YYYY-MM-DD'), this.venueConvert(venue), raceSelLength)
	}

	/**
	 * Get pre-sell (隔夜賠率) WIN (獨贏) and PLACE (位置) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @returns 
	 */
	async getWinPlaOddsPre(raceData) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=winplaoddspre&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&start=1&end=${raceData.totalRace}`)
	}

	/**
	 * Get pre-sell (隔夜賠率) QUINELLA (連贏) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getQinPre(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=qinpre&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get pre-sell (隔夜賠率) QUINELLA PLACE (位置Q) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getQplPre(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=qplpre&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get pre-sell (隔夜賠率) DOUBLE (孖寶) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getDblPre(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=dblpre&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get current (即時賠率) WIN (獨贏) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @returns 
	 */
	async getWinOdds(raceData) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=winodds&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&start=1&end=${raceData.totalRace}`)
	}

	/**
	 * Get current (即時賠率) WIN and PLACE (位置) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @returns 
	 */
	async getWinPlaOdds(raceData) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=winplaodds&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&start=1&end=${raceData.totalRace}`)
	}

	/**
	 * Get current (即時賠率) QUINELLA (連贏) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getQin(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=qin&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get current (即時賠率) QUINELLA PLACE (位置Q) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getQpl(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=qpl&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get FORECAST (二重彩) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getFct(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=fct&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get TIERCE (三重彩) top 20 (最高20) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getTceTop(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=tcetop&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get TIERCE (三重彩) banker top 10 (馬膽頭十名) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getTceBank(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=tcebank&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get TIERCE (三重彩) investment (投注額) from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getTceInv(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=tceinv&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get TRIO (單T) top 20 (最高20) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getTriTop(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=tritop&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get TRIO (單T) banker top 10 (馬膽頭十名) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getTriBank(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=tribank&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get TRIO (單T) all (全部) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @param {int} start
	 *              starting index (0, 48, 96, ...)
	 * @returns 
	 */
	async getTri(raceData, raceno, start) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=tri&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}&start=${start}`)
	}

	/**
	 * Get FIRST FOUR (四連環) top 20 (最高20) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getFfTop(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=fftop&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get FIRST FOUR (四連環) banker top 10 (馬膽頭十名) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getFfBank(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=ffbank&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get FIRST FOUR (四連環) all (全部) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @param {int} start
	 *              starting index (0, 48, 96, ...)
	 * @returns 
	 */
	async getFf(raceData, raceno, start) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=ff&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}&start=${start}`)
	}

	/**
	 * Get QUARTET (四重彩) top 20 (最高20) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getQttTop(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=qtttop&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get QUARTET (四重彩) banker top 10 (馬膽頭十名) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getQttBank(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=qttbank&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get DOUBLE (孖寶) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getDbl(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=dbl&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}

	/**
	 * Get JOCKEY CHALLENGE (騎師王) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @returns 
	 */
	async getJkc(raceData) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=jkc&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}`)
	}

	/**
	 * Get TRAINER CHALLENGE (練馬師王) odds from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @returns 
	 */
	async getTnc(raceData) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=tnc&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}`)
	}

	/**
	 * Get Progressive WIN odds (贏賠率走勢) from getJSON.aspx
	 * @param {RaceData} raceData 
	 * @param {int} raceno 
	 * @returns 
	 */
	async getWinProg(raceData, raceno) {
		return await httpsRequester.get(`https://${host}/racing/getJSON.aspx?type=winprog&date=${raceData.mtgDate}&venue=${raceData.mtgVenue}&raceno=${raceno}`)
	}
}

export const raceOddsFetcher = new RaceOddsFetcher()
