import React from 'react';
import styles from "../styles/DropMenu.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/users';
import Link from 'next/link';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket, faHeart } from "@fortawesome/free-solid-svg-icons";

const DropMenu = (props) => {
  const dispatch = useDispatch();
  const isAssociationOwner = useSelector((state) => state.users.value.isAssociationOwner);

  // const handleLogout = () => {
  //   dispatch(logout());
  //   console.log('Déconnexion')
  // };
  const items = [
    {
      label: (
        <Link className={styles.link} href={isAssociationOwner ? '/admin_association': '/about'}>
          {isAssociationOwner ? 'Mon compte' : 'Ma page'}
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <span className={styles.dropSpan}>
          Mes favoris
          <FontAwesomeIcon onClick={() =>console.log('coeur')} className={` ${styles.iconInDrop}`} icon={faHeart} />  
        </span>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <span onClick={props.onLogout}className={styles.dropSpan}>
          Déconnexion
          <FontAwesomeIcon  className={`${styles.logout} ${styles.iconInDrop}`} icon={faRightFromBracket} />  
        </span>
      ),
      key: '3',
    },
  ];

  const handleUserMenu = () => {
    console.log('Menu utilisateur ouvert');
  };

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <UserOutlined className={styles.userIcon} onClick={handleUserMenu} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropMenu;
