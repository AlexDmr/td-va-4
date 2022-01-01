import { TestBed } from '@angular/core/testing';
import { Board } from './puissance4.data';

import { Puissance4Service } from './puissance4.service';

interface Assertion<P extends unknown[], V> {
  args: P;
  expectedResult: {type: 'value', value: V} | {type: 'function', fct: (...p: P) => V};
  errorExpected?: boolean;
  comment: string;
};

function assertEqual(a: unknown, b: unknown): boolean {
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

function ProcessAssertions<P extends unknown[], V>(f: (...L: P) => V, LA: Assertion<P, V>[]): [number, string][] {
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

describe('Puissance4Service', () => {
  let service: Puissance4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Puissance4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to use init', () => {
    const L = ProcessAssertions( (b: Board) => service.init(b), [
      {comment: '7x5 empty', args: [{width: 7, height: 5, data: [[], [], [], [], [], [], []]}], expectedResult: {type: 'function', fct: b => ({error: undefined, board: b}) }},
      {comment: '7x5 lambda 1', args: [{width: 7, height: 5, data: [['RED'], ['YELLOW'], ['RED'], [], [], [], []]}], expectedResult: {type: 'function', fct: b => ({error: undefined, board: b}) }},
      {comment: '7x5 lambda 2', args: [{width: 7, height: 5, data: [['RED', 'YELLOW'], ['YELLOW', 'RED'], ['RED', 'YELLOW'], [], [], [], []]}], expectedResult: {type: 'function', fct: b => ({error: undefined, board: b}) }},
      {comment: 'pb no columns', args: [{width: 0, height: 5, data: []}], expectedResult: {type: 'value', value: {error: 'invalid magnitudes'}} },
      {comment: 'pb width = -1', args: [{width: -1, height: 5, data: []}], expectedResult: {type: 'value', value: {error: 'invalid magnitudes'} }},
      {comment: 'pb height = -1', args: [{width: 7, height: -1, data: []}], expectedResult: {type: 'value', value: {error: 'invalid magnitudes'} }},
      {comment: 'pb width = 2.5', args: [{width: 2.5, height: 5, data: []}], expectedResult: {type: 'value', value: {error: 'invalid magnitudes'} }},
      {comment: 'pb height = 7.7', args: [{width: 7, height: 7.7, data: []}], expectedResult: {type: 'value', value: {error: 'invalid magnitudes'} }},
      {comment: 'pb not enough column', args: [{width: 7, height: 5, data: []}], expectedResult: {type: 'value', value: {error: 'invalid data'} }},
      {comment: 'pb too much columns', args: [{width: 2, height: 5, data: [[], [], []]}], expectedResult: {type: 'value', value: {error: 'invalid data'} }},
      {comment: 'pb column 2 too high', args: [{width: 7, height: 5, data: [[], [], ['RED', 'RED', 'RED', 'RED', 'RED', 'RED'], [], [], [], []]}], expectedResult: {type: 'value', value: {error: 'invalid data'} }},
      {comment: 'pb column 0 too high', args: [{width: 7, height: 5, data: [['RED', 'RED', 'RED', 'RED', 'RED', 'RED'], [], [],  [], [], [], []]}], expectedResult: {type: 'value', value: {error: 'invalid data'} }},
      {comment: 'pb too much RED', args: [{width: 7, height: 5, data: [['YELLOW', 'RED'], [], ['RED', 'RED', 'YELLOW', 'RED'], [], [], [], []]}], expectedResult: {type: 'value', value: {error: 'invalid data'} }},
      {comment: 'pb too much YELLOW', args: [{width: 7, height: 5, data: [[], ['RED', 'YELLOW'], ['RED', 'YELLOW', 'RED', 'YELLOW'], ['YELLOW'], [], [], []]}], expectedResult: {type: 'value', value: {error: 'invalid data'} }},
    ] );
    expect(L.length).withContext(`Errors :\n  * ${L.join("\n  * ")}`).toEqual(0);
  });

});
