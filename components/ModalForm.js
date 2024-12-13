import { Modal, Button } from 'antd';
import styles from '../styles/Modal.module.css';
import Link from 'next/link';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isModalVisible, setFormType } from '../reducers/users';

function ModalForm(props) {
  const [userInfo, setUserInfo] = useState(null);
  const modal = useSelector((state) => state.users.value.modalState);
  const formType = useSelector((state) => state.users.value.formType);
  const dispatch = useDispatch();  
  console.log('La modal est visible ? => ', modal);

  const handleSignCancel = () => {
    dispatch(isModalVisible(false)); // Réinitialiser l'état du formulaire
    dispatch(setFormType('')); //Réinitialise le formType du formulaire
};

  // const handleSignUp = (userInfo) => {
  //   setUserInfo(userInfo);
  //   dispatch(isModalVisible(false));
  // };

  
  // const handleSignIn = (userInfo) => {
  //   setUserInfo(userInfo);
  //   dispatch(isModalVisible(false));
  // };



  return (
      <div >
        <Modal
            title={formType === 'signin' ? 'Se connecter' : "S'inscrire"}
            open={modal} // Ouvre la modal
            // onClose={!props.isModalVisible}
            // onOk={handleSign} // Ferme la modal avec le bouton "OK" prévoir une redirection
            onCancel={handleSignCancel} // Ferme la modal avec le bouton "Annuler"
            footer={null}
            className={styles.modal}
          >
        {formType === 'signin' 
            ? <SignInForm  /*onSignIn={handleSignIn}*/ isModalVisible={modal}/>
            : <SignUpForm  /*onSignUp={handleSignUp}*/ isModalVisible={modal}/>}
            
            
            
          </Modal>
      </div>
  );
}

export default ModalForm;
