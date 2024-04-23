import { useState } from 'react';
import { useContacts } from '../../hooks';
import { Form } from '../../components';
import { Button, Contact, Modal } from '../../components/ui-kit';
import * as styles from './Home.module.css';
import type { FormType } from '../../components';

const Home = () => {
  const { contacts } = useContacts();
  const [formType, setFormType] = useState<FormType>('hidden');
  const [contactToUpdate, setContactToUpdate] = useState<number | null>(null);

  const openAddModal = () => {
    setFormType('add');
  };

  const openUpdateModal = (id: number) => () => {
    setFormType('update');
    setContactToUpdate(id);
  };

  const closeModal = () => {
    setFormType('hidden');
    setContactToUpdate(null);
  };

  return (
    <>
      <div className={styles.buttonDesktop}>
        <Button variant="primary" onClick={openAddModal}>Neuer Eintrag</Button>
      </div>
      <div className={styles.buttonMobile}>
        <Button variant="icon" onClick={openAddModal}>+</Button>
      </div>
      <ul className={styles.contacts}>
        {contacts.map(({ id, firstname, lastname, email }) => (
          <li key={id} className={styles.contact} onClick={openUpdateModal(id)}>
            <Contact title={`${firstname} ${lastname}`} text={email} />
          </li>
        ))}
      </ul>
      <Modal isOpen={formType !== 'hidden'} onClose={closeModal}>
        <Form type={formType} contactId={contactToUpdate} closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default Home;
