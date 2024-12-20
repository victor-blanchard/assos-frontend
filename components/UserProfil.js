import styles from "../styles/UserProfil.module.css";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import AssociationCard from "./AssociationCards";
import { useRouter } from "next/router";
import { Modal, Button, DatePicker } from "antd";
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
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    zipcode: "",
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
    form
      .validateFields()
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
    {
      title: "Mes associations",
      description: "Retrouvez toutes les associations qui vous interessent.",
      route: "/my_assos",
    },
    {
      title: "Mes evenements",
      description: "Les evenements à venir de vos associations préferées au même endroit.",
      route: "/my_events",
    },
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
      description={data.description || "Description non disponible."}
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
  };

  const formatDateTime = (date) => {
    if (!date) return "Non défini";
    try {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(date));
    } catch {
      return "Date invalide";
    }
  };

  const formattedBirthday = formatDateTime(user.birthday);
  return (
    <main className={styles.mainContainer}>
      <section className={styles.section}>
        <div className={styles.leftSection}>
          <h1>Espace personnel</h1>
          <div className={styles.userImgProfil}>
            <Image
              src="/user_profil.jpg"
              width={200}
              height={200}
              alt="photo de profil"
              className={styles.imgProfil}
            />
          </div>
          <div className={styles.memberInfo}>
            <h2>{user?.username}</h2>
            <div className={styles.eventSlot}>
              <p className={styles.eventLabel}>Email </p>
              <p className={styles.eventData}>{user.email}</p>
            </div>
            <div className={styles.eventSlot}>
              <p className={styles.eventLabel}>Code postal </p>
              <p className={styles.eventData}>{user.zipcode}</p>
            </div>
            <div className={styles.eventSlot}>
              <p className={styles.eventLabel}>Date de naissance</p>
              <p className={styles.eventData}>{formattedBirthday}</p>
            </div>
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
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[{ required: false, message: "Veuillez entrer votre prénom" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[{ required: false, message: "Veuillez entrer votre nom" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: false, type: "email", message: "Veuillez entrer un email valide" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mot de passe"
              name="password"
              rules={[
                {
                  required: false,
                  min: 6,
                  message: "Le mot de passe doit contenir au moins 6 caractères",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Zipcode"
              name="zipcode"
              rules={[{ required: false, message: "Veuillez entrer votre code postal" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Date de naissance"
              name="birthDate"
              rules={[{ required: false, message: "Veuillez entrer votre date de naissance" }]}
            >
              <DatePicker onChange={onChange} format="YYYY-MM-DD" />
            </Form.Item>
          </Form>
        </Modal>

        <div className={styles.rightSection}>
          {cards.length > 0 ? cards : <p>Aucune donnée disponible pour le moment.</p>}
        </div>
      </section>
    </main>
  );
}

export default UserProfil;
