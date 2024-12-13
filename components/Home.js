import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isModalVisible } from '../reducers/users';
import { Modal, Button } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faHandshakeAngle, faHeartPulse, faChildren, faDog, faPalette, faUserGraduate } from "@fortawesome/free-solid-svg-icons";

import ModalForm from './ModalForm';
import ModalCreate from './ModalCreate';



function Home() {
  const [icon, setIcon] = useState(''); //Récupere le nom de l'evenement au clic sur l'icon;
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.users.value.formState);
  console.log(modal);
  
  //Tableau d'objets qui contient le nom d'un evenement associé à une icon
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

  //Ouvre la modal 
  const handleSign = () => {
    // setIsModalVisible(true)
    dispatch(isModalVisible(true));
    console.log('open', modal)
  }
  
  /**
   * Permet de récuperer via le setter d'etat setIcon les données du tableau dataEVent
   * @param {object} event : les donnée du tableau dataEVent
   */
  const handleIconEVent = (event) => {
    setIcon(event);
    console.log(event);
  };

  const iconEvent = dataEvent.map((data, i) => { //On map sur le tableau d'objet afin de recuperer les infos de manière dynamique
    return <div className={styles.divEVent}  key={i}>
        <div className={styles.cicleEvent}>
              <FontAwesomeIcon icon={data.icon}
                className={styles.eventIcon}
                onClick={()=> handleIconEVent(data.event)} />
          </div> 
          <p>{data.event}</p>
      </div>
          
  });

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
            <Button type='primary' onClick={handleSign} className={styles.btn}>Rejoindre La Sauce</Button>
          </div>
          <ModalForm />
          <ModalCreate />
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
