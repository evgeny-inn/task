import { useContacts } from '../../hooks';
import { UpdateForm } from '../../components';
import { Button, Contact, Modal } from '../../ui-kit';
import * as styles from './Home.module.css';

const Home = () => {
  const { contacts } = useContacts();

  return (
    <>
      <div className={styles.button}>
        <Button variant="primary">Neuer Antrag</Button>
      </div>
      <ul className={styles.contacts}>
        {contacts.map(({ id, firstname, lastname, email }) => (
          <li key={id}>
            <Contact title={`${firstname} ${lastname}`} text={email} />
          </li>
        ))}
      </ul>
      <Modal isOpen={false} onClose={() => {}}>
        <UpdateForm />
      </Modal>
    </>
  );
};

export default Home;
