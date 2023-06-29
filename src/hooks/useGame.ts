import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { userAtom } from 'src/atoms/user';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';

export const useGame = () => {
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

  const deleteBoard = async () => {
    await apiClient.board.$delete();
  };

  useEffect(() => {
    const cancelId = setInterval(fetchBoard, 500);
    const cancelId2 = setInterval(checkMyTurn, 500);

    return () => {
      clearInterval(cancelId);
      clearInterval(cancelId2);
    };
  }, []);

  return { user, board, turnColor, isMyturn, win, msg, onClick, deleteBoard };
};
