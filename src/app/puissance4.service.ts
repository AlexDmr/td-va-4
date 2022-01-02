import { Injectable } from '@angular/core';
import { Board, emptyBoard, initReturns, playReturns, Puissance4Interface, Token, winnerReturns } from './puissance4.data';

@Injectable({
  providedIn: 'root'
})
export class Puissance4Service implements Puissance4Interface {
  private _board: Board = emptyBoard;

  /** The current board managed by the service \
   * board[i][j] is the position at column i, line j \
   * For each column, lines begins at the "bottom" \
   * Exemple with a 4 x 3 board \
   * 2          \
   * 1          \
   * 0 1 2 3 4
  */
  get board() {return this._board;}

  /**
   * Initialize the board
   * @param board The new board
   * @returns \{error: undefined, board: Board} if the board is valid
   * @returns \{error: 'invalid magnitudes'} if width or height are not valid magnitude (i.e. strictly positive integers)
   * @returns \{error: 'invalid data'} the data contains invalid number of tokens (#RED should be equals to #YELLOW or #YELLOW+1)
   */
  init(board: Board): initReturns {
    if (board.width > 0 && board.height > 0 && Number.isInteger(board.width) && Number.isInteger(board.height) ) {
      // Checking data validity
      const {data: D, width: W, height: H} = board;
      if ( D.length !== W
        || D.find( C => C.length > H)
      ) {
        return {error: 'invalid data'}
      } else {
        const nb = D.reduce( (N, C) => N + C.reduce((n, t) => n + (t==='RED'?1:-1), 0), 0);
        if (nb !== 0 && nb !== 1) {
          return {error: 'invalid data'}
        } else {
          return {error: undefined, board: this._board = board};
        }
      }
    } else {
      return {error: 'invalid magnitudes'}
    }
    // return {error: undefined, board};
  }

  /**
   * Play token at column \
   * PRECONDITION : the board is correct.
   * @param token The token to play
   * @param column The column where to play, must be an integer
   * @returns \{success: the new board} with token t at column in case of success. The new board is then set to the board attribute
   * @returns \{error: 'out of range'} in case column is not a valid column index :
   * @returns \{error: 'not your turn'} As RED begins, then #RED should be equals to #YELLOW or #YELLOW + 1.
   * @returns \{error: 'column is full'} in case column is ALREADY full.
   */
  play(token: Token, column: number): playReturns {
    return {success: this._board}
  }

  /**
   * Identify who is the winner, if there is any. NONE otherweise. \
   * PRECONDITION : the board is correct.
   * @param nb Minimal number of token that have to be aligned (in any of 8 directions) to declare a winner
   * @returns the token of the winner if any, NONE otherweise
   */
  winner(nb: number): winnerReturns {
    return 'NONE';
  }
}

