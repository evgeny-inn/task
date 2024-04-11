import { ContactsProvider } from './providers';
import { Header, Main } from './components';
import Home from './pages/Home';
import './index.css';

const App = () => (
  <ContactsProvider>
    <Header />
    <Main>
      <Home />
    </Main>
  </ContactsProvider>
);

export default App;
