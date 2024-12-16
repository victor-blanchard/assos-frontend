import React from 'react';
import styles from "../styles/Notification.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


function Notification() {
  return (
    <div className={styles.main}>
      <div className={styles.leftSection}>
        <Link href="/" className={styles.homeLink}><FontAwesomeIcon icon={faArrowLeft} />Retour à la page d'accueil</Link>
      </div>
      <div className={styles.rightSection}>
        <h1 className={styles.title}>Mes Notifications</h1>
        <div className={styles.notificationBox}>
          <p className={styles.noNotifications}>Aucune notification</p>
          <div className={styles.notificationItem}></div>
          <div className={styles.notificationItem}></div>
        </div>
      </div>
    </div>
  );
}

export default Notification;


