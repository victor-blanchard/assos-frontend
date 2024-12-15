import styles from '../styles/UserProfil.module.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';


function UserProfil() {
    let association = [];
    for (let i = 0; i< 4; i++) {
        association.push(<article className={styles.assoCard}>
            <figure className={styles.assCardFigure}>
            <Image 
                src='/colaboration.webp'
                width={200}
                height={200}
                alt='asso'
                className={styles.assoCardImg}
                
            />
            </figure>
            <div className={styles.assoCardTxt}>
                <h4>Association name</h4>
                <p>Description</p>
            </div>
    
        </article>)
    }
  return (
     <main className={styles.mainContainer}>
      <h1>Esspace personnel</h1>
      <section className={styles.section}>
      <div className={styles.sectionLeftSIde}>

      </div>
      <div className={styles.sectionRightSide}>
        {/* <h2>Mes associtions</h2> */}
        {association}
      </div>
      </section>
     </main>
  );
}

export default UserProfil;
