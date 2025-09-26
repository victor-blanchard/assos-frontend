import React, { useState, useEffect } from "react";
import styles from "../styles/MobileWarningPopup.module.css";

const MobileWarningPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fonction pour détecter si l'utilisateur est sur mobile
    const isMobile = () => {
      return (
        window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };

    // Vérifier si c'est un appareil mobile au chargement
    if (isMobile()) {
      setShowPopup(true);
    }

    // Écouter les changements de taille d'écran
    const handleResize = () => {
      if (isMobile()) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Nettoyer l'event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h3>⚠️ Site non responsive</h3>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>
        </div>
        <div className={styles.popupContent}>
          <p>
            Ce site n'est pas optimisé pour les appareils mobiles. Pour une meilleure expérience,
            veuillez le consulter sur un ordinateur.
          </p>
          <div className={styles.popupActions}>
            <button className={styles.continueButton} onClick={handleClose}>
              Continuer quand même
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWarningPopup;
