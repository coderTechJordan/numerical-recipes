export class LunarPhaseCalculator {
    private static RAD: number = Math.PI / 180.0;
  
    flmoon(n: number, nph: number): { jd: number, frac: number } {
      let i;
      const c = n + nph / 4.0;
      const t = c / 1236.85;
      const t2 = t * t;
      const as = 359.2242 + 29.105356 * c;
      const am = 306.0253 + 385.816918 * c + 0.010730 * t2;
      let jd = 2415020 + 28 * n + 7 * nph;
      let xtra = 0.75933 + 1.53058868 * c + ((1.178e-4) - (1.55e-7) * t) * t2;
  
      if (nph === 0 || nph === 2) {
        xtra += (0.1734 - 3.93e-4 * t) * Math.sin(LunarPhaseCalculator.RAD * as) - 0.4068 * Math.sin(LunarPhaseCalculator.RAD * am);
      } else if (nph === 1 || nph === 3) {
        xtra += (0.1721 - 4.0e-4 * t) * Math.sin(LunarPhaseCalculator.RAD * as) - 0.6280 * Math.sin(LunarPhaseCalculator.RAD * am);
      } else {
        throw new Error("nph is unknown in flmoon");
      }
  
      i = xtra >= 0.0 ? Math.floor(xtra) : Math.ceil(xtra - 1.0);
      jd += i;
  
      const frac = xtra - i;
  
      return { jd, frac };
    }
  }