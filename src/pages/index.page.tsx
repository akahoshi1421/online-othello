import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Cell } from 'src/components/Cell';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const [turnColor, setTurnColor] = useState(1);
  const [isMyturn, setIsMyturn] = useState(false);
  const [win, setWin] = useState({ white: -1, black: -1 });
  const [msg, setMsg] = useState('');

  const fetchBoard = async () => {
    const res = await apiClient.board.$get().catch(returnNull);

    if (res !== null) {
      setBoard(res.board);
      setTurnColor(res.nowTurn);
      setWin(res.win);
    }
  };

  const onClick = async (x: number, y: number) => {
    await apiClient.board.$post({
      body: { x, y },
    });

    await fetchBoard();
  };

  const checkMyTurn = async () => {
    const res = await apiClient.board
      .$post({
        body: { x: -1, y: -1 },
      })
      .catch(returnNull);

    if (res !== null) {
      setIsMyturn(res.youCanTurn);
      setMsg(res.msg);
    }
  };

  useEffect(() => {
    const cancelId = setInterval(fetchBoard, 500);
    const cancelId2 = setInterval(checkMyTurn, 500);

    return () => {
      clearInterval(cancelId);
      clearInterval(cancelId2);
    };
  }, []);

  if (!user || !board) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <p>{msg}</p>
        {win.black !== -1 && (
          <>
            <h2 className={styles.win}>
              結果:
              {win.black === win.white
                ? '引き分け'
                : win.black > win.white
                ? '黒の勝ち'
                : '白の勝ち'}
            </h2>
            <ul>
              <li>黒: {win.black}</li>
              <li>白: {win.white}</li>
            </ul>
          </>
        )}
        {win.black === -1 && (
          <p>
            <b style={{ color: 'red' }}>{isMyturn ? 'あなた' : '相手'}</b>(
            {turnColor === 1 ? '黒' : '白'})のターン
          </p>
        )}

        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((color, x) => (
              <Cell key={`${x}-${y}`} color={color} onClick={() => onClick(x, y)} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
