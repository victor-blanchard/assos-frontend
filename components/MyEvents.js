import React, { useState } from 'react';
import styles from "../styles/MyEvents.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import { Tabs } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';

function MyEvents() {
    const router = useRouter();
    // const user = useSelector((state) => state.users.value);

    // Accéder aux événements favoris depuis le store Redux
    const likedEvents = useSelector((state) => state.users.value.likedEvents);



     // Fonction pour rediriger à la page d'un événement
 const handleClick = (eventId) => {
    router.push(`/event/${eventId}`);
};
     

    const [activeTab, setActiveTab] = useState("upcoming"); // État pour gérer l'onglet actif
    const events = {
        upcoming: [
            {
                id: 1,
                image: "/cooking.jpg",
                date: "2024-12-20",
                title: "Conférence Tech",
                description: "Une conférence sur les dernières avancées en technologie.",
            },
            {
                id: 2,
                image: "/cooking.jpg",
                date: "2024-12-25",
                title: "Concert de Noël",
                description: "Un magnifique concert pour célébrer les fêtes.",
            },
        ],
        past: [
            {
                id: 3,
                image: "/cooking.jpg",
                date: "2024-11-10",
                title: "Atelier de cuisine",
                description: "Un atelier de cuisine pour apprendre les bases.",
            },
        ],
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

    const displayedEvents = activeTab === "upcoming" ? events.upcoming : events.past;

        // // Fonction pour rediriger à la page de l'évènement
        // const handleClick = (link) => {
        //     console.log(link)
        //     router.push('/event');
        // };



    return (
        <div className={styles.main}>
            {/* Section gauche */}
            <div className={styles.leftSection}>
                <Link href="/" className={styles.homeLink}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Retour à la page d'accueil
                </Link>
                <div className={styles.tabs}>
                    <Tabs
                        tabPosition="left"
                        defaultActiveKey="upcoming"
                        items={items}
                        onChange={(key) => setActiveTab(key)} // Mise à jour de l'onglet actif
                    />
                </div>
            </div>

            {/* Section droite */}
            <div className={styles.rightSection}>
                <h1 className={styles.title}>Mes Évènements</h1>
                <div className={styles.container}>
                {likedEvents && likedEvents.length > 0 ? (
                    likedEvents.map((event) => (
                        <div
                            key={event.id}
                            className={styles.eventBox}
                            onClick={() => handleClick(event.id)}
                        >
                               <Image
                                src={event.image}
                                alt={event.title}
                                className={styles.eventImage}
                                width={100}
                                height={100}
                            />
                {/* {displayedEvents && displayedEvents.length > 0 ? (
                    displayedEvents.map((event) => (
                        <div key={event} className={styles.eventBox} onClick={() => handleClick(event)}>
                            <Image
                                src={event.image}
                                alt={event.title}
                                className={styles.eventImage}
                                width={100}
                                height={100}
                            /> */}
                            <div className={styles.eventDetails}>
                                <p className={styles.eventDate}>{event.startDate}</p>
                                <h3 className={styles.eventTitle}>{event.name}</h3>
                                <p className={styles.eventDescription}>{event.description}</p>
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