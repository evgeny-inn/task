import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useContacts } from '../../hooks';
import { Input, Button } from '../../ui-kit';
import * as styles from './Form.module.css';
import type { SubmitHandler } from 'react-hook-form';

type FormType = 'hidden' | 'add' | 'update';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  type: FormType;
  contactId: number | null;
  closeModal: () => void;
}

interface InputValues {
  firstname: string;
  lastname: string;
  email: string;
}

const Form = ({ type, contactId, closeModal, ...props }: FormProps) => {
  const [error, setError] = useState('');
  const { contacts, createContact, updateContact, deleteContact } = useContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  const { handleSubmit, control } = useForm({
    values: {
      firstname: contact?.firstname ?? '',
      lastname: contact?.lastname ?? '',
      email: contact?.email ?? '',
    },
  });

  const onAdd: SubmitHandler<InputValues> = async (data) => {
    try {
      await createContact(data);
      closeModal();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const onUpdate: SubmitHandler<InputValues> = async (data) => {
    try {
      await updateContact(contactId as number, data);
      closeModal();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handlers = {
    add: onAdd,
    update: onUpdate,
    hidden: () => {},
  };

  return (
    <form onSubmit={handleSubmit(handlers[type])} onReset={closeModal} {...props}>
      <div className={styles.body}>
        <h2 className={styles.title}>Eintrag bearbeiten</h2>
        <div className={styles.grid}>
          <div>
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <Input label="Vorname*" type="text" {...field} />
              )}
            />
          </div>
          <div>
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <Input label="Nachname*" type="text" {...field} />
              )}
            />
          </div>
          <div className={styles.span}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input label="E-Mail*" type="email" {...field} />
              )}
            />
          </div>
        </div>
      </div>
      {error && <p className={styles.feedback}>Something went wrong. Try again.</p>}
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
