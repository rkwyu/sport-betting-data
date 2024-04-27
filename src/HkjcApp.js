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
    // RaceData is required for the rest of function calls
    await racingService.updateRaceData()

    // async calls
    await Promise.allSettled([
      // Miscellaneous
      racingService.importantNotices(),
      racingService.scratched(),

      // Pool investment (投注額)
      racingService.poolTot(),
      racingService.poolTots(),

      // Pre-sell odds (隔夜賠率)
      racingService.winPlaOddsPre(),
      racingService.qinPre(),
      racingService.qplPre(),
      racingService.dblPre(),

      // Current odds (即時賠率)
      racingService.winOdds(),
      racingService.winPlaOdds(),
      racingService.qin(),
      racingService.qpl(),
      racingService.fct(),
      racingService.tceTop(),
      racingService.tceBank(),
      racingService.tceInv(),
      racingService.triTop(),
      racingService.triBank(),
      racingService.tri(),
      racingService.ffTop(),
      racingService.ffBank(),
      racingService.ff(),
      racingService.qttTop(),
      racingService.qttBank(),
      racingService.dbl(),
      racingService.jkc(),
      racingService.tnc(),

      // Progressive WIN odds (獨贏賠率走勢)
      racingService.winProg(),
    ]).then(results => {
    }).catch((e) => {console.error(e)})


  }
}

export const hkjcApp = new HkjcApp()