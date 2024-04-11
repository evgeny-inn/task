import * as styles from './Record.module.css';

const Record = ({ title, text }) => {
  return (
    <div className={styles.record}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Record;
