import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isModalVisible, setFormType, logout } from '../reducers/users';
import Image from "next/image";
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { addEvents, deleteEvents } from "../reducers/searchResults";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const token = user.token;
  // const [currentPlace, setcurrentPlace] = useState({});
  // const places = useSelector((state) => state.places.value.placeName);

  const [search, setSearch] = useState("");

  const [location, setLocation] = useState("");

  // let events = useSelector((state) => state.searchResults?.value.events);

  const handleSearch = () => {
    const params = new URLSearchParams({
      keyword: search,
      location: location,
    });
    fetch(`http://localhost:3000/events/filtered?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addEvents(data.events));
          console.log(`${data.events.length} events ajoutés au reducer searchResult`);
        }
      });
    setSearch("");
    setLocation("");
    router.push('/search'); //gere la navigation au click vers la page search en évitant la page blanche
    // window.location.href = "/search";
  };

  const handleSignUp = () => {
    dispatch(setFormType('signup'));
    dispatch(isModalVisible(true));
  };
  const handleSignIn = () => {
    dispatch(setFormType('signin'));
    dispatch(isModalVisible(true));
  };

  const handleLogout = () => {
    dispatch(logout());
    console.log('Déconnexion user : => ',token)
  };

  let signSection;
  if (!token) {
    signSection = (<div className={styles.signinSignupContainer}>
        <button onClick={handleSignIn} className={styles.btnSignin}>Sign-in</button>
        <button onClick={handleSignUp} className={styles.btnSignup}>Sign-up</button>
      </div>)
  } else {
    signSection = (<div onClick={handleLogout} className={styles.logoutContainer}>
      <p className={styles.txtLogout}>Se déconnecter</p>
      <FontAwesomeIcon className={styles.logout} icon={faRightFromBracket} />
      </div>)
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoAndSearchContainer}>
        <Link href="/">
          <Image className={styles.logo} src="/logo.png" alt="Logo" width={100} height={50} />
        </Link>
        <div className={styles.searchContainers}>
          <input
            className={styles.searchText}
            placeholder="search..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <input
            className={styles.searchLocation}
            placeholder="select the location..."
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
      {signSection}
    </header>
  );
}

export default Header;
