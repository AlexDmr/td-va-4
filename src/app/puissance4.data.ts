export type Token = 'RED' | 'YELLOW';
export interface Board {
  /** An immutable array of array of tokens */
  readonly data: readonly Readonly<Token[]>[];
  /** Number of columns of the board */
  readonly width: number;
  /** Number of lines of the board */
  readonly height: number;
}

/** An empty board (width=height=0, data=[]) */
export const emptyBoard: Board = {data: [], width: 0, height: 0};

/**
 * Returns true if a and b are similar boards (same magnitudes, same data values)
 * @param a A board
 * @param b A board
 * @returns a and b have same width, same length and same data values
 */
export function similarBoard(a: Board, b: Board): boolean {
  return a.width  === b.width
      && a.height === b.height
      && !a.data.find( (LA, i) => LA.find( (v, j) => v !== b.data[i][i]) );
}


/**
 * Interface for Puissance4
 */
export type initReturns   = {error: undefined, board: Board} | {error: 'invalid magnitudes'} | {error: 'invalid data'};
export type playReturns   = {success: Board} | {error: 'out of range' | 'not your turn' | 'column is full'};
export type winnerReturns = Token | 'NONE';
export interface Puissance4Interface {
  readonly board: Board;
  init(board: Board): initReturns;
  play(token: Token, column: number): playReturns;
  winner(nb: number): winnerReturns;
}
