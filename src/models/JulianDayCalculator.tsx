export class JulianDayCalculator {
    private static IGREG: number = 15 + 31 * (10 + 12 * 1582);
  
    julday(mm: number, id: number, iyyy: number): number {
      let ja, jul, jy = iyyy, jm;
  
      if (jy === 0) throw new Error("julday: there is no year zero.");
      if (jy < 0) jy++;
  
      if (mm > 2) {
        jm = mm + 1;
      } else {
        jy--;
        jm = mm + 13;
      }
  
      jul = Math.floor(365.25 * jy) + Math.floor(30.6001 * jm) + id + 1720995;
  
      if (id + 31 * (mm + 12 * iyyy) >= JulianDayCalculator.IGREG) {
        ja = Math.floor(0.01 * jy);
        jul += 2 - ja + Math.floor(0.25 * ja);
      }
  
      return jul;
    }
  
    caldat(julian: number): { mm: number, id: number, iyyy: number } {
      let ja, jalpha, jb, jc, jd, je;
  
      if (julian >= JulianDayCalculator.IGREG) {
        jalpha = Math.floor((julian - 1867216 - 0.25) / 36524.25);
        ja = julian + 1 + jalpha - Math.floor(0.25 * jalpha);
      } else if (julian < 0) {
        ja = julian + 36525 * (1 - julian / 36525);
      } else {
        ja = julian;
      }
  
      jb = ja + 1524;
      jc = Math.floor(6680.0 + (jb - 2439870 - 122.1) / 365.25);
      jd = Math.floor(365 * jc + (0.25 * jc));
      je = Math.floor((jb - jd) / 30.6001);
  
      const id = jb - jd - Math.floor(30.6001 * je);
      let mm = je - 1;
  
      if (mm > 12) mm -= 12;
  
      let iyyy = jc - 4715;
  
      if (mm > 2) iyyy--;
  
      if (iyyy <= 0) iyyy--;
  
      if (julian < 0) iyyy -= 100 * (1 - julian / 36525);
  
      return { mm, id, iyyy };
    }
  }