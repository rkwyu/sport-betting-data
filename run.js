
import { hkjcApp } from './src/HkjcApp.js'

let options = ["-hkjc_hr", "-hkjc_ms"]
if (process.argv.length == 3 && options.indexOf(process.argv[2]) > -1) {
    switch (process.argv[2]) {
        case "-hkjc_hr":
            await hkjcApp.racing().then(() => process.exit())
            break
        case "-hkjc_ms":
            await hkjcApp.marksix().then(() => process.exit())
            break
        default:
            break
    }
} else {
    console.error(`
Usage: node run.js [options]
Options:
  -hkjc_hr        Get HKJC Horse Racing Odds
  -hkjc_ms        Get HKJC Marksix Result
    `)
}

