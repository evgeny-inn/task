import * as styles from './Record.module.css';

interface RecordProps {
  title: string;
  text: string;
}

const Record = ({ title, text }: RecordProps) => {
  return (
    <div className={styles.record}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Record;
