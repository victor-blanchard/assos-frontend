import styles from '../styles/UserProfil.module.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import AssociationCard from './AssociationCards';


function UserProfil() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.value);
    const associations = useSelector((state) => state.associations.value);
    const token = user.token;
    const titleCards = [
        {title: 'Mes associations', description: 'Retrouvez toutes les associations qui vous interessent.'}, 
        {title: 'Mes evenements à venir', description: 'Les evenementd à venir de vos associations préferées au même endroit.'}, 
        {title: 'Mes notifications', description: 'Vos événements programmés.'}, 
        // {title: 'Mes notifications', description: 'Vos événements programmés.'},  
    ];
    console.log('User session =>', token);
    
    const userProfil = (
        <div>
            <div className={styles.userImgProfil}>
                <Image  
                    src="/user_profil.jpg"
                    width={200}
                    height={200}
                    alt="asso"
                    className={styles.imgProfil}
                />
            </div>
            <div>
                <h2>Profil de {user.username}</h2>
                <p>Adresse mail: {user.email}</p>
            </div>
        </div>
        )
    
    const cards = titleCards.map((data, i) => (
        <AssociationCard 
            key={i} 
            title={data.title} 
            description={data.description || 'Description non disponible.'} 
        />
    ));
  return (
     <main className={styles.mainContainer}>
      <h1>Espace personnel</h1>
      <section className={styles.section}>
      <div className={styles.sectionLeftSIde}>
        {userProfil}
      </div>
      <div className={styles.sectionRightSide}>
        
        {cards.length > 0 ? (
            cards 
        ) : (
        <p>Aucune donnée disponible pour le moment.</p>
        )}
        

      </div>
      </section>
     </main>
  );
}

export default UserProfil;
