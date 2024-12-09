import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { addPlaceToStore } from "../reducers/place";

function Header() {
  const dispatch = useDispatch();
  const [currentPlace, setcurrentPlace] = useState({});
  const places = useSelector((state) => state.users.value.nickName);

  const handleSearchEvents = () => {
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${currentPlace}`)
      .then((response) => response.json())
      .then((data) => {
        const longitude = data.features[0].geometry.coordinates[0];
        const latitude = data.features[0].geometry.coordinates[1];
        const citiesData = {
          name: placeName,
          longitude: longitude,
          latitude: latitude,
        };

        dispatch(addPlaceToStore(citiesData));
        console.log(citiesData);
      });
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoAndSearchContainer}>
        <Image
          className={styles.logo}
          src="/logo.png"
          alt="Logo"
          width={100}
          height={50}
          href="/"
        />{" "}
        <div className={styles.searchContainers}>
          <input
            className={styles.searchText}
            placeholder="search..."
            type="text"
          />
          <input
            className={styles.searchLocation}
            placeholder="select the location..."
            type="text"
            value={currentPlace}
            onChange={(e) => setcurrentPlace(e.target.value)}
          />
          <FontAwesomeIcon
            className={styles.btnSearch}
            icon={faMagnifyingGlass}
            onClick={() => handleSearchEvents()}
          />
        </div>
      </div>
      <div className={styles.signinSignupContainer}>
        <button className={styles.btnSignin}>Sign-in</button>
        <button className={styles.btnSignup}>Sign-up</button>
      </div>
    </header>
  );
}

export default Header;
