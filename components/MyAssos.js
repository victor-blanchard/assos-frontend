import React, { useState } from 'react';
import styles from "../styles/MyAssos.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';


function MyAssos() {

    const associations = [
        {
            name: "Association A",
            image: "https://via.placeholder.com/150",
        },
        {
            name: "Association B",
            image: "https://via.placeholder.com/150",
        },
        {
            name: "Association C",
            image: "https://via.placeholder.com/150",
        },
    ];


    return (

        <div className={styles.main}>
            <div className={styles.leftSection}>
                <Link href="/" className={styles.homeLink}><FontAwesomeIcon icon={faArrowLeft} />Retour à la page d'accueil</Link>
            </div>
            <div className={styles.rightSection}>
                <h1 className={styles.title}>Mes Associations</h1>

                    {associations.map((asso, index) => (
                        
                        <div key={index} className={styles.associationBox}>
                                <Image
                                    src='/asso.jpg'
                                    alt="image d'association"
                                    className={styles.myAssosImage}
                                    width={200}
                                    height={150}
                                />
                                
                             <h3 className={styles.myAssosTitle}>Association Solidaire</h3>
                                
                            
                            <div className={styles.myAssosItem}></div>
                        </div>
                    ))}
                    </div>
            
            </div>
            );
            }




            export default MyAssos;