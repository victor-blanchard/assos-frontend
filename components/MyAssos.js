import React from 'react';
import styles from "../styles/MyAssos.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';


function MyAssos() {
    const router = useRouter();

    // Accéder aux assos favories depuis le store Redux
    const followingAssociations = useSelector((state) => state.users.value.followingAssociations);
console.log(followingAssociations)
    // Fonction pour rediriger à la page d'une asso
    const handleClick = (assoId) => {
        router.push(`/association/${assoId}`);
    };


    const handleAssociationDisplay = (id) => {
        router.push(`/public_association?id=${id}`);
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
            {/* Section gauche */}
            <div className={styles.leftSection}>
                <Link href="/" className={styles.homeLink}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Retour à la page d'accueil
                </Link>
            </div>

            {/* Section droite */}
            <div className={styles.rightSection}>
                <h1 className={styles.title}>Mes Associations</h1>
                <div className={styles.container}>
                    {/* {followingAssociations && followingAssociations.length > 0 ? (
                        followingAssociations.map((associations) => (
                            <div
                                key={associations.id}
                                className={styles.assoBox}
                                onClick={() => handleClick(associations.id)}
                            
                            > */}

                    {followingAssociations && followingAssociations.length > 0 ? (
                        followingAssociations.map((association) => (
                            // <div
                            //     key={association._id || index} // Utilisez un ID unique
                            //     onClick={() => handleClick(association._id)}
                            //     className={styles.card}
                            // >
                                // <div
                                //     onClick={() => handleAssociationDisplay(data._id)}
                                //     id={data._id}
                                //     key={i}
                                //     className={styles.card}
                                // >
                                    <Image
                                        src={association.image || '/asso.jpg'} // Image par défaut si aucune image n'est fournie
                                        alt={`Image de ${association.name}`}
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

                                    <h3 className={styles.myAssosTitle}>{association.name}</h3>
                                </div>
                                ))
                                ) : (
                                <p>Aucune association trouvée.</p> // Message par défaut
                )}
                            </div>
        </div>
            </div>
            );
}
            export default MyAssos;