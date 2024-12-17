import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isModalVisible, setFormType, logout } from "../reducers/users";
import { isModalCreateOpen, isCreateAsso, getAssoInfo, logoutAsso } from "../reducers/associations";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRightFromBracket,
  faUser,
  faUsers,
  faCalendarDays,
  faAddressCard,
  faBell,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { addEvents, deleteEvents, addFilters, deleteFilters } from "../reducers/searchResults";
import DropMenu from "./DropMenu";
import ModalCreate from "./ModalCreate";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const token = user.token;
  console.log('TOKEN ==============>',token);
  const asso = useSelector((state) => state.associations.value.assoInfos)
  console.log('getAsso =>', asso)
  const isAssociationOwner = useSelector((state) => state.users.value.isAssociationOwner);
  const isExistingAssociaiton = useSelector((state) => state.associations.value.assosCreate);

  console.log("L'association exist", isExistingAssociaiton);
  // console.log("user : => ", user);
  console.log("IsAssociaitonOwner =>", isAssociationOwner);
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
    router.push("/search"); //gere la navigation au click vers la page search en évitant la page blanche
  };

  useEffect(() => {
    fetch(`http://localhost:3000/associations/getasso/${token}`)
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        console.log('Avant dispatch =>',data)
        dispatch(isCreateAsso(true));
        !asso && dispatch(getAssoInfo(data.asso));
        console.log('Asso de l\'owner',data.asso)
      } else {
        dispatch(isCreateAsso(false));
        console.log('Pas d\'associaition', data)
      }
      
    })
  }, [])

  const handleSignUp = () => {
    dispatch(setFormType("signup"));
    dispatch(isModalVisible(true));
  };
  const handleSignIn = () => {
    dispatch(setFormType("signin"));
    dispatch(isModalVisible(true));
  };

  const handleLogout = () => {
    router.push('/');
    dispatch(logout());
    dispatch(logoutAsso());
    console.log("Déconnexion user : => ", token);
  };

  const handleContact = () => {
    console.log("contact");
    // router.push('/contact');
  };
  const handleCalendar = () => {
    console.log("calendrier");
    //  router.push('/event');
  };
  const handleNotification = () => {
    console.log("Notification");
  };

  const handleMyasso = () => {
    console.log("Mes association")
  }

  const handleCreateAsso = () => {
    console.log("click");
    dispatch(isModalCreateOpen(true));
  };
  let signSection;
  if (!token) {
    signSection = (
      <div className={styles.signinSignupContainer}>
        <Button onClick={handleSignIn} className={styles.btnSignin}>
          Sign-in
        </Button>
        <Button onClick={handleSignUp} className={styles.btnSignup}>
          Sign-up
        </Button>
      </div>
    );
  } else {
    signSection = (
      <div className={styles.shortcut}>
        <div className={styles.infoSession}>
          <h3 className={styles.txtWelcome}>Bienvenue {user.username} </h3>
          {isAssociationOwner  && !isExistingAssociaiton && (
            <p onClick={handleCreateAsso} className={styles.createAssoMsg}>
              Creez votre association <FontAwesomeIcon icon={faPlus} color={"blue"} />
            </p>
          )}
        </div>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon
            title="Evenement à venir"
            onClick={handleCalendar}
            className={`${styles.headerIcon} ${styles.calendarIcon}`}
            icon={faCalendarDays}
          />
          {isAssociationOwner ? <FontAwesomeIcon
            title="Contact"
            onClick={handleContact}
            className={`${styles.headerIcon} ${styles.contactIcon}`}
            icon={faAddressCard}
          />: <FontAwesomeIcon 
                title="Mes associations"
                onClick={handleMyasso}
                className={`${styles.headerIcon} ${styles.contactIcon}`}
                icon={faUsers}
                 />}
          <FontAwesomeIcon
            title="Notification"
            onClick={handleNotification}
            className={`${styles.headerIcon} ${styles.bellIcon}`}
            icon={faBell}
          />
          <DropMenu onLogout={handleLogout} />
        </div>
      </div>
    );
  }

  // <div onClick={handleLogout}>
  //     <p className={styles.txtLogout}>Se déconnecter</p>
  //     <FontAwesomeIcon className={styles.logout} icon={faRightFromBracket} />
  //     </div>

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
            placeholder="Où ?"
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
