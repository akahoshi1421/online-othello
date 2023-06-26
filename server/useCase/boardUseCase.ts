import type { UserId } from '$/commonTypesWithClient/branded';
import { colorUseCase } from './colorUseCase';

export type ReturnItems = {
  /**  ボード */
  board: number[][];

  /**  現在オセロを返せるユーザ */
  nowTurn: number;

  /** 送ってきたユーザはそもそもオセロを返せるか */
  youCanTurn: boolean;
};

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

let canTurnAble = 1;

export const boardUseCase = {
  getBoard: (): ReturnItems => {
    const nowBoard: number[][] = JSON.parse(JSON.stringify(board));

    const newBoard: number[][] = nowBoard.map((y, i) => {
      return y.map((x, j) => {
        return turnFunc(j, i, canTurnAble, true) ? 3 : x === 3 ? 0 : x;
      });
    });

    return { board: newBoard, nowTurn: canTurnAble, youCanTurn: false };
  },
  clickBoard: (x: number, y: number, userId: UserId): ReturnItems => {
    const color: number = colorUseCase.createColor(userId);

    let youCanTurn = false;

    if (canTurnAble === color && x !== -1) {
      youCanTurn = true;
      turnFunc(x, y, color, false);
    }

    return { board, nowTurn: canTurnAble, youCanTurn };
  },
};

/**
 * オセロをひっくりかえす \
 * 次におくことができる位置の表示やひっくり返す処理、パス判定に使う関数
 *
 * @param x オセロのx座標
 * @param y オセロのy座標
 * @param turnColor 返すオセロの色
 * @param vertification オセロがひっくり返せる時ひっくり返す処理を行うか(falseのときひっくり返す)
 * @returns その盤面はオセロをひっくり返すことができるか
 */
const turnFunc = (x: number, y: number, turnColor: number, vertification: boolean) => {
  let isTurnAble = false;

  const newBoard: number[][] = JSON.parse(JSON.stringify(board));

  const directions: number[][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

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
              for (const onePos of turnes) {
                newBoard[onePos[0]][onePos[1]] = turnColor;
              }
            } else {
              return isTurnAble;
            }

            break;
          }

          //次のfor用に記録しておく
          turnes.push([y + oneDirOther[1] * i, x + oneDirOther[0] * i]);
        }
      }

      // isSet && setTurnColor(3 - turnColor);
      // isSet && setIsPassFront(false);

      if (isSet) {
        canTurnAble = 3 - turnColor;
      }
    }
  }

  if (!vertification) {
    board = newBoard;
  }

  return isTurnAble;
};
