import { TestBed } from '@angular/core/testing';
import { Board, initReturns } from './puissance4.data';
import { Puissance4Service } from './puissance4.service';
import { assertEqual, Assertion } from './utils.alx';

describe('Puissance4Service test init', () => {
  let service: Puissance4Service;
  let PA = (b: Board, r: initReturns) => {
    const A: Assertion<[Board], initReturns> = {comment: "", args: [b], expectedResult: {type: 'value', value: r}};
    expect( assertEqual(service.init(b), r) ).toBe(true);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Puissance4Service);
  });

  it('Puissance4Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should init an empty 7x5", () => {
    const b: Board = {width: 7, height: 5, data: [[], [], [], [], [], [], []]};
    PA(b, {error: undefined, board: b});
    expect( service.board ).toBe( b );
  });

  it("should init a lambda 7x5 v1", () => {
    const b: Board = {width: 7, height: 5, data: [['RED'], ['YELLOW'], ['RED'], [], [], [], []]};
    PA(b, {error: undefined, board: b});
    expect( service.board ).toBe( b );
  });

  it("should init a lambda 7x5 v2", () => {
    const b: Board = {width: 7, height: 5, data: [['RED', 'YELLOW'], ['YELLOW', 'RED'], ['RED', 'YELLOW'], [], [], [], []]};
    PA(b, {error: undefined, board: b});
    expect( service.board ).toBe( b );
  });

  it("should not be possible to init with a board without columns", () => PA({width: 0, height: 5, data: []}, {error: 'invalid magnitudes'}));
  it("should not be possible to init with a width = -1", () => PA({width: -1, height: 5, data: []}, {error: 'invalid magnitudes'}));
  it("should not be possible to init with a height = -1", () => PA({width: 7, height: -1, data: []}, {error: 'invalid magnitudes'}));
  it("should not be possible to init with a width = 2.5", () => PA({width: 2.5, height: 5, data: []}, {error: 'invalid magnitudes'}));
  it("should not be possible to init with a width = -1", () => PA({width: -1, height: 5, data: []}, {error: 'invalid magnitudes'}));
  it("should not be possible to init with not enough columns", () => PA({width: 7, height: 5, data: []}, {error: 'invalid data'}));
  it("should not be possible to init with too much columns", () => PA({width: 2, height: 5, data: [[], [], []]}, {error: 'invalid data'}));
  it("should not be possible to init with column 2 too high", () => PA({width: 7, height: 5, data: [[], [], ['RED', 'RED', 'RED', 'RED', 'RED', 'RED'], [], [], [], []]}, {error: 'invalid data'}));
  it("should not be possible to init with column 0 too high", () => PA({width: 7, height: 5, data: [['RED', 'RED', 'RED', 'RED', 'RED', 'RED'], [], [],  [], [], [], []]}, {error: 'invalid data'}));
  it("should not be possible to init with too much RED token", () => PA({width: 7, height: 5, data: [['YELLOW', 'RED'], [], ['RED', 'RED', 'YELLOW', 'RED'], [], [], [], []]}, {error: 'invalid data'}));
  it("should not be possible to init with too much YELLOW token", () => PA({width: 7, height: 5, data: [[], ['RED', 'YELLOW'], ['RED', 'YELLOW', 'RED', 'YELLOW'], ['YELLOW'], [], [], []]}, {error: 'invalid data'}));
});

describe('Puissance4Service test play', () => {
  let service: Puissance4Service;
  let PA = (b: Board, r: initReturns) => {
    const A: Assertion<[Board], initReturns> = {comment: "", args: [b], expectedResult: {type: 'value', value: r}};
    expect( assertEqual(service.init(b), r) ).toBe(true);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Puissance4Service);
  });


});
