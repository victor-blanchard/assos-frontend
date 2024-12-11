import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isModalVisible } from '../reducers/users';
import Image from "next/image";
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { addPlaceToStore } from "../reducers/place";


function Header() {
  // const dispatch = useDispatch();
  // const [currentPlace, setcurrentPlace] = useState({});
  // const places = useSelector((state) => state.places.value.placeName);
  const dispatch = useDispatch();

const [search, setSearch] = useState('')
console.log(search)
const [location, setLocation] = useState('')
console.log(location)

const handleSearch = () => {
  console.log(search);
};

 

  const handleSearchEvents = () => {
    window.location.href = '/search';
   
  };

  const handleSignUp = async () => {
    dispatch(isModalVisible(true));
  };
  const handleSign = async () => {};


  return (
    <header className={styles.header}>
      <div className={styles.logoAndSearchContainer}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/logo.png"
            alt="Logo"
            width={100}
            height={50}
          />
        </Link>
        <div className={styles.searchContainers}>
          <input
            className={styles.searchText}
            placeholder="search..."
            type="text"
            onChange={(e) => setSearch(e.target.value)} value={search}
          />
          <input
            className={styles.searchLocation}
            placeholder="select the location..."
            type="text"
            onChange={(e) => setLocation(e.target.value)} value={location}
            // value={currentPlace}
            // onChange={(e) => setcurrentPlace(e.target.value)}
          />
          <FontAwesomeIcon
            className={styles.btnSearch}
            icon={faMagnifyingGlass}
            onClick={() => handleSearchEvents()}
          />
        </div>
      </div>
      <div className={styles.signinSignupContainer}>
        <button  className={styles.btnSignin}>Sign-in</button>
        <button onClick={handleSignUp} className={styles.btnSignup}>Sign-up</button>
      </div>
    </header>
  );
}

export default Header;
