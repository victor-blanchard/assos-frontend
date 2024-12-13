import styles from '../styles/SignInForm.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isModalVisible, isReset, login, setFormType } from '../reducers/users';
import { Button } from 'antd';
import { useRouter } from 'next/router';

function SignInForm(props) {
    //Gestion des users
    const [isAsso, setIsAsso] = useState(false); // Permet de vérifier si c'est une asso
    const [isUser, setIsUser] = useState(false); // Permet de vérifier si c'est un particulier
    //Gestion du store
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.value);
    // console.log('etat modal =>', user.modalState);

    const router = useRouter();

    //Gestion formulaire
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState([]);

    // Réinitialise les champs
    const resetForm = () => {
        setIsAsso(false);
        setIsUser(false);
        setUserInfo({
            // firstname: '',
            // lastname: '',
            email: '',
            password: '',
            // birthday: '',
            // zipcode: '',
            // siret: ''
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
        setUserInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const requiredFields = (isUser || isAsso) && ['email', 'password'];

        if (!requiredFields) {
            console.log('Champ pas correct');
            setErrors([]);
            return true;
        }
        const missingFields = requiredFields.filter((field) => !userInfo[field]?.trim());
        setErrors(missingFields);
        return missingFields.length === 0;
    };
    const handleConnect = async (e) => {
        e.preventDefault();
        if (!validateForm()) {

            return;
        } 

        try {
            const response = await fetch('http://localhost:3000/users/signin', {
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
                dispatch(login({email: data.email, token: data.token, username: data.firstname, isAssociationOwner: data.isAssociationOwner}));
                dispatch(isModalVisible(false));
                dispatch(setFormType(''));
                console.log('data succès => ', data);
                resetForm();


            }else {
                console.error('Erreur de connexion : ', data.result);
            }
            

        } catch (error) {
            console.error('Erreur :', error.message);
        }

        console.log('Données soumises :', userInfo);
        resetForm();
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
        <div>
            <h2>Je suis :</h2>
            <Button className={styles.btnAssociation} onClick={handleAsso}>Association</Button>
            <Button className={styles.btnParticulier} onClick={handleUser}>Particulier</Button>
        </div>
    );

    if (isUser) {
        formulaire = (
            <form className={styles.form} onSubmit={handleConnect}>
                <h2>Particulier</h2>
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
                <Button onClick={handleConnect}>Se connecter</Button>
            </form>
        );
    } else if (isAsso) {
        formulaire = (
            
            <form className={styles.form} onSubmit={handleConnect}>
                <h2>Association</h2>
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
                <Button onClick={handleConnect}>Se connecter</Button>
            </form>
        );
    }

    return (
        <div>
            {formulaire}
        </div>
    );
}

export default SignInForm;
