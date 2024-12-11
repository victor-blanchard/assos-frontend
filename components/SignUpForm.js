import styles from '../styles/SignUpForm.module.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isReset } from '../reducers/users';


// import Password from 'antd/es/input/Password';
// const { useState } = React;
import { 
  Button,
} from 'antd';

function SignUpForm(props) {
    const [isAsso, setIsAsso] = useState(false);// Permet de vérifier si c'est une asso
    const [isUser, setIsUSer] = useState(false);// Permet de vérifier si c'est un particulier
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.value)
    console.log('etat =>',user.formState)
    const [userInfo, setUserInfo] = useState({
        name: '',
        firstName: '',
        email: '',
        password: '',
        birthday: '',
        zipcode: '',
        acceptedTerms: false,
        siret: ''
      });

      //Réinitialise les valeurs
      const resetForm = () => {
        setIsAsso(false);
        setIsUSer(false);
        setUserInfo({
          name: '',
          firstName: '',
          email: '',
          password: '',
          birthday: '',
          zipcode: '',
          acceptedTerms: false,
          siret: ''
        });
        dispatch(isReset(true));
      };
      
      useEffect(() => {
        if (!props.isModalVisible) {
          resetForm();
        }
      }, [props.isModalVisible]);

      console.log('reset', props.isModalVisible)
    

    
    const handleChange = (e) => {
       const { name, value } = e.target;
       setUserInfo(prevState => ({ ...prevState, [name]: value }));
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const data
        
        try {
            const response = await fetch('http://localhost:3000/users/signup', {
                methode: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({userInfo})
            });

            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de la soumission.');
              };

              const data = await response.json();
              console.log('data succès => ', data)
            
          } catch (error) {

          }

        // props.onSignUp(userInfo);
        console.log(userInfo)

    }

    const handleAsso = () => {
        setIsAsso(true);
        setIsUSer(false);
        dispatch(isReset(false));
    }
    
    const handleUser = () => {
        setIsAsso(false);
        setIsUSer(true);
        dispatch(isReset(false));
    };

    let formulaire = (<div>
        <h2>Je suis :</h2>
        <Button onClick={handleAsso}>Association</Button>
        <Button onClick={handleUser}>Particulier</Button>
      </div>);

    // if (user.formState) {
    //  formulaire
    // } else 
    if (isUser ) {
     formulaire = <form className={styles.form} onSubmit={handleSubmit}>
     <label>
          Prenom :
         <input type="text" name="firstName" value={userInfo.firstName} onChange={handleChange} />
     </label>
     <label>
         Nom :
         <input type="text" name="name" value={userInfo.name} onChange={handleChange} />
     </label>
     <label>
         Email :
         <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
     </label>
     <label>
         Mot de passe :
         <input type="password" name="password" value={userInfo.password} onChange={handleChange} />
     </label>
     <label>
         Date de naissance :
         <input type='date' name='birthday' value={userInfo.birthday} onChange={handleChange}/>
     </label>
     <label>
         Code postal :
         <input type='text' name='zipcode' value={userInfo.zipcode} onChange={handleChange}/>
     </label>
     <label>
         J'accepte les conditions d'utilisation :
         <input type="checkbox" name="acceptedTerms" checked={userInfo.acceptedTerms} onChange={handleChange} />
     </label>
     <Button onClick={handleSubmit} >S'inscrire</Button>
   </form>
    } else if (isAsso) {
     
        formulaire = 
        <form>
        <label>
             Prenom :
            <input type="text" name="firstName" value={userInfo.firstName} onChange={handleChange} />
        </label>
        <label>
            Nom :
            <input type="text" name="name" value={userInfo.name} onChange={handleChange} />
        </label>
        <label>
            SIRET :
            <input type="text" name="siret" value={userInfo.siret} onChange={handleChange} />
        </label>
        <label>
            Email :
            <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
        </label>
        <label>
            Mot de passe :
            <input type="password" name="password" value={userInfo.password} onChange={handleChange} />
        </label>
        <label>
            Date de naissance :
            <input type='date' name='birthday' value={userInfo.birthday} onChange={handleChange}/>
        </label>
        <label>
            Code postal :
            <input type='text' name='zipcode' value={userInfo.zipcode} onChange={handleChange}/>
        </label>
        <label>
            J'accepte les conditions d'utilisation :
            <input type="checkbox" name="acceptedTerms" checked={userInfo.acceptedTerms} onChange={handleChange} />
        </label>
        <Button type='submit'>S'inscrire</Button>
      </form>
    }
    

  return (
    <div>
        {formulaire}

    </div>
  );
}

export default SignUpForm;
