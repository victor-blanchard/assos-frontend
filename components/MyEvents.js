import React, { useState } from 'react';
import styles from "../styles/MyEvents.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';


function MyEvents() {

    const [tab, setTab] = useState("upcoming"); // État pour gérer l'onglet actif

    const events = {
        upcoming: [
            {
                id: 1,
                image: "/event1.jpg",
                date: "2024-12-20",
                title: "Conférence Tech",
                description: "Une conférence sur les dernières avancées en technologie.",
            },
            {
                id: 2,
                image: "/event2.jpg",
                date: "2024-12-25",
                title: "Concert de Noël",
                description: "Un magnifique concert pour célébrer les fêtes.",
            },
        ],
        past: [
            {
                id: 3,
                image: "/event3.jpg",
                date: "2024-11-10",
                title: "Atelier de cuisine",
                description: "Un atelier de cuisine pour apprendre les bases.",
            },
        ],
    };

    const displayedEvents = tab === "upcoming" ? events.upcoming : events.past;

    return (
        <div className={styles.main}>
            <div className={styles.leftSection}>
                <Link href="/" className={styles.homeLink}><FontAwesomeIcon icon={faArrowLeft} />Retour à la page d'accueil</Link>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${tab === "upcoming" ? styles.active : ""}`}
                        onClick={() => setTab("upcoming")}
                    >
                        À venir
                    </button>
                    <button
                        className={`${styles.tab} ${tab === "past" ? styles.active : ""}`}
                        onClick={() => setTab("past")}
                    >
                        Passés
                    </button>
                </div>
            </div>

            {/* Partie droite */}
            <div className={styles.rightSection}>
            <h1 className={styles.title}>Mes Évènements</h1>
                {displayedEvents.map((event) => (
                    <div key={event.id} className={styles.eventBox}>
                        <Image
                            src='/cooking.jpg'
                            alt="image d'évènement culinaire"
                            className={styles.eventImage}
                            width={150}
                           height={100}
                        />
                        <div className={styles.eventDetails}>
                            <p className={styles.eventDate}>{event.date}</p>
                            <h3 className={styles.eventTitle}>{event.title}</h3>
                            <p className={styles.eventDescription}>{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    
    );
}


export default MyEvents;