import { Logo } from "../../ui-kit";
import * as styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <Logo />
  </header>
);

export default Header;
