import styles from '../styles/SignUpForm.module.css';
import React from 'react';
import { useState } from 'react';
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
    // const [name, setName] = useState('');
    // const [firstName, setfirstName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [birthday, setBirthday] = useState('');
    // const [zipcode, setZipcode] = useState('');
    // const [acceptedTerms, setAcceptedTerms] = useState(false);
    // const [siret, setSiret] = useState('');
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

      console.log('reset', !props.onReset)
    

    
    const handleChange = (e) => {
       const { name, value } = e.target;
       setUserInfo(prevState => ({ ...prevState, [name]: value }));
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //fetch api back
        props.onSignup(userInfo);

    }

        const handleAsso = () => {
            setIsAsso(userInfo);
            setIsUSer(false);
        }
        const handleUser = () => {
            setIsAsso(false);
            setIsUSer(true);
        }
    let formulaire;

    if (user.formState) {
     formulaire = (<div>
              <h2>Je suis :</h2>
              <Button onClick={handleAsso}>Association</Button>
              <Button onClick={handleUser}>Particulier</Button>
            </div>)
    } else if (!isAsso && isUser) {
     formulaire = <form onSubmit={handleSubmit}>
     <label>
          Prenom :
         <input type="text" name="firstName" value={userInfo.name} onChange={(e) => setUserInfo.name(e.target.value)} />
     </label>
     <label>
         Nom :
         <input type="text" name="name" value={userInfo.firstName} onChange={(e) => setUserInfo.firstName(e.target.value)} />
     </label>
     <label>
         Email :
         <input type="email" name="email" value={userInfo.email} onChange={(e) => setUserInfo.email(e.target.value)} />
     </label>
     <label>
         Mot de passe :
         <input type="password" name="password" value={userInfo.password} onChange={(e) => setUserInfo.password(e.target.value)} />
     </label>
     <label>
         Date de naissance :
         <input type='date' name='birthday' value={userInfo.birthday} onChange={(e) => setUserInfo.birthday(e.target.value)}/>
     </label>
     <label>
         Code postal :
         <input type='text' name='zipcode' value={userInfo.zipcode} onChange={(e) => setUserInfo.zipcode(e.target.value)}/>
     </label>
     <label>
         J'accepte les conditions d'utilisation :
         <input type="checkbox" name="acceptedTerms" checked={userInfo.acceptedTerms} onChange={(e) => setUserInfo.acceptedTerms(e.target.checked)} />
     </label>
     <Button type='submit'>S'inscrire</Button>
   </form>
    } else if (isAsso && !isUser) {
     
        formulaire = 
        <form>
        <label>
             Prenom :
            <input type="text" name="firstName" value={userInfo.firstName} onChange={(e) => setUserInfo.firstName(e.target.value)} />
        </label>
        <label>
            Nom :
            <input type="text" name="name" value={userInfo.name} onChange={(e) => setUserInfo.name(e.target.value)} />
        </label>
        <label>
            SIRET :
            <input type="text" name="siret" value={userInfo.siret} onChange={(e) => setUserInfo.siret(e.target.value)} />
        </label>
        <label>
            Email :
            <input type="email" name="email" value={userInfo.email} onChange={(e) => setUserInfo.email(e.target.value)} />
        </label>
        <label>
            Mot de passe :
            <input type="password" name="password" value={userInfo.password} onChange={(e) => setUserInfo.password(e.target.value)} />
        </label>
        <label>
            Date de naissance :
            <input type='date' name='birthday' value={userInfo.birthday} onChange={(e) => setUserInfo.birthday(e.target.value)}/>
        </label>
        <label>
            Code postal :
            <input type='text' name='zipcode' value={userInfo.zipcode} onChange={(e) => setUserInfo.zipcode(e.target.value)}/>
        </label>
        <label>
            J'accepte les conditions d'utilisation :
            <input type="checkbox" name="acceptedTerms" checked={userInfo.acceptedTerms} onChange={(e) => setUserInfo.acceptedTerms(e.target.checked)} />
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
