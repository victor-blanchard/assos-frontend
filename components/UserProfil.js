import styles from '../styles/UserProfil.module.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import AssociationCard from './AssociationCards';
import { useRouter } from "next/router";
import { Modal, Button, DatePicker } from 'antd';
import { Input, Form } from "antd/lib";
import React, { useState } from "react";

function UserProfil() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const associations = useSelector((state) => state.associations.value);
  const token = user.token;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [userData, setUserData] = useState({
    firstname: " ",
    lastname: " ",
    email: " ",
    password: " ",
    zipcode: " ",
    birthDate: "",
  });

  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue(userData);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        // console.log("Updated user data:", values);
        setUserData({ ...userData, ...values });
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const titleCards = [
    { title: 'Mes associations', description: 'Retrouvez toutes les associations qui vous interessent.', route: '/my_assos' },
    { title: 'Mes evenements à venir', description: 'Les evenements à venir de vos associations préferées au même endroit.', route: '/my_events' },
    // {title: 'Mes notifications', description: 'Vos événements programmés.', route:'/notification'}, 
    // {title: 'Mes notifications', description: 'Vos événements programmés.'},
  ];
  // console.log('User session =>', token);

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

  // const userProfil = (
  //     <div className={styles.leftContainer}>
  //         <div className={styles.userImgProfil}>
  //             <Image
  //                 src="/user_profil.jpg"
  //                 width={200}
  //                 height={200}
  //                 alt="asso"
  //                 className={styles.imgProfil}
  //             />
  //         </div>
  //         <div>
  //             <h2>Profil de {user.username}</h2>
  //             <p>Adresse mail: {user.email}</p>
  //             <div className={styles.memberInfo}>
  //               <p>Groupes</p>
  //               <p>Centres d'intérêt</p>
  //               <p>Inscriptions</p>
  //             </div>
  //         </div>
  //     </div>
  //     )

  const onChange = (date, dateString) => {
    setUserData({ ...userData, birthDate: dateString });
  }

  return (
    <main className={styles.mainContainer}>
  <section className={styles.section}>

    <div className={styles.leftSection}>
      <div className={styles.userImgProfil}>
        <Image
          src="/user_profil.jpg"
          width={200}
          height={200}
          alt="asso"
          className={styles.imgProfil}
        />
      </div>
      <div className={styles.memberInfo}>
        <h2>{user.firstname}</h2>
        <p>{user.email}</p>
        <Button type="primary" onClick={showModal}>
          Modifier mes informations
        </Button>
      </div>
    </div>


    <Modal
      title="Modifier mes informations"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Enregistrer"
      cancelText="Annuler"
    >
      <Form form={form} layout="vertical" initialValues={userData}>
        <Form.Item label="First Name" name="firstname" rules={[{ required: true, message: "Veuillez entrer votre prénom" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="lastname" rules={[{ required: true, message: "Veuillez entrer votre nom" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Veuillez entrer un email valide" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mot de passe" name="password" rules={[{ required: true, min: 6, message: "Le mot de passe doit contenir au moins 6 caractères" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Zipcode" name="zipcode" rules={[{ required: true, message: "Veuillez entrer votre code postal" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Date de naissance" name="birthDate" rules={[{ required: true, message: "Veuillez entrer votre date de naissance" }]}>
          <DatePicker onChange={onChange} format="YYYY-MM-DD" />
        </Form.Item>

      </Form>
    </Modal>

    <div className={styles.rightSection}>
      <h1>Espace personnel</h1>
      {cards.length > 0 ? (
        cards
      ) : (
        <p>Aucune donnée disponible pour le moment.</p>
      )}
    </div>
  </section>
</main>

  )
}

export default UserProfil;