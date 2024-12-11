import { Modal, Button } from 'antd';
import styles from '../styles/Modal.module.css';
import Link from 'next/link';
import SignUpForm from './SignUpForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isModalVisible } from '../reducers/users';

function ModalForm(props) {
  const [userInfo, setUserInfo] = useState(null);
  const modal = useSelector((state) => state.users.value.formState);
  const dispatch = useDispatch();
  
  console.log('La modal est visible ? => ', modal);

  const handleSignCancel = () => {
    // setIsModalVisible(false);
    dispatch(isModalVisible(false)); // Réinitialiser l'état du formulaire
};

  const handleSignUp = (userInfo) => {
    setUserInfo(userInfo);
    dispatch(isModalVisible(false));
  };
  return (
      <div >
        <Modal
            title="S'inscrire"
            open={modal} // Ouvre la modal
            // onClose={!props.isModalVisible}
            // onOk={handleSign} // Ferme la modal avec le bouton "OK" prévoir une redirection
            onCancel={handleSignCancel} // Ferme la modal avec le bouton "Annuler"
            footer={null}
            className={styles.modal}
          >
            <SignUpForm  onSignUp={handleSignUp} isModalVisible={modal}/>
            
          </Modal>
      </div>
  );
}

export default ModalForm;
