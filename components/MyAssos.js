import React, { useState } from 'react';
import styles from "../styles/MyAssos.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';


function MyAssos() {
    const router = useRouter();

    // Accéder aux assos favories depuis le store Redux
    const followingAssociations = useSelector((state) => state.users.value.followingAssociations);
    console.log("followed assoss===>" + followingAssociations)

    // Fonction pour rediriger à la page d'une asso
    const handleClick = (assoId) => {
        router.push(`/association/${assoId}`);
    };


    const associations = [
        {
            name: "Association A",
            image: "https://via.placeholdercom/150",
        },
        {
            name: "Association B",
            image: "https://via.placeholder.com/150",
        },
        {
            name: "Association C",
            image: "https://via.placeholder.com/150",
        },
        {
            name: "Association D",
            image: "https://via.placeholder.com/150",
        },
    ];

    return (

        <div className={styles.main}>
            
            <div className={styles.leftSection}>
                <Link href="/userProfil" className={styles.homeLink}>Retour à mon profil</Link>
                <Link href="/" className={styles.homeLink}>Retour à la page d'accueil</Link>
            </div>
            <div className={styles.rightSection}>
                <h1 className={styles.title}>Mes Associations</h1>
                <div className={styles.container}>

                    {followingAssociations && followingAssociations.length > 0 ? (
                        followingAssociations.map((associations) => (
                            <div
                                key={associations.id}
                                className={styles.assoBox}
                                onClick={() => handleClick(associations.id)}
                            >
                                <Image
                                    src='/asso.jpg'
                                    alt="image d'association"
                                    className={styles.myAssosImage}
                                    width={200}
                                    height={150}
                                />
                                {/* 
                    {associations.map((public_association, index) => (

                        <div key={index} className={styles.associationBox} onClick={() => handleClick(public_association)}>

                            <Image
                                src='/asso.jpg'
                                alt="image d'association"
                                className={styles.myAssosImage}
                                width={200}
                                height={150}
                            /> */}

                                <h3 className={styles.myAssosTitle}>Association Solidaire</h3>



                            </div>
               ))
            ) : (
                <p>Aucune association trouvée.</p> // Message par défaut si `likedEvents` est vide
            )}
        </div>
    </div>
</div>
);
}

export default MyAssos;