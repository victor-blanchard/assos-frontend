import styles from '../styles/SignUpForm.module.css';
import React from 'react';
import { useState } from 'react';

// import Password from 'antd/es/input/Password';
// const { useState } = React;
import { 
  Button,
} from 'antd';





function SignUpForm(props) {
    const [isAsso, setIsAsso] = useState(false);// Permet de vérifier si c'est une asso
    const [isUser, setIsUSer] = useState(false);// Permet de vérifier si c'est un particulier
    const [name, setName] = useState('');
    const [firstName, setfirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [siret, setSiret] = useState('');
    console.log('C\'est une association =>', isAsso);
    console.log('C\'est un particulier =>', isUser);


    const handleAsso = () => {
        setIsAsso(true);
        setIsUSer(false);            
        
    }

    const handleUser = () => {
        setIsUSer(true);
        setIsAsso(false);

    }
    let formulaire;

    if (!isUser && !isAsso) {
     formulaire = (<div>
              <h2>Je suis :</h2>
              <Button onClick={handleAsso}>Association</Button>
              <Button onClick={handleUser}>Particulier</Button>
            </div>)
    } else if (!isAsso && isUser) {
     formulaire = <form>
     <label>
          Prenom :
         <input type="text" name="firstName" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
     </label>
     <label>
         Nom :
         <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
     </label>
     <label>
         Email :
         <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
     </label>
     <label>
         Mot de passe :
         <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
     </label>
     <label>
         Date de naissance :
         <input type='date' name='birthday' value={birthday} onChange={(e) => setBirthday(e.target.value)}/>
     </label>
     <label>
         Code postal :
         <input type='text' name='zipcode' value={zipcode} onChange={(e) => setZipcode(e.target.value)}/>
     </label>
     <label>
         J'accepte les conditions d'utilisation :
         <input type="checkbox" name="acceptedTerms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
     </label>
     <Button type='submit'>S'inscrire</Button>
   </form>
    } else if (isAsso && !isUser) {
     
        formulaire = 
        <form>
        <label>
             Prenom :
            <input type="text" name="firstName" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
        </label>
        <label>
            Nom :
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
            SIRET :
            <input type="text" name="siret" value={siret} onChange={(e) => setSiret(e.target.value)} />
        </label>
        <label>
            Email :
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
            Mot de passe :
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
            Date de naissance :
            <input type='date' name='birthday' value={birthday} onChange={(e) => setBirthday(e.target.value)}/>
        </label>
        <label>
            Code postal :
            <input type='text' name='zipcode' value={zipcode} onChange={(e) => setZipcode(e.target.value)}/>
        </label>
        <label>
            J'accepte les conditions d'utilisation :
            <input type="checkbox" name="acceptedTerms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
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
