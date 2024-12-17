import styles from '../styles/UserProfil.module.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import AssociationCard from './AssociationCards';
import Link from "next/link";
import { useRouter } from "next/router";


function UserProfil() {
  const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.value);
    const associations = useSelector((state) => state.associations.value);
    const token = user.token;
    const titleCards = [
        {title: 'Mes associations', description: 'Retrouvez toutes les associations qui vous interessent.', route: '/my_assos'}, 
        {title: 'Mes evenements à venir', description: 'Les evenementd à venir de vos associations préferées au même endroit.', route:'/my_events'}, 
        {title: 'Mes notifications', description: 'Vos événements programmés.', route:'/notification'}, 
        // {title: 'Mes notifications', description: 'Vos événements programmés.'},  
    ];
    console.log('User session =>', token);

    const handleCardClick = (route) => {
      // console.log('click', link);
      if (route) {
          router.push(route); // Redirection vers l'URL spécifiée
      }
      
  };

const cards = titleCards.map((data, i) => (
  <AssociationCard 
        key={i} 
        title={data.title} 
        description={data.description || 'Description non disponible.'} 
        onClick={() => handleCardClick(data.route)} // Passez le lien à la fonction onClick
        
    />
  

    
));

    
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

        
  return (
    <main className={styles.mainContainer}>
      <h1>Espace personnel</h1>
      <section className={styles.section}>
        <div className={styles.sectionLeftSIde}>{userProfil}</div>
        <div className={styles.sectionRightSide}>
          {cards.length > 0 ? (
            cards
          ) : (
            <p>Aucune donnée disponible pour le moment.</p>
          )}
        </div>
      </section>
      {showModal && modalContent} {/* Show modal */}
    </main>
  );
}

export default UserProfil;
