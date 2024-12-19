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
    const [errors, setErrors] = useState([]);
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });
    console.log(userInfo.email)
    console.log(isAsso,'<=asso,user =>',isUser)

    //Gestion du store
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.value);
    // console.log('etat modal =>', user.modalState);
    
    const router = useRouter();

   


    // Réinitialise les champs
    const resetForm = () => {
        setIsAsso(false);
        setIsUser(false);
        setUserInfo({
            email: '',
            password: '',
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
        console.log("requiredFIelds ++++++++++++++", requiredFields,'user', isUser, 'asso', isAsso)
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
                throw new Error('Erreur reseau ou serveur.');
            }
            

            const data = await response.json();
            if (data.result) {
                dispatch(login({email: data.email, token: data.token, username: data.firstname, isAssociationOwner: data.isAssociationOwner}));
                dispatch(isModalVisible(false));
                dispatch(setFormType(''));
                console.log('Connected data succès => ', data);
                resetForm();


            }else {
                console.error('Erreur de connexion : ', data.result);
            }
            

        } catch (error) {
            console.error('Erreur réseau :', error.message);
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
            <form className={styles.form} onSubmit={handleConnect}>
                <h2>J'ai déjà un compte</h2>
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

    return (
        <div>
            {formulaire}
        </div>
    );
}

export default SignInForm;
