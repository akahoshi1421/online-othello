import type { UserId } from '$/commonTypesWithClient/branded';
import { colorUseCase } from './colorUseCase';
import type { ReturnItems } from './core';
import { directions, newBoardTemplate } from './core';

let board: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

let canTurnAble = 1; // どのオセロを返すターンなのか
const win = { black: -1, white: -1 }; // 勝敗時にオセロの置いた個数を計算する用
let isPassFront = false; // 前のターンでパスをしたか(trueならゲーム終了)
let boardEnd = false; // 試合が終了している

export const boardUseCase = {
  getBoard: (): ReturnItems => {
    const nowBoard: number[][] = JSON.parse(JSON.stringify(board));

    const newBoard: number[][] = nowBoard.map((y, i) => {
      return y.map((x, j) => {
        return turnFunc(j, i, canTurnAble, true) ? 3 : x === 3 ? 0 : x;
      });
    });
    winCheck();
    return { board: newBoard, nowTurn: canTurnAble, youCanTurn: false, win, msg: '' };
  },
  clickBoard: (x: number, y: number, userId: UserId): ReturnItems => {
    const color: number = colorUseCase.createColor(userId);

    let youCanTurn = false;

    if (canTurnAble === color) {
      youCanTurn = true;
      if (x !== -1) turnFunc(x, y, color, false);
    }
    const msg: string = passCheck(canTurnAble);

    return { board, nowTurn: canTurnAble, youCanTurn, win, msg };
  },
  deleteBoard: () => {
    if (boardEnd) {
      board = JSON.parse(JSON.stringify(newBoardTemplate));
      canTurnAble = 1;
      win.black = -1;
      win.white = -1;
      isPassFront = false;
      boardEnd = false;
    }
  },
};

const winCheck = () => {
  if (win.black === -1) {
    let isZero = false;

    let black = 0;
    let white = 0;

    for (const y of board) {
      for (const x of y) {
        if (x === 0 || x === 3) {
          isZero = true;
          break;
        }

        if (x === 1) black++;
        if (x === 2) white++;
      }
      if (isZero) break;
    }

    //勝敗判定
    if (!isZero) {
      win.black = black;
      win.white = white;
    }
  }
};

const passCheck = (turnColor: number): string => {
  if (win.black === -1) {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (turnFunc(x, y, turnColor, true)) return '';
      }
    }
    //2回パスなので勝敗を出す
    if (isPassFront) {
      let white = 0;
      let black = 0;

      for (const y of board) {
        for (const x of y) {
          if (x === 1) black++;
          if (x === 2) white++;
        }
      }

      win.black = black;
      win.white = white;
      boardEnd = true;
      return 'これ以上置く場所がないのでゲームを終了しました';
    }

    isPassFront = true;
    canTurnAble = 3 - turnColor;
    return 'パス';
  }
  boardEnd = true;
  return 'これ以上置く場所がないのでゲームを終了しました';
};

const turnFunc = (x: number, y: number, turnColor: number, vertification: boolean) => {
  let isTurnAble = false;

  const newBoard: number[][] = JSON.parse(JSON.stringify(board));

  let isSet = false;

  for (const oneDir of directions) {
    //そもそも置けるか
    if (
      (board[y][x] === 0 || board[y][x] === 3) &&
      board[y + oneDir[1]] !== undefined &&
      board[y + oneDir[1]][x + oneDir[0]] !== undefined &&
      (board[y + oneDir[1]][x + oneDir[0]] !== 0 || board[y + oneDir[1]][x + oneDir[0]] !== 3) &&
      board[y + oneDir[1]][x + oneDir[0]] !== turnColor
    ) {
      //ここからひっくり返すコード
      for (const oneDirOther of directions) {
        const turnes: number[][] = [];
        for (let i = 1; i < 8; i++) {
          //自機が黒の時白だったら次のiへ、0だったりあふれたり1のときに隣が自機だったらbreak
          if (
            board[y + oneDirOther[1] * i] === undefined || //y方向のあふれ
            board[y + oneDirOther[1] * i][x + oneDirOther[0] * i] === undefined || //x方向のあふれ
            board[y + oneDirOther[1] * i][x + oneDirOther[0] * i] === 0 || //0か3だった場合
            board[y + oneDirOther[1] * i][x + oneDirOther[0] * i] === 3 ||
            (i === 1 && board[y + oneDirOther[1] * i][x + oneDirOther[0] * i] === turnColor)
          )
            break;

          //検索していって自機を見つけた時(隣の場合は除く)これらを置き換えてbreak
          if (board[y + oneDirOther[1] * i][x + oneDirOther[0] * i] === turnColor && i !== 1) {
            newBoard[y][x] = turnColor;
            isSet = true;
            isTurnAble = true;

            if (!vertification) {
              for (const onePos of turnes) newBoard[onePos[0]][onePos[1]] = turnColor;
            } else return isTurnAble;

            break;
          }

          //次のfor用に記録しておく
          turnes.push([y + oneDirOther[1] * i, x + oneDirOther[0] * i]);
        }
      }

      if (isSet) canTurnAble = 3 - turnColor;
    }
  }

  if (!vertification) {
    board = newBoard;
  }

  return isTurnAble;
};
