import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isModalVisible } from "../reducers/users";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { addEvents, deleteEvents, addFilters, deleteFilters } from "../reducers/searchResults";

function Header() {
  const dispatch = useDispatch();
  // const [currentPlace, setcurrentPlace] = useState({});
  // const places = useSelector((state) => state.places.value.placeName);

  const [keyword, setKeyword] = useState("");

  const [location, setLocation] = useState("");

  // let events = useSelector((state) => state.searchResults?.value.events);

  const handleSearch = () => {
    dispatch(addFilters({ keyword: keyword, location: location }));

    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries({
          keyword: keyword,
          location: location,
        }).filter(([_, value]) => value !== undefined && value !== null && value !== "")
      )
    );
    // Remplacer %2C par ,
    const queryString = params.toString().replace(/%2C/g, ",");

    fetch(`http://localhost:3000/events/filtered?${queryString}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addEvents(data.events));
          console.log(`${data.events.length} events ajoutés au reducer searchResult`);
          console.log(data);
        }
      });
    setKeyword("");
    setLocation("");
    window.location.href = "/search";
  };

  const handleSignUp = async () => {
    dispatch(isModalVisible(true));
  };
  const handleSign = async () => {};

  return (
    <header className={styles.header}>
      <div className={styles.logoAndSearchContainer}>
        <Link href="/">
          <Image className={styles.logo} src="/logo.png" alt="Logo" width={100} height={50} />
        </Link>
        <div className={styles.searchContainers}>
          <input
            className={styles.searchText}
            placeholder="Une activité ? "
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <input
            className={styles.searchLocation}
            placeholder="Ou ?"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            // value={currentPlace}
            // onChange={(e) => setcurrentPlace(e.target.value)}
          />
          <FontAwesomeIcon
            className={styles.btnSearch}
            icon={faMagnifyingGlass}
            onClick={() => handleSearch()}
          />
        </div>
      </div>
      <div className={styles.signinSignupContainer}>
        <button className={styles.btnSignin}>Sign-in</button>
        <button onClick={handleSignUp} className={styles.btnSignup}>
          Sign-up
        </button>
      </div>
    </header>
  );
}

export default Header;
