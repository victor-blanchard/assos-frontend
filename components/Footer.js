import styles from '../styles/Footer.module.css';

function Footer() {
  return (
      <footer className={styles.footer}>
        <ul className={styles.footerInfos}>
            <li>A propos</li>
            <li>Contact</li>
        </ul>
      </footer>
  );
}

export default Footer;
