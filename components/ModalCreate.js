import { Modal, Button } from 'antd';
import { Calendar, DatePicker, Input, Select, Switch, Tabs, List, Avatar } from "antd/lib";
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
    address: {
      street: '',
      city: '',
      zipcode: '',
    },   
    categories: '',
  });
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState("");
  // console.log('champs remplis =>', assoInfo);
  // console.log('address.street =>', assoInfo.address.street)
  console.log('Categories', assoInfo.categories);

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.associations.value.modalCreateState);
  const user = useSelector((state) => state.users.value);

  // Réinitialisation des champs du formulaire
  const resetForm = () => {
    setAssoInfo({
      name: '',
      owner: '',
      description: '',
      siret: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        zipcode: '',
      },      
      categories: '',
    });
    setErrors([]);
  };

  const categoriesOptions = [
    { label: "Aide à la personne", value: "Aide à la personne" },
    { label: "Sport", value: "Sport" },
    { label: "Santé", value: "Santé" },
    { label: "Enfant", value: "Enfant" },
    { label: "Solidarité", value: "Solidarité" },
    { label: "Art & Culture", value: "Art & Culture" },
    { label: "Education", value: "Education" },
    { label: "Animaux", value: "Animaux" },
  ];
  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    const addressFields = ['street', 'city', 'zipcode'];
    // const [firstKey , secondKey] = 'zipcode'.split('.')

    // name : address.street
    if(addressFields.includes(name) ) {
      console.log(assoInfo['address']['zipcode'], "assoInfo['address']['zipcode']")
      console.log(assoInfo['address.zipcode'], "assoInfo['address.zipcode']")
      setAssoInfo((prevState) => ({ 
        ...prevState, 
        address: {
        ...prevState.address, 
        [name]: value
        }
      }));
      return 
    }
    console.log(assoInfo)

    setAssoInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCategoriesChange = (value) => { 
    setAssoInfo((prevState) => ({ ...prevState, categories: value.join(',') })); 
  };

  // Vérifie qu'il n'y a aucun champ manquant
  const validateForm = () => {
    const requiredFields = ['name', 'description', 'siret', 'email', 'phone'];
    const addressFields = ['street', 'city', 'zipcode'];
    let missingFields = [];
  
    requiredFields.forEach(field => {
      if (!assoInfo[field] || (typeof assoInfo[field] === 'string' && assoInfo[field].trim() === '')) {
        missingFields.push(field);
      }
    });
  
    addressFields.forEach(field => {
      if (!assoInfo.address[field] || (typeof assoInfo.address[field] === 'string' && assoInfo.address[field].trim() === '')) {
        missingFields.push(`address.${field}`);
      }
    });
  
    // Vérification spéciale pour le champ 'categories'
    if (assoInfo.categories.length === 0) {
      missingFields.push('categories');
    }
  
    console.log('MissingFields =>', missingFields);
    setErrors(missingFields);
    return missingFields.length === 0;
  };
  

  // Fermeture de la modal
  const handleCancel = () => {
    resetForm();
    dispatch(isModalCreateOpen(false));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log('Les champs obligatoires ne sont pas remplis');
      return;
    }
    const categoriesArray = assoInfo.categories.split(',');

    try {
      const response = await fetch('http://localhost:3000/associations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...assoInfo,
          categories: categoriesArray,
          adresse: {
            street: assoInfo.address.street,
            city: assoInfo.address.city,
            zipcode: assoInfo.address.zipcode,
          }, 
          owner: user.firstname,
        }),
      });
      console.log('Body =>', JSON.stringify({
        ...assoInfo,
        adresse: {
          street: assoInfo.address.street,
          city: assoInfo.address.city,
          zipcode: assoInfo.address.zipcode,
        }, 
        owner: user.firstname,
      }))
      // console.log('Payload envoyé :', JSON.stringify({
      //   ...assoInfo,
      //   adresse: {
      //     street: assoInfo.address.street,
      //     city: assoInfo.address.city,
      //     zipcode: assoInfo.address.zipcode,
      //   }, 
      //   owner: user.firstname,
      // }));
      console.log('Statut de la réponse :', response.status);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de la soumission.');
      }
      
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

  let formulaire = (
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
          {errors.includes('name') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
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
          {errors.includes('siret') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
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
          {errors.includes('email') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
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
          {errors.includes('phone') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
        </label>
        <label htmlFor="address.street">
          Adresse :
          <input
            type="text"
            id="address.street"
            name="street"
            value={assoInfo.address.street}
            onChange={handleChange}
          />
          {errors.includes('street') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
        </label>
        <label htmlFor="address.city">
          Ville :
          <input
            type="text"
            id="address.city"
            name="city"
            value={assoInfo.address.city}
            onChange={handleChange}
            required
          />
          {errors.includes('city') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
        </label>
        <label htmlFor="address.zipcode">
          Code postal :
          <input
            type="text"
            id="address.zipcode"
            name="zipcode"
            value={assoInfo.address.zipcode}
            onChange={handleChange}
            required
          />
          {errors.includes('zipcode') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
        </label>
        <label htmlFor="description">
          Description de l'association :
          <input
            type="textarea"
            id="description"
            name="description"
            value={assoInfo.description}
            onChange={handleChange}
            required
          />
          {errors.includes('description') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
        </label>
        <label htmlFor="categories">
          Secteurs d'activités :
          {/* <input
            type="text"
            id="categories"
            name="categories"
            value={assoInfo.categories.split(',')}
            onChange={handleChange}
            required
          /> */}
           <Select
              className={styles.filterbox}
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Categories"
              defaultValue={[]}
              options={categoriesOptions}
              onChange={handleCategoriesChange}
          />
          {errors.includes('categories') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
        </label>
        <Button type="submit" onClick={handleSubmit} className={styles.submitButton}>
          Je finalise la création de mon association
        </Button>
      </form>
  );
  return (
    <Modal
      title="Création de votre association"
      open={modal}
      onCancel={handleCancel}
      footer={null}
      className={styles.modal}
    >
      {formulaire}
    </Modal>
  );
}

export default ModalCreate;



// import { Modal, Button } from 'antd';
// import styles from '../styles/ModalCreate.module.css';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { isModalCreateOpen } from '../reducers/associations';

// function ModalCreate() {
//   const [assoInfo, setAssoInfo] = useState({
//     name: '',
//     owner: '',
//     description: '',
//     siret: '',
//     email: '',
//     phone: '',
//     street: '',
//     city: '',
//     zipcode: '',
//     categories: [],
//   });
//   const [errors, setErrors] = useState([]);
//   console.log('champ manquant =>', errors)

//   const dispatch = useDispatch();
//   const modal = useSelector((state) => state.associations.value.modalCreateState);
//   const user = useSelector((state) => state.users.value);

//   // Réinitialisation des champs du formulaire
//   const resetForm = () => {
//     setAssoInfo({
//       name: '',
//       owner: '',
//       description: '',
//       siret: '',
//       email: '',
//       phone: '',
//       street: '',
//       city: '',
//       zipcode: '',
//       categories: [],
//     });
//     setErrors([]);
//   };

//   // Gestion des changements dans les champs du formulaire
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAssoInfo((prevState) => ({ ...prevState, [name]: name === 'categories' ? value.split(',').map((cat) => cat.trim()) : value }));
//   };

//   // Vérifie qu'il n'y a aucun champ manquant
//   const validateForm = () => {
//     const requiredFields = ['name', 'description', 'siret', 'email', 'phone', 'street', 'city', 'zipcode', 'categories'];

//     const missingFields = requiredFields.filter((field) => {
//       const value = assoInfo[field];
//       if (Array.isArray(value)) {
//         return value.length === 0; // Vérifie si le tableau est vide
//       }
//       return !value?.trim(); // Vérifie si une chaîne est vide après trim
//     });

//     setErrors(missingFields); // Stocke les champs manquants dans l'état des erreurs
//     return missingFields.length === 0; // Retourne true si tous les champs requis sont remplis
//   };

//   // Fermeture de la modal
//   const handleCancel = () => {
//     resetForm();
//     dispatch(isModalCreateOpen(false));
//   };

//   // Soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       console.log('Les champs obligatoires ne sont pas remplis');
//       return;
//     }
     
//     try {
//       const response = await fetch('http://localhost:3000/associations/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...assoInfo, owner: 
//           user.firstname, 
//           categories: assoInfo.categories.length > 0 ? assoInfo.categories.join(',') : '',
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Une erreur est survenue lors de la soumission.');
//       }
//       console.log(response)
//       const data = await response.json();
//       if (data.result) {
//         console.log('Association créée avec succès :', data);
//         handleCancel(); // Ferme la modal et réinitialise
//       } else {
//         console.log('Erreur lors de la création de l\'association.');
//       }
//     } catch (error) {
//       console.error('Erreur :', error.message);
//     }
//   };

//   let formulaire = (
//     <form className={styles.form} onSubmit={handleSubmit}>
//         <label htmlFor="name">
//           Nom de l'association :
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={assoInfo.name}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('name') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="siret">
//           Siret :
//           <input
//             type="text"
//             id="siret"
//             name="siret"
//             value={assoInfo.siret}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('siret') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="email">
//           Email :
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={assoInfo.email}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('email') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="phone">
//           Téléphone :
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={assoInfo.phone}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('phone') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="street">
//           Adresse :
//           <input
//             type="text"
//             id="street"
//             name="street"
//             value={assoInfo.street}
//             onChange={handleChange}
//           />
//           {errors.includes('street') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="city">
//           Ville :
//           <input
//             type="text"
//             id="city"
//             name="city"
//             value={assoInfo.city}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('city') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="zipcode">
//           Code postal :
//           <input
//             type="text"
//             id="zipcode"
//             name="zipcode"
//             value={assoInfo.zipcode}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('zipcode') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="description">
//           Description de l'association:
//           <input
//             type="textarea"
//             id="description"
//             name="description"
//             value={assoInfo.description}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('description') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="categories">
//           Secteurs d'activités :
//           <input
//             type="text"
//             id="categories"
//             name="categories"
//             value={assoInfo.categories.join(', ')}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('categories') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <Button type="submit" onClick={handleSubmit} className={styles.submitButton}>
//           Je finalise la création de mon association
//         </Button>
//       </form>
//   );
//   return (
//     <Modal
//       title="Création de votre association"
//       open={modal}
//       onCancel={handleCancel}
//       footer={null}
//       className={styles.modal}
//     >
//       {formulaire}
//     </Modal>
//   );
// }

// export default ModalCreate;



// import { Modal, Button } from 'antd';
// import styles from '../styles/ModalCreate.module.css';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { isModalCreateOpen } from '../reducers/associations';

// function ModalCreate() {
//   const [assoInfo, setAssoInfo] = useState({
//     name: '',
//     owner: '',
//     description: '',
//     siret: '',
//     email: '',
//     phone: '',
//     street: '',
//     city: '',
//     zipcode: '',
//     categories: [],
//   });
//   const [errors, setErrors] = useState([]);
//   console.log('champ manquant =>', errors)

//   const dispatch = useDispatch();
//   const modal = useSelector((state) => state.associations.value.modalCreateState);
//   const user = useSelector((state) => state.users.value);

//   // Réinitialisation des champs du formulaire
//   const resetForm = () => {
//     setAssoInfo({
//       name: '',
//       owner: '',
//       description: '',
//       siret: '',
//       email: '',
//       phone: '',
//       street: '',
//       city: '',
//       zipcode: '',
//       categories: [],
//     });
//     setErrors([]);
//   };

//   // Gestion des changements dans les champs du formulaire
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAssoInfo((prevState) => ({ ...prevState, [name]: name === 'categories' ? value.split(',').map((cat) => cat.trim()) : value }));
//   };
//   //Verifie qu'il n'y a aucun champ manquant
//   const validateForm = () => {
//     const requiredFields = ['name', 'description', 'siret', 'email', 'phone', 'street', 'city', 'zipcode', 'categories'];

//     const missingFields = requiredFields.filter((field) => !assoInfo[field]?.trim());//on filtre le tableau dans la variable missing
//     setErrors(missingFields);//on stock le tableau dans l'etat
//     return missingFields.length === 0;//on vide le tableau missing
//   };

//   // Fermeture de la modal
//   const handleCancel = () => {
//     resetForm();
//     dispatch(isModalCreateOpen(false));
//   };

//   // Soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // if (!assoInfo.email || !assoInfo.name || !assoInfo.phone) {
//     //   console.log('Les champs obligatoires ne sont pas remplis.');
//     //   return;
//     // }
//     if (!validateForm()) {
//       console.log('Les champs obligatoires ne sont pas remplis');
//       return;
//     }
     
//     try {
//       const response = await fetch('http://localhost:3000/associations/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...assoInfo, owner: 
//           user.firstname, 
//           categories: assoInfo.categories.length > 0 ? assoInfo.categories.join(',') : '',
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Une erreur est survenue lors de la soumission.');
//       }
//       const data = await response.json();
//       if (data.result) {
//         console.log('Association créée avec succès :', data);
//         handleCancel(); // Ferme la modal et réinitialise
//         // dispatch(isModalCreateOpen(false));
//       } else {
//         console.log('Erreur lors de la création de l\'association.');
//       }
//     } catch (error) {
//       console.error('Erreur :', error.message);
//     }
//   };
//   let formulaire = (
//     <form className={styles.form} onSubmit={handleSubmit}>
//         <label htmlFor="name">
//           Nom de l'association :
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={assoInfo.name}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('name') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="siret">
//           Siret :
//           <input
//             type="text"
//             id="siret"
//             name="siret"
//             value={assoInfo.siret}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('siret') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="email">
//           Email :
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={assoInfo.email}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('email') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="phone">
//           Téléphone :
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={assoInfo.phone}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('phone') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="street">
//           Adresse :
//           <input
//             type="text"
//             id="street"
//             name="street"
//             value={assoInfo.street}
//             onChange={handleChange}
//           />
//           {errors.includes('street') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="city">
//           Ville :
//           <input
//             type="text"
//             id="city"
//             name="city"
//             value={assoInfo.city}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('city') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="zipcode">
//           Code postal :
//           <input
//             type="text"
//             id="zipcode"
//             name="zipcode"
//             value={assoInfo.zipcode}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('zipcode') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="description">
//           Description de l'assoction:
//           <input
//             type="textarea"
//             id="description"
//             name="description"
//             value={assoInfo.description}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('description') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <label htmlFor="categories">
//           Secteurs d'activités :
//           <input
//             type="text"
//             id="categories"
//             name="categories"
//             value={assoInfo.categories}
//             onChange={handleChange}
//             required
//           />
//           {errors.includes('categories') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
//         </label>
//         <Button type="submit" onClick={handleSubmit} className={styles.submitButton}>
//           Je finalise la création de mon association
//         </Button>
//       </form>
//   );
//   return (
//     <Modal
//       title="Création de votre association"
//       open={modal}
//       onCancel={handleCancel}
//       footer={null}
//       className={styles.modal}
//     >
//       {formulaire}
//     </Modal>
//   );
// }

// export default ModalCreate;
