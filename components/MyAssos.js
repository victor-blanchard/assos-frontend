import React from "react";
import styles from "../styles/MyAssos.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function MyAssos() {
  const router = useRouter();
  const user = useSelector((state) => state.users.value);
  const token = user.token;
  console.log("token of user in Assos pasge ==> " + token);

  const [likedAssos, setLikedAssos] = useState([]);

  useEffect(() => {
    if (user && user.token) {
      fetch(`http://localhost:3000/users/followingAssociations/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API response:", data);
          setLikedAssos(data.followingAssociations); // likedAssos dizisini al
        })
        .catch((error) => console.error("API fetch error:", error));
    }
  }, [user]);

  const handleClick = (eventId) => {
    router.push(`/event/${eventId}`);
  };

  return (
    <div className={styles.main}>
      <div className={styles.leftSection}>

      <Link href="/" className={styles.homeLink}>
        <FontAwesomeIcon icon={faArrowLeft} /> Retour A la page d'accueil
      </Link>
      </div>

      <div className={styles.rightSection}>
        <h1 className={styles.title}>Mes associations</h1>
        <div className={styles.container}>
          {likedAssos.length > 0 ? (
            likedAssos.map((asso) => (
              <div
                key={asso._id}
                className={styles.eventBox}
                onClick={() => handleClick(asso._id)}
              >
                <Image
                  src={asso.image}
                  alt={asso.title}
                  className={styles.eventImage}
                  width={100}
                  height={100}
                />
                <div className={styles.eventDetails}>
                  <h2 className={styles.eventTitle}>{asso.name}</h2>
                  <p className={styles.eventDescription}>{asso.description}</p>
                  <p className={styles.eventDescription}>{asso.categories.join(', ')}</p>
                  <p className={styles.eventDate}>Rue: {asso.address.street}</p>
                  <p className={styles.eventDate}>Ville: {asso.address.city}</p>
                  <p className={styles.eventDate}>Code Postale: {asso.address.zipcode}</p>
                  <p className={styles.eventDate}>E-mail: {asso.email}</p>
                  <p className={styles.eventDate}>Téléphone: {asso.phone}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun évenement dans cette catégorie.</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default MyAssos;
