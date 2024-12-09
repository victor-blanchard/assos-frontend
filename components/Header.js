import styles from "../styles/Header.module.css";
import Link from "next/link";
import { faMagnifyingGlass } from '@fortawesome/react-fontawesome';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoAndSearchContainer}>
        <Image className={styles.logo}>
          <Link href="/" />
        </Image>
        <input className={styles.searchText} placeholder="search..."></input>
        <input
          className={styles.searchLocation}
          placeholder="select the location..."
        ></input>
        <FontAwesomeIcon
          className={styles.btnSearch}
          icon={faMagnifyingGlass}
        />
      </div>
      <div className={styles.signinSignupContainer}>
        <button className={styles.btnSignin}>Sign-in</button>
        <button className={styles.btnSignup}>Sign-up</button>
      </div>
    </header>
  );
}

export default Header;
