import styles from '../styles/Footer.module.css';
import Link from 'next/link';

function Footer() {
  return (
      <footer className={styles.footer}>
        <ul className={styles.footerInfos}>
            <Link href='/about'><li>A propos</li></Link>
            <Link href='/contact'><li>Contact</li></Link>
        </ul>
      </footer>
  );
}

export default Footer;
