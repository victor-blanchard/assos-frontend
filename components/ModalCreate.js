import { Modal, Button } from 'antd';
import styles from '../styles/ModalCreate.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isModalCreateOpen } from '../reducers/associations';

function ModalCreate() {
  const [assoInfo, setAssoInfo] = useState({
    name: '',
    owner: '',
    description: '',
    siret: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zipcode: '',
    categories: '',
  });
  
  const modal = useSelector((state) => state.associations.value.modalCreateState);
  const dispatch = useDispatch();

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssoInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  // Réinitialisation du formulaire
  const resetForm = () => {
    setAssoInfo({
      name: '',
      owner: '',
      description: '',
      siret: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      zipcode: '',
      categories: '',
    });
  };

  // Fermeture de la modal
  const handleCancel = () => {
    resetForm();
    dispatch(isModalCreateOpen(false));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assoInfo.email || !assoInfo.name || !assoInfo.phone) {
      console.log('Les champs obligatoires ne sont pas remplis.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/associations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assoInfo),
      });

      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de la soumission.');
      }

      const data = await response.json();

      if (data.result) {
        console.log('Association créée avec succès :', data);
        handleCancel(); // Ferme la modal et réinitialise
      } else {
        console.log('Erreur lors de la création de l\'association.');
      }
    } catch (error) {
      console.error('Erreur :', error.message);
    }
  };

  return (
    <Modal
      title="Création de votre association"
      open={modal}
      onCancel={handleCancel}
      footer={null}
      className={styles.modal}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nom de l'association :
          <input
            type="text"
            id="name"
            name="name"
            value={assoInfo.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="siret">
          Siret :
          <input
            type="text"
            id="siret"
            name="siret"
            value={assoInfo.siret}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="email">
          Email :
          <input
            type="email"
            id="email"
            name="email"
            value={assoInfo.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="phone">
          Téléphone :
          <input
            type="tel"
            id="phone"
            name="phone"
            value={assoInfo.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="street">
          Adresse :
          <input
            type="text"
            id="street"
            name="street"
            value={assoInfo.street}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="city">
          Ville :
          <input
            type="text"
            id="city"
            name="city"
            value={assoInfo.city}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="zipcode">
          Code postal :
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={assoInfo.zipcode}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="categories">
          Secteurs d'activités :
          <input
            type="text"
            id="categories"
            name="categories"
            value={assoInfo.categories}
            onChange={handleChange}
            required
          />
        </label>
        <Button type="submit" className={styles.submitButton}>
          Je finalise la création de mon association
        </Button>
      </form>
    </Modal>
  );
}

export default ModalCreate;
