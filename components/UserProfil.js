import styles from '../styles/UserProfil.module.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import AssociationCard from './AssociationCards';
import { useRouter } from "next/router";
import { Modal, Form, Input, DatePicker, Button } from "antd";
import React, { useState } from "react";


function UserProfil() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Données utilisateur initiales (exemple)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123, Main Street",
    birthDate: "1990-01-01",
    password: "",
  });

  // Ouvrir la modale
  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue(userData); // Pré-remplit les champs du formulaire
  };

  // Fermer la modale
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Soumettre les données mises à jour
  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        console.log("Updated user data:", values);
        setUserData({ ...userData, ...values });
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };




  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const associations = useSelector((state) => state.associations.value);
  const token = user.token;
  const titleCards = [
    { title: 'Mes associations', description: 'Retrouvez toutes les associations qui vous interessent.', route: '/my_assos' },
    { title: 'Mes evenements à venir', description: 'Les evenementd à venir de vos associations préferées au même endroit.', route: '/my_events' },
    { title: 'Mes notifications', description: 'Vos événements programmés.', route: '/notification' },
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


  return (
    <main className={styles.mainContainer}>
      <h1>Espace personnel</h1>
      <section className={styles.section}>
        <div className={styles.leftContainer}>
          <div className={styles.userImgProfil}>
            <Image
              src="/user_profil.jpg"
              width={200}
              height={200}
              alt="asso"
              className={styles.imgProfil}
            />
          </div>
        </div>

        {/* <div className={styles.sectionLeftSIde}>{userProfil}</div> */}

        <div className={styles.memberInfo}>
          <h2>Profil de {user.username}</h2>
          <p>Adresse mail: {user.email}</p>
          <Button type="primary" onClick={showModal}>
            Modifier mes informations
          </Button>
        </div>

        <Modal
          title="Modifier mes informations"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Enregistrer"
          cancelText="Annuler"
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={userData}
          >
            <Form.Item
              label="Nom"
              name="name"
              rules={[{ required: true, message: "Veuillez entrer votre nom" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Veuillez entrer votre email" },
                { type: "email", message: "Veuillez entrer un email valide" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Adresse"
              name="address"
              rules={[{ required: true, message: "Veuillez entrer votre adresse" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Date de naissance"
              name="birthDate"
              rules={[{ required: true, message: "Veuillez entrer votre date de naissance" }]}
            >
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Mot de passe"
              name="password"
              rules={[
                { required: true, message: "Veuillez entrer votre mot de passe" },
                { min: 6, message: "Le mot de passe doit contenir au moins 6 caractères" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>

        <div className={styles.sectionRightSide}>
          {cards.length > 0 ? (
            cards
          ) : (
            <p>Aucune donnée disponible pour le moment.</p>
          )}
        </div>
      </section>
      {/* {showModal && modalContent} Show modal */}
    </main>
  );
}

export default UserProfil;
