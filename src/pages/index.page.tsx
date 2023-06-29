import { Cell } from 'src/components/Cell';
import { Loading } from 'src/components/Loading/Loading';
import { useGame } from 'src/hooks/useGame';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import styles from './index.module.scss';

const Home = () => {
  const { user, board, turnColor, isMyturn, win, msg, onClick, deleteBoard } = useGame();

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
              <Cell
                key={`${x}-${y}`}
                color={color}
                isMyturn={isMyturn}
                onClick={() => onClick(x, y)}
              />
            ))
          )}
        </div>

        {win.black !== -1 && (
          <div className={styles.reTitle}>
            <div className={styles.reTitleText}>再戦しますか？</div>
            <button className={styles.reBtn} onClick={() => deleteBoard()}>
              再戦する
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
