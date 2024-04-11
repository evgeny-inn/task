import { UpdateForm } from '../components';
import { Button, Modal } from '../ui-kit';

const Home = () => (
  <>
    <Button variant="primary">Neuer Antrag</Button>
    <Modal isOpen={false} onClose={() => {}}>
      <UpdateForm />
    </Modal>
  </>
);

export default Home;
