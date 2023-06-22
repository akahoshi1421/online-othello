import { useEffect, useState } from 'react';

export const useGame = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [win, setWin] = useState({ black: -1, white: -1 });

  //全てのボードが埋まったら勝敗表示
  useEffect(() => {
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
        setWin({ black, white });
      }
    }
  }, [board, win.black]);

  //直前のターンでパスしたか
  const [isPassFront, setIsPassFront] = useState(false);

  //パス判定
  useEffect(() => {
    if (win.black === -1) {
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (turnFunc(x, y, true)) {
            return;
          }
        }
      }

      //パスの場合
      alert('パス');

      //2回パスなので勝敗を出す
      if (isPassFront) {
        alert('これ以上置く場所がないのでゲームを終了しました');
        let white = 0;
        let black = 0;

        for (const y of board) {
          for (const x of y) {
            if (x === 1) black++;
            if (x === 2) white++;
          }
        }

        setWin({ black, white });
        return;
      }

      setIsPassFront(true);
      setTurnColor(3 - turnColor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  const onClick = (x: number, y: number) => {
    turnFunc(x, y, false);
  };

  //ひっくり返りを検知したあと置く場所を知らせる黄色いマスを設置
  useEffect(() => {
    const nowBoard: number[][] = JSON.parse(JSON.stringify(board));

    const newBoard = nowBoard.map((y, i) => {
      return y.map((x, j) => {
        return turnFunc(j, i, true) ? 3 : x === 3 ? 0 : x;
      });
    });

    setBoard(newBoard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  /**
   * オセロをひっくりかえす \
   * 次におくことができる位置の表示やひっくり返す処理、パス判定に使う関数
   *
   * @param x オセロのx座標
   * @param y オセロのy座標
   * @param vertification オセロがひっくり返せる時ひっくり返す処理を行うか(falseのときひっくり返す)
   * @returns その盤面はオセロをひっくり返すことができるか
   */
  const turnFunc = (x: number, y: number, vertification: boolean) => {
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

        isSet && setTurnColor(3 - turnColor);
        isSet && setIsPassFront(false);
      }
    }

    if (!vertification) {
      setBoard(newBoard);
    }

    return isTurnAble;
  };

  return { win, turnColor, board, onClick };
};
