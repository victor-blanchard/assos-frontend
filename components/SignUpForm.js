import styles from "../styles/SignUpForm.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isModalVisible, isReset, setFormType } from "../reducers/users";
import { Button } from "antd";

function SignUpForm(props) {
  const [isAsso, setIsAsso] = useState(false); // Permet de vérifier si c'est une asso
  const [isUser, setIsUser] = useState(false); // Permet de vérifier si c'est un particulier
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  console.log("etat =>", user.modalState);
  console.log("c'est une association", isAsso);
  const [userInfo, setUserInfo] = useState({
    isAssociationOwner: isAsso,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    birthday: "",
    zipcode: "",
    // siret: ''
  });
  const [errors, setErrors] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const [connectionError, setConnectionerror] = useState(false);

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Réinitialise les champs
  const resetForm = () => {
    setIsAsso(false);
    setIsUser(false);
    setUserInfo({
      isAssociationOwner: isAsso,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      birthday: "",
      zipcode: "",
      // siret: ''
    });
    setErrors([]);
    dispatch(isReset(true));
  };
  // Utilisé pour réinitialiser le formulaire si la modal n'est pas visible
  // useEffect(() => {
  //     if (!isModalVisible) {
  //         resetForm();
  //     }
  // }, [isModalVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target; // destructuration, permet d'assigné une même valeur à plusieurs éléments
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;

    if (!EMAIL_REGEX.test(userInfo.email)) {
      setEmailError(true);
      isValid = false;
    }

    const requiredFields = isUser
      ? ["firstname", "lastname", "email", "password", "zipcode"]
      : ["firstname", "lastname", "email", "password", "zipcode" /*'siret'*/];

    const missingFields = requiredFields.filter(
      (field) => !userInfo[field].trim()
    );
    setErrors(missingFields);

    if (missingFields.length > 0) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (!validateForm()) {
      console.log("Les champs ne sont pas conforme");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      console.log(userInfo.isAssociationOwner);
      console.log("Données envoyées :", JSON.stringify(userInfo));
      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la soumission.");
      }

      const data = await response.json();
      if (data.result) {
        dispatch(isModalVisible(false));
        dispatch(setFormType(""));
        resetForm();
        console.log("data succès => ", data);
      } else {
        console.log("erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur :", error.message);
    }
    console.log("Données soumises :", userInfo);
    resetForm();
  };

  const handleAsso = () => {
    setIsAsso(true);
    setIsUser(false);
    setUserInfo((prevState) => ({ ...prevState, isAssociationOwner: true }));
    dispatch(isReset(false));
  };

  const handleUser = () => {
    setIsAsso(false);
    setIsUser(true);
    setUserInfo((prevState) => ({ ...prevState, isAssociationOwner: false }));
    dispatch(isReset(false));
  };

  let formulaire = (
    <div>
      <h3>Je suis :</h3>
      <Button className={styles.btnAssociation} onClick={() => handleAsso()}>
        Association
      </Button>
      <Button className={styles.btnParticulier} onClick={() => handleUser()}>
        Particulier
      </Button>
    </div>
  );

  function returnToFormulaire() {
    console.log("function called");
    setIsAsso(false);
    setIsUser(false);
  }

  if (isUser) {
    formulaire = (
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.titleH2}>Je m'inscris en tant que particulier</h2>
        <div className={styles.allSections}>
        <div className={styles.section}>
        <label htmlFor="firstname">
          Prénom :
          <input
            type="text"
            name="firstname"
            value={userInfo.firstname}
            onChange={handleChange}
          />
          {errors.includes("firstname") && (
            <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>
          )}
        </label>
        <label htmlFor="lastname">
          Nom :
          <input
            type="text"
            name="lastname"
            value={userInfo.lastname}
            onChange={handleChange}
          />
          {errors.includes("lastname") && (
            <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>
          )}
        </label>
        </div>
        <div className={styles.section}>
        <label htmlFor="email">
          Email :
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
          {errors.includes("email") && (
            <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>
          )}
        </label>
        {!connectionError && emailError && (
          <p className={styles.txtEmptyChamp}>
            Merci de renseigner une adresse email valide.
          </p>
        )}

        <label htmlFor="password">
          Mot de passe :
          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
          {errors.includes("password") && (
            <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>
          )}
        </label>
        </div>
        <div className={styles.section}>
        <label htmlFor="birthday">
          Date de naissance :
          <input
            type="date"
            name="birthday"
            value={userInfo.birthday}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="zipcode">
          Code postal :
          <input
            type="text"
            name="zipcode"
            value={userInfo.zipcode}
            onChange={handleChange}
          />
          {errors.includes("zipcode") && (
            <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>
          )}
        </label>
        </div></div>
        <div className={styles.buttons}>
    
        <Button className={styles.button} onClick={handleSubmit}>
          S'inscrire
        </Button>
        <Button className={styles.button} onClick={returnToFormulaire}>
          Retour
        </Button>
        </div>
      </form>
    );
  } else if (isAsso) {
    formulaire = (
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.titleH2}>
          Je m'inscris pour représenter mon association
        </h2>
        <div className={styles.allSections}>
          <div className={styles.section}>
            <label htmlFor="firstname">
              Prénom :
              <input
                type="text"
                name="firstname"
                value={userInfo.firstname}
                onChange={handleChange}
              />
              {errors.includes("firstname") && (
                <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>
              )}
            </label>
            <label htmlFor="lastname">
              Nom :
              <input
                type="text"
                name="lastname"
                value={userInfo.lastname}
                onChange={handleChange}
              />
              {errors.includes("lastname") && (
                <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>
              )}
            </label>
          </div>
          {/* <label>
                    SIRET :
                    <input type="text" name="siret" value={userInfo.siret} onChange={handleChange} />
                    {errors.includes('siret') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
                </label> */}
          <div className={styles.section}>
            <label htmlFor="email">
              Email :
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
              {errors.includes("email") && (
                <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>
              )}
            </label>
            <label htmlFor="password">
              Mot de passe :
              <input
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
              />
              {errors.includes("password") && (
                <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>
              )}
            </label>
          </div>
          <div className={styles.section}>
            <label htmlFor="birthday">
              Date de naissance :
              <input
                type="date"
                name="birthday"
                value={userInfo.birthday}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="zipcode">
              Code postal :
              <input
                type="text"
                name="zipcode"
                value={userInfo.zipcode}
                onChange={handleChange}
              />
              {errors.includes("zipcode") && (
                <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>
              )}
            </label>
          </div>
        </div>
        <div className={styles.buttons}>
          {/* <label>
                    J'accepte les conditions d'utilisation :
                    <input type="checkbox" name="acceptedTerms" checked={userInfo.acceptedTerms} onChange={handleChange} />
                </label> */}
          <Button className={styles.button} onClick={handleSubmit}>
            S'inscrire
          </Button>
          <Button className={styles.button} onClick={returnToFormulaire}>
            Retour
          </Button>
        </div>
      </form>
    );
  } else {
    return <div>{formulaire}</div>;
  }

  return <div>{formulaire}</div>;
}

export default SignUpForm;
