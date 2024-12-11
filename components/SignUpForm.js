import styles from '../styles/SignUpForm.module.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isReset } from '../reducers/users';
import { Button } from 'antd';

function SignUpForm(props) {
    const [isAsso, setIsAsso] = useState(false); // Permet de vérifier si c'est une asso
    const [isUser, setIsUser] = useState(false); // Permet de vérifier si c'est un particulier
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.value);
    console.log('etat =>', user.formState);
    const [userInfo, setUserInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        birthday: '',
        zipcode: '',
        siret: ''
    });
    const [errors, setErrors] = useState([]);

    // Réinitialise les champs
    const resetForm = () => {
        setIsAsso(false);
        setIsUser(false);
        setUserInfo({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            birthday: '',
            zipcode: '',
            siret: ''
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
        setUserInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const requiredFields = isUser
            ? ['firstname', 'lastname', 'email', 'password', 'zipcode']
            : ['firstname', 'lastname', 'email', 'password', 'zipcode', 'siret'];

        const missingFields = requiredFields.filter((field) => !userInfo[field].trim());
        setErrors(missingFields);
        return missingFields.length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo)
            });
            console.log('Données envoyées :', JSON.stringify(userInfo));
            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de la soumission.');
            }

            const data = await response.json();
            if (data.result) {
                resetForm();
            }
            console.log('data succès => ', data);

        } catch (error) {
            console.error('Erreur :', error.message);
        }

        // props.onSignUp(userInfo);
        console.log('Données soumises :', userInfo);
        resetForm();
    };

    const handleAsso = () => {
        setIsAsso(true);
        setIsUser(false);
        dispatch(isReset(false));
    };

    const handleUser = () => {
        setIsAsso(false);
        setIsUser(true);
        dispatch(isReset(false));
    };

    let formulaire = (
        <div>
            <h2>Je suis :</h2>
            <Button className={styles.btnAssociation} onClick={handleAsso}>Association</Button>
            <Button className={styles.btnParticulier} onClick={handleUser}>Particulier</Button>
        </div>
    );

    if (isUser) {
        formulaire = (
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Prénom :
                    <input type="text" name="firstname" value={userInfo.firstname} onChange={handleChange} />
                    {errors.includes('firstname') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
                </label>
                <label>
                    Nom :
                    <input type="text" name="lastname" value={userInfo.lastname} onChange={handleChange} />
                    {errors.includes('lastname') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
                </label>
                <label>
                    Email :
                    <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
                    {errors.includes('email') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
                </label>
                <label>
                    Mot de passe :
                    <input type="password" name="password" value={userInfo.password} onChange={handleChange} />
                    {errors.includes('password') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
                </label>
                <label>
                    Date de naissance :
                    <input type='date' name='birthday' value={userInfo.birthday} onChange={handleChange}/>
                </label>
                <label>
                    Code postal :
                    <input type='text' name='zipcode' value={userInfo.zipcode} onChange={handleChange}/>
                    {errors.includes('zipcode') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
                </label>
                <label>
                    J'accepte les conditions d'utilisation :
                    <input type="checkbox" name="acceptedTerms" checked={true/*userInfo.acceptedTerms*/} /*onChange={handleChange}*/ />
                </label>
                <Button onClick={handleSubmit}>S'inscrire</Button>
            </form>
        );
    } else if (isAsso) {
        formulaire = (
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Prénom :
                    <input type="text" name="firstname" value={userInfo.firstname} onChange={handleChange} />
                    {errors.includes('firstname') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
                </label>
                <label>
                    Nom :
                    <input type="text" name="lastname" value={userInfo.lastname} onChange={handleChange} />
                    {errors.includes('lastname') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
                </label>
                <label>
                    SIRET :
                    <input type="text" name="siret" value={userInfo.siret} onChange={handleChange} />
                    {errors.includes('siret') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
                </label>
                <label>
                    Email :
                    <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
                    {errors.includes('email') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
                </label>
                <label>
                    Mot de passe :
                    <input type="password" name="password" value={userInfo.password} onChange={handleChange} />
                    {errors.includes('password') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
                </label>
                <label>
                    Date de naissance :
                    <input type='date' name='birthday' value={userInfo.birthday} onChange={handleChange}/>
                </label>
                <label>
                    Code postal :
                    <input type='text' name='zipcode' value={userInfo.zipcode} onChange={handleChange}/>
                    {errors.includes('zipcode') && <p className={styles.txtEmptyChamp}>Ce champ est obligatoire</p>}
                </label>
                <label>
                    J'accepte les conditions d'utilisation :
                    <input type="checkbox" name="acceptedTerms" checked={userInfo.acceptedTerms} onChange={handleChange} />
                </label>
                <Button onClick={handleSubmit}>S'inscrire</Button>
            </form>
        );
    }

    return (
        <div>
            {formulaire}
        </div>
    );
}

export default SignUpForm;
