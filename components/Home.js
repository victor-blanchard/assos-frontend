import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const dataEvent = [
    {event: 'Aide à la personne'},
    {event: 'Sport'},
    {event: 'Santé'},
    {event: 'Solidarité'},
    {event: 'Culture'},
    {event: 'Education'},
    {event: 'Sport'}
  ]
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
            <button className={styles.btn}>Rejoindre La Sauce</button>
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
        <div className={styles.cicleEvent}>
        <FontAwesomeIcon icon={faFutbol}
          className={styles.eventIcon} />
        </div>
       </section>
      </main>
    </div>
  );
}

export default Home;
