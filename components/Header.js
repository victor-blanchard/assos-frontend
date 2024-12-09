import styles from "../styles/Header.module.css";
import Link from "next/link";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <Header className={styles.header}>
      <div className={styles.logoAndSearchContainer}>
        <Image className={styles.logo}>
          <Link href="/" />
        </Image>
        <input className={searchText} placeholder="search..."></input>
        <input
          className={searchLocation}
          placeholder="select the location..."
        ></input>
        <FontAwesomeIcon
          className={styles.btnSearch}
          icon={faMagnifyingGlass}
        />
      </div>
      <div className={styles.signinSignupContainer}>
        <button className={btnSignin}>Sign-in</button>
        <button className={btnSignup}>Sign-up</button>
      </div>
    </Header>
  );
}

export default Header;
