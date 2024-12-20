import styles from "../styles/SignInForm.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isModalVisible, isReset, login, setFormType, addPhoto } from "../reducers/users";
import { Button } from "antd";
import { useRouter } from "next/router";

function SignInForm(props) {
  //Gestion des users
  const [isAsso, setIsAsso] = useState(false); // Permet de vérifier si c'est une asso
  const [isUser, setIsUser] = useState(false); // Permet de vérifier si c'est un particulier
  const [errors, setErrors] = useState([]);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [connectionError, setConnectionerror] = useState(false);
  console.log(userInfo.email);
  console.log(isAsso, "<=asso,user =>", isUser);

  //Gestion du store
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const photoProfil = useSelector((state) => state?.users?.value?.photosProfil?.photoUrl);

  const router = useRouter();

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Réinitialise les champs
  const resetForm = () => {
    setIsAsso(false);
    setIsUser(false);
    setUserInfo({
      email: "",
      password: "",
    });
    setErrors([]);
    // dispatch(isReset(true));
  };

  // Utilisé pour réinitialiser le formulaire si la modal n'est pas visible
  useEffect(() => {
    if (user.modalState) {
      resetForm();
    }
  }, [user.modalState]);

  const handleChange = (e) => {
    const { name, value } = e.target; // destructuration, permet d'assigné une même valeur à plusieurs éléments
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
    console.log(value);
  };

  const validateForm = () => {
    let isValid = true;

    if (!EMAIL_REGEX.test(userInfo.email)) {
      setEmailError(true);
      isValid = false;
    }

    const requiredFields = ["email", "password"];

    const missingFields = requiredFields.filter((field) => !userInfo[field]?.trim());
    setErrors(missingFields);

    if (missingFields.length > 0) {
      isValid = false;
    }

    if (connectionError) {
      isValid = false;
    }
    console.log("isvalid--->" + isValid);
    console.log(connectionError);
    return isValid;
  };

  const handleConnect = async (e) => {
    console.log("handle connect called");
    console.log("Validate Form -->" + validateForm());
    e.preventDefault();
    if (!validateForm()) {
      console.log("pas valid");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      console.log("Données envoyées :", JSON.stringify(userInfo));
      if (!response.ok) {
        throw new Error("Erreur reseau ou serveur.");
      }

      const data = await response.json();
      if (data.result) {
        dispatch(
          login({
            email: data.email,
            token: data.token,
            username: data.firstname,
            isAssociationOwner: data.isAssociationOwner,
            likedEvents: data.likedEvents,
            followingAssociations: data.followingAssociations,
            photoUrl: data.photoUrl,
            publicId: data.publicId,
          })
        );
        dispatch(setFormType(""));
        console.log("Connected data succès => ", data);
        resetForm();
        dispatch(isModalVisible(false));
      } else {
        console.error("Erreur de connexion : ", data.result);
        setConnectionerror(true);
      }
    } catch (error) {
      console.error("Erreur :", error.message);
    }

    console.log("Données soumises :", userInfo);
    // resetForm();
  };

  const handleAsso = () => {
    setIsAsso(true);
    setIsUser(false);
    // dispatch(isReset(false));
  };

  const handleUser = () => {
    setIsAsso(false);
    setIsUser(true);
    // dispatch(isReset(false));
  };

  let formulaire = (
    <div className={styles.form}>
      <h2 className={styles.titleH2}>J'ai dèjà un compte</h2>
      <label>
        Email :
        <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
        {errors.includes("password") && (
          <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>
        )}
      </label>

      {!connectionError && emailError && (
        <p className={styles.txtEmptyChamp}>Merci de renseigner une adresse email valide.</p>
      )}

      {connectionError && (
        <p className={styles.txtEmptyChamp}>
          Le nom d'utilisateur ou le mot de passe est incorrect.
        </p>
      )}

      <label>
        Mot de passe :
        <input type="password" name="password" value={userInfo.password} onChange={handleChange} />
        {errors.includes("password") && (
          <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>
        )}
      </label>
      <Button onClick={handleConnect}>Se connecter</Button>
    </div>
  );

  return <div>{formulaire}</div>;
}

export default SignInForm;
