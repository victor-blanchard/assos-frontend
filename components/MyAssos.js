// import React from 'react';
// import styles from "../styles/MyAssos.module.css";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import Image from 'next/image';
// import { useRouter } from "next/router";
// import { useSelector } from 'react-redux';


// function MyAssos() {
//     const router = useRouter();

//     // Accéder aux assos favories depuis le store Redux
//     const followingAssociations = useSelector((state) => state.users.value.followingAssociations);

//     // Fonction pour rediriger à la page d'une asso
//     const handleClick = (assoId) => {
//         router.push(`/association/${assoId}`);
//     };


//     const handleAssociationDisplay = (id) => {
//         router.push(`/public_association?id=${id}`);
//     };

//     const associations = [
//         {
//             name: "Association A",
//             image: "https://via.placeholdercom/150",
//         },
//         {
//             name: "Association B",
//             image: "https://via.placeholder.com/150",
//         },
//         {
//             name: "Association C",
//             image: "https://via.placeholder.com/150",
//         },
//         {
//             name: "Association D",
//             image: "https://via.placeholder.com/150",
//         },
//     ];



//     return (
//         <div className={styles.main}>
//             {/* Section gauche */}
//             <div className={styles.leftSection}>
//                 <Link href="/" className={styles.homeLink}>
//                     <FontAwesomeIcon icon={faArrowLeft} /> Retour à la page d'accueil
//                 </Link>
//             </div>

//             {/* Section droite */}
//             <div className={styles.rightSection}>
//                 <h1 className={styles.title}>Mes Associations</h1>
//                 <div className={styles.container}>
//                     {/* {followingAssociations && followingAssociations.length > 0 ? (
//                         followingAssociations.map((associations) => (
//                             <div
//                                 key={associations.id}
//                                 className={styles.assoBox}
//                                 onClick={() => handleClick(associations.id)}
                            
//                             > */}

//                     {followingAssociations && followingAssociations.length > 0 ? (
//                         followingAssociations.map((association) => (
//                             // <div
//                             //     key={association._id || index} // Utilisez un ID unique
//                             //     onClick={() => handleClick(association._id)}
//                             //     className={styles.card}
//                             // >
//                                 // <div
//                                 //     onClick={() => handleAssociationDisplay(data._id)}
//                                 //     id={data._id}
//                                 //     key={i}
//                                 //     className={styles.card}
//                                 // >
//                                     <Image
//                                         src={association.image || '/asso.jpg'} // Image par défaut si aucune image n'est fournie
//                                         alt={`Image de ${association.name}`}
//                                         className={styles.myAssosImage}
//                                         width={200}
//                                         height={150}
//                                     />

//                                     {/* 
//                     {associations.map((public_association, index) => (

//                         <div key={index} className={styles.associationBox} onClick={() => handleClick(public_association)}>

//                             <Image
//                                 src='/asso.jpg'
//                                 alt="image d'association"
//                                 className={styles.myAssosImage}
//                                 width={200}
//                                 height={150}
//                             /> */}

//                                     <h3 className={styles.myAssosTitle}>{association.name}</h3>
//                                 </div>
//                                 ))
//                                 ) : (
//                                 <p>Aucune association trouvée.</p> // Message par défaut
//                 )}
//                             </div>
//         </div>
//             </div>
//             );
// }
//             export default MyAssos;


import React, { useState, useEffect } from 'react';
import styles from "../styles/MyAssos.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import { useRouter } from "next/router";

function MyAssos() {
    const router = useRouter();


    const [associations, setAssociations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Remplacez par le token utilisateur réel
    const token = user.token;

    // Fonction pour récupérer les associations suivies
    useEffect(() => {
        const fetchAssociations = async () => {
            try {
                const response = await fetch(`/followingAssociations/${userToken}`);
                const data = await response.json();
                if (data.result) {
                    setAssociations(data.followingAssociations);
                } else {
                    setError(data.error || "Erreur lors du chargement des associations.");
                }
            } catch (err) {
                setError("Erreur serveur, veuillez réessayer plus tard.");
            } finally {
                setLoading(false);
            }
        };

        fetchAssociations();
    }, [userToken]);

    // Fonction pour rediriger vers une page d'association
    const handleClick = (associationName) => {
        router.push(`/public_association?name=${associationName}`);
    };

    if (loading) {
        return <p>Chargement en cours...</p>;
    }

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }


// const associations = [
//     {
//         name: "Association A",
//         image: "https://via.placeholder.com/150",
//     },
//     {
//         name: "Association B",
//         image: "https://via.placeholder.com/150",
//     },
//     {
//         name: "Association C",
//         image: "https://via.placeholder.com/150",
//     },
// ];

// Fonction pour rediriger à la page de l'association
// const handleClick = (link) => {
//     router.push('/public_association');
// };

return (

    <div className={styles.main}>
        <div className={styles.leftSection}>
            <Link href="/" className={styles.homeLink}><FontAwesomeIcon icon={faArrowLeft} />Retour à la page d'accueil</Link>
        </div>
        <div className={styles.rightSection}>
            <h1 className={styles.title}>Mes Associations</h1>
            <div className={styles.container}>

                {associations.map((associations, index) => (

                    <div key={index} className={styles.associationBox} onClick={() => handleClick(associations.name)}>

                        <Image
                            src='/asso.jpg'
                            alt="image d'association"
                            className={styles.myAssosImage}
                            width={200}
                            height={150}
                        />

                        <h3 className={styles.myAssosTitle}>{associations.name}</h3>

                        



                    </div>
                ))}
            </div>
        </div>
    </div>
);

}

export default MyAssos;