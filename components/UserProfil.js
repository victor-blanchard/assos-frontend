import styles from "../styles/UserProfil.module.css";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import AssociationCard from "./AssociationCards";
import { useState } from "react";

function UserProfil() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const associations = useSelector((state) => state.associations.value);
  const token = user.token;
  const titleCards = [
    {
      title: "Mes associations",
      description: "Retrouvez toutes les associations qui vous interessent.",
    },
    {
      title: "Mes evenements à venir",
      description:
        "Les evenementd à venir de vos associations préferées au même endroit.",
    },
    { title: "Mes notifications", description: "Vos événements programmés." },
    // {title: 'Mes notifications', description: 'Vos événements programmés.'},
  ];
  console.log("User session =>", token);

  // Modal için state
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);

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
        <button onClick={() => setShowModal(true)}>Modifier Profil</button>{" "}
        {/* Button to open modal*/}
      </div>
    </div>
  );

  const cards = titleCards.map((data, i) => (
    <AssociationCard
      key={i}
      title={data.title}
      description={data.description || "Description non disponible."}
    />
  ));

  // Modal içeriği
  const modalContent = (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={() => setShowModal(false)}>
          &times;
        </span>{" "}
        {/* Button to close modal */}
        <h2>Modifier Profil</h2>
        <form>
          <div>
            {/* <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            /> */}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username">Nom d'utilisateur:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button type="submit">Enregistrer les modifications</button>
        </form>
      </div>
    </div>
  );

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
