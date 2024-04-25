import puppeteer from 'puppeteer'

/**
 * Puppeteer (Singleton)
 */
class PuppeteerSg {
  constructor() {
    if (!PuppeteerSg.instance) {
      PuppeteerSg.instance = this;
      process.on('exit', () => {
        this.close();
      });
    }
    return PuppeteerSg.instance;
  }

  /**
   * Launch a browser
   */
  async launch() {
    this.browser = await puppeteer.launch({
      headless: "new",
      defaultViewport: null,
    });
  }

  /**
   * New a page
   * @param {string} url 
   * @returns 
   */
  async getPage(url) {
    console.log(`Get: ${url}`)
    if (!this.browser) {
      await this.launch()
    }
    let page = await this.browser.newPage()
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    })
    return page
  }

  /**
   * Close the browser
   */
  close() {
    if (!!this.browser) {
      this.browser.close();
      this.browser = null;
    }
  }
}

export const puppeteerSg = new PuppeteerSg()
