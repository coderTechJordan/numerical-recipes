// NRMat3d module
export class NRMat3d<T> {
    private nn: number;
    private mm: number;
    private kk: number;
    private v: T[][][];
  
    constructor(n: number, m: number, k: number) {
      this.nn = n;
      this.mm = m;
      this.kk = k;
      this.v = Array.from({ length: n }, () =>
        Array.from({ length: m }, () => Array(k))
      );
    }
  
    get dim1(): number {
      return this.nn;
    }
  
    get dim2(): number {
      return this.mm;
    }
  
    get dim3(): number {
      return this.kk;
    }
  
    get(i: number, j: number, k: number): T {
      if (
        i < 0 ||
        i >= this.nn ||
        j < 0 ||
        j >= this.mm ||
        k < 0 ||
        k >= this.kk
      ) {
        throw new Error("NRMat3d subscript out of bounds");
      }
      return this.v[i][j][k];
    }
  
    set(i: number, j: number, k: number, value: T): void {
      if (
        i < 0 ||
        i >= this.nn ||
        j < 0 ||
        j >= this.mm ||
        k < 0 ||
        k >= this.kk
      ) {
        throw new Error("NRMat3d subscript out of bounds");
      }
      this.v[i][j][k] = value;
    }
  
    // Add more methods as needed
  }