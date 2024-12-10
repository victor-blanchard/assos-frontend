import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faHandshakeAngle, faHeartPulse, faChildren, faDog, faPalette, faUserGraduate } from "@fortawesome/free-solid-svg-icons";


function Home() {
  const [icon, setIcon] = useState(''); //Récupere le nom de l'evenement au clic sur l'icon;
  console.log('icon =>',icon);

  const dataEvent = [ 
    {event: 'Aide à la personne', icon: faHandshakeAngle},
    {event: 'Sport', icon: faFutbol},
    {event: 'Santé', icon: faHeartPulse},
    {event: 'Enfant', icon: faChildren},
    {event: 'Solidarité', icon: faDog},
    {event: 'Art & Culture', icon: faPalette},
    {event: 'Education', icon: faUserGraduate},
    {event: 'Animaux', icon: faDog}
  ];
  
  /**
   * Permet de récuperer via le setter d'etat setIcon les données du tableau dataEVent
   * @param {object} event : les donnée du tableau dataEVent
   */
  const handleIconEVent = (event) => {
    setIcon(event);
    console.log(event);
    // setIcon(event);
  }
  const iconEvent = dataEvent.map((data, i) => { //On map sur le tableau d'objet afin de recuperer les infos de manière dynamique
    // console.log(`Event : ${data.event}, Icon: ${data.icon}`)
    return <div className={styles.divEVent}>
        <div key={i} className={styles.cicleEvent}>
              <FontAwesomeIcon icon={data.icon}
                className={styles.eventIcon}
                onClick={()=> handleIconEVent(data.event)} />
          </div> 
          <p>{data.event}</p>
      </div>
          
  })

  return (
    <div>
      <main className={styles.main}>
       <section className={styles.mainCentral}>
          <div className={styles.mainText}>
            <h2>Découvrez La Sauce, votre plateforme pour trouver des activités près de chez vous </h2>
            <p>La Sauce met en relation les associations locales et les particuliers en quête d'activités enrichissantes. 
                Explorez une large gamme d'événements, ateliers, et sorties organisés par des associations proches de vous. 
                Que vous cherchiez à participer, apprendre, ou rencontrer, notre plateforme vous aide à trouver facilement 
                des activités adaptées à vos envies.</p>
            <button onClick={()=> console.log('click')} className={styles.btn}>Rejoindre La Sauce</button>
          </div>
          <div className={styles.divImg}>
            <Image src='/solidarité.jpeg'
              className={styles.imgAccueil}
              alt="image d'accueil"
              width={120}
              height={120}
            />
          </div>
       </section>
       <section className={styles.mainEventsCategory}>
        {iconEvent}
       </section>
      </main>
    </div>
  );
}

export default Home;
