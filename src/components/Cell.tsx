import styles from './cell.module.css';

export const Cell = (props: { color: number; isMyturn: boolean; onClick: () => void }) => {
  return (
    <div className={styles.cell} onClick={props.onClick}>
      {props.color !== 0 && (
        <div
          className={styles.stone}
          style={{
            background:
              props.color === 3
                ? props.isMyturn
                  ? '#ffdc00'
                  : '#999696'
                : props.color === 1
                ? '#000'
                : '#fff',
          }}
        />
      )}
    </div>
  );
};
