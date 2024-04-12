import { useContacts } from '../../hooks';
import { Input, Button } from '../../ui-kit';
import * as styles from './Form.module.css';

type FormType = 'hidden' | 'add' | 'update';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  type: FormType;
  contactId: number | null;
}

const Form = ({ type, contactId, ...props }: FormProps) => {
  const { contacts, createContact, updateContact, deleteContact } = useContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  return (
    <form {...props}>
      <div className={styles.body}>
        <h2 className={styles.title}>Eintrag bearbeiten</h2>
        <div className={styles.grid}>
          <div>
            <Input label="Vorname*" type="text" name="firstname" value={contact?.firstname} />
          </div>
          <div>
            <Input label="Nachname*" type="text" name="lastname" value={contact?.lastname} />
          </div>
          <div className={styles.span}>
            <Input label="E-Mail*" type="email" name="email" value={contact?.email} />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        {type === 'update' && (
          <Button variant="text" type="button" onClick={() => deleteContact(contactId as number)}>
            Löschen
          </Button>
        )}
        <div className={styles.footerInner}>
          <Button variant="outlined" type="reset">Abbrechen</Button>
          <Button variant="primary" type="submit">Speichern</Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
export type { FormType };
