import styles from "../styles/UserProfil.module.css";
import Image from "next/image";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import AssociationCard from "./AssociationCards";
import { useRouter } from "next/router";
import { Modal, Button, DatePicker } from "antd";
import { Input, Form } from "antd/lib";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { addPhoto } from "../reducers/users";

function UserProfil() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const token = user.token;

  const photoProfilUrl = useSelector((state) => state.users.value.photoProfil.photoUrl);
  const associations = useSelector((state) => state.associations.value);
  const fileInputRef = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

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

<<<<<<< HEAD
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
=======
>>>>>>> 96a1a0280866d8c7ea7b1bc22f2f2e63cc2d5d21

  const handlePhotoChangeAndSend = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("Aucun fichier selectionné.");
      return;
    }

    // Mise à jour de l'aperçu
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
      // dispatch(addPhoto(reader.result)); // Mise à jour locale avant l'envoi
    };
    if (file) {
      reader.readAsDataURL(file);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("token", token);
    console.log("file", file);

    try {
      const response = await fetch(`http://localhost:3000/users/upload/`, {
        method: "POST",
        body: formData,
      });
      console.log("1");
      if (!response.ok) {
        console.error("Erreur lors de l'envoi du fichier");
        alert("Erreur lors de l'envoi du fichier. Veuillez réessayer.");
        return;
      }

      console.log("2");

      const data = await response.json();
      console.log("3 data", data);
      // Vérification si les données renvoyées sont valides
      if (data.result && data.photoUrl && data.publicId) {
        dispatch(addPhoto({ photoUrl: data.photoUrl, publicId: data.publicId }));
        console.log("Photo envoyée avec succès :", data);
      } else {
        console.error("Réponse invalide lors de l'upload.");
        alert("Erreur lors de l'upload. Veuillez réessayer.");
      }
<<<<<<< HEAD
    } catch (error) {
      console.error("Erreur lors de l'envoi de la photo :", error.message);
      alert("Erreur serveur. Veuillez réessayer.");
    }
  };
=======
    
      const formData = new FormData();
      formData.append('file', file);
      formData.append('token', token);
      console.log('file',file)
    
      try {
        const response = await fetch(`http://localhost:3000/users/upload/`, {
          method: 'POST',
          body: formData,
        });
        console.log('1')
        if (!response.ok) {
          console.error('Erreur lors de l\'envoi du fichier');
          alert('Erreur lors de l\'envoi du fichier. Veuillez réessayer.');
          return;
        };
  
        console.log('2')
    
        const data = await response.json();
        console.log('3 data', data)
        // Vérification si les données renvoyées sont valides
        if (data.result && data.photoUrl && data.publicId) {
          dispatch(addPhoto({ photoUrl: data.photoUrl, publicId: data.publicId }));
          console.log('Photo envoyée avec succès :', data);
        } else {
          console.error('Réponse invalide lors de l\'upload.');
          alert('Erreur lors de l\'upload. Veuillez réessayer.', data.message);
        }
    
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la photo :', error.message);
        alert('Erreur serveur. Veuillez réessayer.');
      }
    };
>>>>>>> 96a1a0280866d8c7ea7b1bc22f2f2e63cc2d5d21

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Simule un clic sur l'input
    }
    console.log("click icon edit");
  };

  const onChange = (date, dateString) => {
    setUserData({ ...userData, birthDate: dateString });
<<<<<<< HEAD
  };
=======
  }
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
>>>>>>> 96a1a0280866d8c7ea7b1bc22f2f2e63cc2d5d21

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
<<<<<<< HEAD
      <section className={styles.section}>
        <div className={styles.leftSection}>
          <div className={styles.photoProfil}>
            {photoProfilUrl ? (
              <>
                <Image
                  src={photoProfilUrl}
                  width={100}
                  height={100}
                  alt="Photo Preview"
                  className={styles.imgProfil}
                />
              </>
            ) : (
              <>
                <Image
                  src="/user_profil.jpg"
                  width={100}
                  height={100}
                  alt="Photo Preview"
                  className={styles.imgProfil}
                />
                <button onClick={handleIconClick} className={styles.btn}>
                  Ajouter une photo
                </button>
              </>
            )}{" "}
            <input
              type="file"
              title="modifier l'image"
              ref={fileInputRef}
              style={{ display: "none" }}
              id="photo"
              onChange={handlePhotoChangeAndSend}
            />
          </div>
          <FontAwesomeIcon
            onClick={handleIconClick}
            icon={faPenToSquare}
            className={styles.iconEdit}
          />
          <div className={styles.memberInfo}>
            <h2>{user.username}</h2>
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
=======
    <section className={styles.section}>
      <div className={styles.leftSection}>
        <h1>Espace personnel</h1>
        <div className={styles.userImgProfil}>
          {photoProfilUrl ? (
            <>
              <Image
                src={photoProfilUrl}
                width={100}
                height={100}
                alt="Photo Preview"
                className={styles.imgProfil}
              />
              <FontAwesomeIcon onClick={handleIconClick} icon={faPenToSquare} className={styles.iconEdit} />             
              </>   
          ) : (
            <>
              <Image
                src="/user_profil.jpg"
                width={200}
                height={200}
                alt="photo de profil"
                className={styles.imgProfil}
              />
              <FontAwesomeIcon onClick={handleIconClick} icon={faPenToSquare} className={styles.iconEdit} />             

            </>
          )} <input type="file"  ref={fileInputRef} style={{display: 'none'}} id="photo" onChange={handlePhotoChangeAndSend } />
          
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
        open={isModalVisible}
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

  )
>>>>>>> 96a1a0280866d8c7ea7b1bc22f2f2e63cc2d5d21
}

export default UserProfil;
