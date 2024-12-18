import styles from "../styles/MyEvents.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Tabs } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function MyEvents() {
  const router = useRouter();
  const user = useSelector((state) => state.users.value);
  const token = user.token;
  console.log("token of user in Event pasge ==> " + token);

  const [likedEvents, setLikedEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    if (user && user.token) {
      fetch(`http://localhost:3000/users/getUserLikedEvents/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API response:", data);
          setLikedEvents(data.likedEvents); // likedEvents dizisini al
        })
        .catch((error) => console.error("API fetch error:", error));
    }
  }, [user]);

  const handleClick = (eventId) => {
    router.push(`/event/${eventId}`);
  };

  const items = [
    {
      key: "upcoming",
      label: "À venir",
      children: null,
    },
    {
      key: "past",
      label: "Passés",
      children: null,
    },
  ];

  // Event'leri filtrele
  const displayedEvents = likedEvents.filter((event) => {
    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    if (activeTab === "upcoming") {
      return startDate > now;
    } else {
      return endDate < now;
    }
  });

  return (
    <div className={styles.main}>
    
      <div className={styles.leftSection}>
       <Link href="/" className={styles.homeLink}>
         <FontAwesomeIcon icon={faArrowLeft} /> Retour A la page d'accueil
       </Link>
       <div className={styles.tabs}>
         <Tabs
           tabPosition="left"
           defaultActiveKey="upcoming"
           items={items}
           onChange={(key) => setActiveTab(key)} // Mise Ã  jour de l'onglet actif
         />
    
     </div>
      </div>

      <div className={styles.rightSection}>
        <h1 className={styles.title}>Mes Événements</h1>
        <div className={styles.container}>
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event) => (
              <div
                key={event._id}
                className={styles.eventBox}
                onClick={() => handleClick(event._id)}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  className={styles.eventImage}
                  width={100}
                  height={100}
                />
                <div className={styles.eventDetails}>
                  <h4 className={styles.eventTitle}>
                    Inscription: {event.status}
                  </h4>
                  <h4 className={styles.eventTitle}>{event.name}</h4>
                  <p className={styles.eventDescription}>
                    {event.description}
                  </p>
                  <p className={styles.eventDate}>
                    Date de début:{" "}
                    {new Date(event.startDate).toISOString().slice(0, 10)}
                  </p>
                  <p className={styles.eventDate}>
                    Date de fin:{" "}
                    {new Date(event.endDate).toISOString().slice(0, 10)}
                  </p>
                  <p className={styles.eventDate}>
                    Places disponibles: {event.slotsAvailable}
                  </p>
                  <p className={styles.eventDate}>
                    Public ciblé: {event.target}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun événement dans cette catégorie.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyEvents;