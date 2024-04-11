import { Input, Button } from '../../ui-kit';
import * as styles from './UpdateForm.module.css';

const UpdateForm = () => {

  return (
    <form>
      <div className={styles.body}>
        <h2 className={styles.title}>Eintrag bearbeiten</h2>
        <div className={styles.grid}>
          <div>
            <Input label="Vorname*" type="text" name="firstname" />
          </div>
          <div>
            <Input label="Nachname*" type="text" name="lastname" />
          </div>
          <div className={styles.span}>
            <Input label="E-Mail*" type="email" name="email" />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Button variant="text" type="button">Löschen</Button>
        <div className={styles.footerInner}>
          <Button variant="outlined" type="reset">Abbrechen</Button>
          <Button variant="primary" type="submit">Speichern</Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateForm;
