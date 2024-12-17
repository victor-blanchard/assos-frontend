import styles from '../styles/UserProfil.module.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';



function AssociationCard({ title, description, onClick }) {
    const [dataAsso, setDataAsso] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:3000/associations/filtered');
                const data = await response.json();
                if (data.result) {
                console.log('INFO ASSO ===>', data);
                
                setDataAsso((prevstate) =>([...prevstate, data]))
                return data
            }
            } catch(error) {
                console.error('Erreur lors du fetch:', error)
            }
            
        })();
        
    }, [])

    return (
        <article className={styles.assoCard} onClick={onClick} style={{ cursor: 'pointer' }}>
            <figure className={styles.assCardFigure}>
                <Image 
                    src="/colaboration.webp"
                    width={200}
                    height={200}
                    alt="asso"
                    className={styles.assoCardImg}
                />
            </figure>
            <div className={styles.assoCardTxt} >
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        </article>
    );
}

export default AssociationCard;