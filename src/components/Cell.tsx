import styles from './cell.module.css';

export const Cell = (props: { color: number; onClick: () => void }) => {
  return (
    <div className={styles.cell} onClick={props.onClick}>
      {props.color !== 0 && (
        <div
          className={styles.stone}
          style={{
            background: props.color === 3 ? '#ffdc00' : props.color === 1 ? '#000' : '#fff',
          }}
        />
      )}
    </div>
  );
};
