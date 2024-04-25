import https from 'https'

class HttpsRequester {
    constructor() {
        if (!HttpsRequester.instance) {
            HttpsRequester.instance = this
        }
        return HttpsRequester.instance
    }

    /**
     * Get the response body of a GET request
     * @param {string} url 
     * @returns {Promise<string>}
     */
    async get(url) {
        console.log(`GET: ${url}`)
        return new Promise((resolve, reject) => {
            https.get(url, res => {
                if (res.statusCode == 200) {
                    let data = []
                    res.on('data', chunk => {
                        data.push(chunk)
                    }).on('end', () => {
                        let result = Buffer.concat(data).toString("utf-8").trim()
                        resolve(result)
                    })
                } else {
                    reject(`status code: ${res.statusCode}`)
                }
            }).on('error', err => {
                reject(err)
            })
        })
    }

}

export const httpsRequester = new HttpsRequester()
