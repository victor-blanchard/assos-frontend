import styles from '../styles/Home.module.css';
import Image from 'next/image';

function Home() {
  return (
    <div>
      <main className={styles.main}>
       <section className={styles.mainCentral}>
          <div>
            <h2>Découvrez La Sauce, votre plateforme pour trouver des activités près de chez vous </h2>
            <p>La Sauce met en relation les associations locales et les particuliers en quête d'activités enrichissantes. 
                Explorez une large gamme d'événements, ateliers, et sorties organisés par des associations proches de vous. 
                Que vous cherchiez à participer, apprendre, ou rencontrer, notre plateforme vous aide à trouver facilement 
                des activités adaptées à vos envies.</p>
          </div>
       </section>
       <section className={styles.mainEventsCategory}>
        <Image src=''
          alt="image d'accueil"
          width={120}
          height={120}
        />
       </section>
      </main>
    </div>
  );
}

export default Home;
