export class NRvector<T extends number> {
    private nn: number;
    private v: T[];
  
    constructor(n: number, a?: T | T[]) {
        if (n <= 0) {
          throw new Error("Invalid vector dimension. Length must be greater than zero.");
        }
    
        this.nn = n;
        this.v = Array.isArray(a) ? [...a] : Array(n).fill(a === undefined ? 0 as T : a as T);
      }
  
    get length(): number {
      return this.nn;
    }
  
    get(index: number): T {
      if (index < 0 || index >= this.nn) {
        throw new Error("NRvector subscript out of bounds");
      }
      return this.v[index];
    }
  
    set(index: number, value: T): void {
      if (index < 0 || index >= this.nn) {
        throw new Error("NRvector subscript out of bounds");
      }
      this.v[index] = value;
    }
  
    resize(newn: number, a: T): void {
      if (newn !== this.nn) {
        this.nn = newn;
        this.v = Array(newn).fill(a);
      }
    }
  
    updateValues(newValues: T[]): void {
      if (newValues.length !== this.nn) {
        throw new Error("Invalid number of elements provided for updating NRvector");
      }
  
      this.v = newValues;
    }
  
    printToScreen(): string {
      return `[${this.v.join(', ')}]`;
    }

    updateFromUserInput(inputString: string): void {
        const newValues = inputString
          .split(',')
          .map((item) => parseFloat(item.trim()))
          .filter((value) => !isNaN(value));
    
        if (newValues.length !== this.nn) {
          throw new Error(`Invalid number of elements provided for updating NRvector. Expected ${this.nn} elements.`);
        }
    
        this.v = newValues as T[];
      }
    }

  