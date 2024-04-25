import { configLoader } from './utils/io/ConfigLoader.js'
import { marksixService } from './hkjc/marksix/service/MarkSixService.js'
import { racingService } from './hkjc/racing/service/RacingService.js'

class HkjcApp {
  constructor() {
    if (!HkjcApp.instance) {
      HkjcApp.instance = this
    }
    return HkjcApp.instance
  }

  async marksix() {
    // Result
    await marksixService.marksix()
  }

  async racing() {
    // Miscellaneous
    await racingService.importantNotices()
    await racingService.scratched()

    // Pool investment (投注額)
    await racingService.poolTot()
    await racingService.poolTots()

    // Pre-sell odds (隔夜賠率)
    await racingService.winPlaOddsPre()
    await racingService.qinPre()
    await racingService.qplPre()
    await racingService.dblPre()

    // Current odds (即時賠率)
    await racingService.winOdds()
    await racingService.winPlaOdds()
    await racingService.qin()
    await racingService.qpl()
    await racingService.fct()
    await racingService.tceTop()
    await racingService.tceBank()
    await racingService.tceInv()
    await racingService.triTop()
    await racingService.triBank()
    await racingService.tri()
    await racingService.ffTop()
    await racingService.ffBank()
    await racingService.ff()
    await racingService.qttTop()
    await racingService.qttBank()
    await racingService.dbl()
    await racingService.jkc()
    await racingService.tnc()

    // Progressive WIN odds (贏賠率走勢)
    await racingService.winProg()
  }
}

export const hkjcApp = new HkjcApp()