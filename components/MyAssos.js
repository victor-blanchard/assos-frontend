import React from "react";
import styles from "../styles/MyAssos.module.css";
import Link from "next/link";
import { Button } from "antd";
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

  const handleClick = (assoId) => {
    router.push(`/public_association?id=${assoId}`);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles.main}>
      <div className={styles.leftSection}>
        <Button className={styles.backButton} onClick={handleGoBack}>
          <FontAwesomeIcon className={styles.btnSearch} icon={faArrowLeft} />
          Retour
        </Button>
      </div>

      <div className={styles.rightSection}>
        <h1 className={styles.title}>Mes associations</h1>
        <div className={styles.container}>
          {likedAssos.length > 0 ? (
            likedAssos.map((asso) => (
              <div key={asso._id} className={styles.eventBox} onClick={() => handleClick(asso._id)}>
                {/* <Image
                  src={`/${asso.image}`}
                  alt={asso.title}
                  className={styles.eventImage}
                  width={100}
                  height={80}
                /> */}
                <div className={styles.eventDetails}>
                  <h2 className={styles.eventTitle}>{asso?.name}</h2>
                  <p className={styles.description}>{asso?.description}</p>
                  <p className={styles.eventDescription}>{asso?.categories?.join(", ")}</p>
                  <p className={styles.eventDate}>{asso?.address?.city}</p>
                  <p className={styles.eventDate}>{asso?.address?.zipcode}</p>
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
