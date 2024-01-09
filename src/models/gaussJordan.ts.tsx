// gaussJordan.ts

import { NRmatrix } from './NRmatrix';
import { NRvector } from './NRvector';

export function swap<T>(a: T[], b: T[], i: number): void {
  const temp = a[i];
  a[i] = b[i];
  b[i] = temp;
}

export function gaussj(a: NRmatrix<number>, b: NRmatrix<number>): void {
  const n = a.rows;
  const m = b.cols;
  const indxc = new NRvector<number>(n);
  const indxr = new NRvector<number>(n);
  const ipiv = new NRvector<number>(n);

  for (let j = 0; j < n; j++) {
    ipiv.set(j, 0);
  }

  for (let i = 0; i < n; i++) {
    let big = 0.0;
    let irow = 0;
    let icol = 0;

    for (let j = 0; j < n; j++) {
      if (ipiv.get(j) !== 1) {
        for (let k = 0; k < n; k++) {
          if (ipiv.get(k) === 0) {
            if (Math.abs(a.get(j, k)) >= big) {
              big = Math.abs(a.get(j, k));
              irow = j;
              icol = k;
            }
          }
        }
      }
    }

    ipiv.set(icol, ipiv.get(icol) + 1);

    if (irow !== icol) {
      for (let l = 0; l < n; l++) {
        swap(a.getMatrix()[irow], a.getMatrix()[icol], l);
      }

      for (let l = 0; l < m; l++) {
        swap(b.getMatrix()[irow], b.getMatrix()[icol], l);
      }
    }

    indxr.set(i, irow);
    indxc.set(i, icol);

    if (a.get(icol, icol) === 0.0) {
      throw new Error("gaussj: Singular Matrix");
    }

    const pivinv = 1.0 / a.get(icol, icol);
    a.set(icol, icol, 1.0);

    for (let l = 0; l < n; l++) {
      a.set(icol, l, a.get(icol, l) * pivinv);
    }

    for (let l = 0; l < m; l++) {
      b.set(icol, l, b.get(icol, l) * pivinv);
    }

    for (let ll = 0; ll < n; ll++) {
      if (ll !== icol) {
        const dum = a.get(ll, icol);
        a.set(ll, icol, 0.0);

        for (let l = 0; l < n; l++) {
          a.set(ll, l, a.get(ll, l) - a.get(icol, l) * dum);
        }

        for (let l = 0; l < m; l++) {
          b.set(ll, l, b.get(ll, l) - b.get(icol, l) * dum);
        }
      }
    }
  }

  for (let l = n - 1; l >= 0; l--) {
    if (indxr.get(l) !== indxc.get(l)) {
      for (let k = 0; k < n; k++) {
        swap(a.getMatrix()[k], a.getMatrix()[indxr.get(l)], k);
      }
    }
  }
}

export function gaussjSingleArg(a: NRmatrix<number>): void {
  const b = new NRmatrix<number>(a.rows, 0);
  gaussj(a, b);
}
