export interface Assertion<P extends unknown[], V> {
  args: P;
  expectedResult: {type: 'value', value: V} | {type: 'function', fct: (...p: P) => V};
  errorExpected?: boolean;
  comment: string;
};

export function assertEqual(a: unknown, b: unknown): boolean {
  switch (typeof a) {
      case "object":
          return [...Object.keys(a as Object), ...Object.keys(b as Object)].reduce(
            (acc, k) => acc && assertEqual( (a as any)[k], (b as any)[k]),
            true as boolean
          );
      default:
          return a === b;
  }
}

export function ProcessAssertions<P extends unknown[], V>(f: (...L: P) => V, LA: Assertion<P, V>[]): [number, string][] {
  return LA.map<[number, string]|undefined>( (A, i) => {
    try {
      const R  = f(...A.args);
      const ER = A.expectedResult.type === 'value' ? A.expectedResult.value : A.expectedResult.fct(...A.args);
      console.log(A.expectedResult, R);
      return (!A.errorExpected && assertEqual(ER, R)) ? undefined : [i, A.comment];
    } catch(err: any) {
      return ( A.errorExpected && assertEqual(A.expectedResult, err.toString())) ? undefined : [i, `${A.comment}\n${err}`];
    }
  }).filter( s => s !== undefined ) as [number, string][];
}
