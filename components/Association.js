import Link from "next/link";
import styles from "../styles/Association.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

function Association() {
  return (
    <div className={styles.associationMain}>
      <div className={styles.imageAndTitleAndDescription}>
        <div className={styles.imageOfAssociationContainer}>
          <Image
            className={styles.logo}
            src="/associationLogoExemple.jpg"
            alt="Logo"
            width={100}
            height={50}
          />
        </div>
        <h2 className={styles.headerOfAssociation}>Association Name</h2> {/* Başlık için h2 kullanımı */}
        <p className={styles.descriptionOfAssociation}> 
          Association Detailed Information 
        </p> {/* Paragraf için p kullanımı */}
      </div>

      <div className={styles.identityCardAndLikeAndEvents}>
        <div className={styles.identityCardAndLike}>
          <div className={styles.identityCardDiv}>
            <h3 className={styles.identityCardHeader}>Association Name</h3> {/* Alt başlık için h3 kullanımı */}
            <span className={styles.identityCardSecondInfo}>Association SIRET</span>
            <span className={styles.identityCardThirdInfo}>Association Adresse</span>
            <span className={styles.identityCardFourthInfo}>Association Contact</span>
            <div className={styles.identityCardThemeCont}></div> 
          </div>
          <div className={styles.iconCont}>
            <FontAwesomeIcon className={styles.likeIcon} icon={faHeart} /> {/* Sınıf adını daha spesifik hale getirme */}
          </div>
        </div>

        <div className={styles.eventsOfAssociation}>
          <div className={styles.filterContainer}>
            <div className={styles.filterbox}>Date</div>
            <div className={styles.filterbox}>Location</div>
            <div className={styles.filterbox}>Category</div>
            <div className={styles.filterbox}>Targeted Public</div>
            <div className={styles.filterbox}>Inscription Open</div>
          </div>

          <div className={styles.resultPageAndMap}>
            <div className={styles.resultPageContainer}>
              <div className={styles.resultContainer}>
                <div className={styles.imageContainer}>
                  <Image
                    src="https://secure.meetupstatic.com/photos/event/c/0/9/a/600_514189306.webp?w=384"
                    width={80}
                    height={100}
                    alt="Event Image" // Alternatif metin ekleme
                  />
                </div>
                <div className={styles.resultContentAndIcons}> {/* resultDefandIcons yerine daha açıklayıcı bir isim */}
                  <div className={styles.resultDetailsContainer}>
                    <span className={styles.EventDate}>Date</span>
                    <span className={styles.EventTitle}>Event Title</span>
                    <span className={styles.EventDescription}>
                      Event Description
                    </span>
                    <span className={styles.EventCity}>Event City</span>
                    <span className={styles.EventAssociationName}>
                      Association Name
                    </span>
                  </div>
                  <div className={styles.resultIcons}> {/* resultShareAndBookmarkContainer yerine daha kısa bir isim */}
                    <FontAwesomeIcon
                      className={styles.resultIcon}
                      icon={faShare}
                    />
                    <FontAwesomeIcon
                      className={styles.resultIcon}
                      icon={faBookmark}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.map}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Association;