import Link from "next/link"; 
import Image from "next/image"; 
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
	

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoAndSearchContainer}>
        <Image
          className={styles.logo}
          // src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
        />{" "}
     
        <input
          className={styles.searchText}
          placeholder="search..."
          type="text"
        />{" "}
   
        <input
          className={styles.searchLocation}
          placeholder="select the location..."
          type="text" // input etiketine type özelliği ekleyin
        />
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
