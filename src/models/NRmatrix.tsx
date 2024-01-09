export class NRmatrix<T> {
  private nn: number;
  private mm: number;
  private v: T[][];

  constructor(n: number, m: number, a?: T) {
    if (n <= 0 || m <= 0) {
      throw new Error("Invalid matrix dimensions. Rows and columns must be greater than zero.");
    }

    this.nn = n;
    this.mm = m;
    this.v = Array.from({ length: n }, () => Array(m).fill(a));
  }



  get rows(): number {
    return this.nn;
  }

  get cols(): number {
    return this.mm;
  }

  get(row: number, col: number): T {
    if (row < 0 || row >= this.nn || col < 0 || col >= this.mm) {
      throw new Error("NRmatrix subscript out of bounds");
    }
    return this.v[row][col];
  }

  set(row: number, col: number, value: T): void {
    if (row < 0 || row >= this.nn || col < 0 || col >= this.mm) {
      throw new Error("NRmatrix subscript out of bounds");
    }
    this.v[row][col] = value;
  }

  resize(newn: number, newm: number, a: T): void {
    if (newn <= 0 || newm <= 0) {
      throw new Error("Invalid matrix dimensions. Rows and columns must be greater than zero.");
    }

    if (newn !== this.nn || newm !== this.mm) {
      this.nn = newn;
      this.mm = newm;
      this.v = Array.from({ length: newn }, () => Array(newm).fill(a));
    }
  }

  printToScreen(): string {
    return this.v.map((row) => row.map((item) => String(item)).join(', ')).join('; ');
  }

  getMatrix(): T[][] {
    return this.v;
  }

  setMatrix(matrix: T[][]): void {
    this.v = matrix;
  }
  // Add more methods as needed

  private handleInvalidDimensions(): void {
    const errorMessage = "Invalid matrix dimensions. Rows and columns must be greater than zero.";

    // Display an alert on the webpage
    window.alert(errorMessage);

    // Throw an error to prevent further execution
    throw new Error(errorMessage);
  }
  updateFromUserInput(inputString: string): void {
    const rows = inputString.split(';').map((row) => row.split(',').map((item) => parseFloat(item.trim())));

    if (rows.length !== this.nn || rows.some((row) => row.length !== this.mm)) {
      throw new Error(`Invalid matrix dimensions. Expected ${this.nn} rows and ${this.mm} columns.`);
    }

    this.v = rows as T[][];
  }
}
