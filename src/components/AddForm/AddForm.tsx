import { Input, Button } from '../../ui-kit';
import * as styles from './AddForm.module.css';

const AddForm = () => {

  return (
    <form>
      <div className={styles.body}>
        <h2 className={styles.title}>Neuer Eintrag</h2>
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
        <Button variant="outlined" type="reset">Abbrechen</Button>
        <Button variant="primary" type="submit">Speichern</Button>
      </div>
    </form>
  );
};

export default AddForm;
