import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/Event.module.css";
import Link from "next/link";
import { Image } from "antd/lib";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Event() {
  const events = useSelector((state) => state.searchResults.value.events);
  const eventSelectedKey = useSelector((state) => state.searchResults.value.selectedEventKey);
  const selectedEventTarget = events[eventSelectedKey].target;
  const selectedEventCategories = events[eventSelectedKey].categories;
  const selectedEventAddress = events[eventSelectedKey].address;
  const router = useRouter();

  const handleGoBack = () => {
    console.log("retour");
    router.back; // Navigue vers la page précédente
  };

  const formattedStartDate = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(events[eventSelectedKey].startDate));

  const formattedEndDate = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(events[eventSelectedKey].endDate));

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <Button
          className={styles.backButton}
          onClick={() => {
            router.back();
            // handleGoBack();
          }}
        >
          <FontAwesomeIcon className={styles.btnSearch} icon={faArrowLeft} />
          Retour aux resultats
        </Button>
        <h2 className={styles.eventTitle}>{events[eventSelectedKey].name}</h2>
        <Image
          src="https://secure.meetupstatic.com/photos/event/7/e/1/600_500402017.webp?w=750"
          width={"50vw"}
          className={styles.eventImage}
          preview={false}
        />
        <div className={styles.eventLabelDetails}>Détails</div>
        <div className={styles.eventDescription}>{events[eventSelectedKey].description}</div>
      </div>

      <div className={styles.rightContainer}>
        <Button
          className={styles.contactButton}
          // onClick={() => handleContact()}
        >
          Contacter l'association
        </Button>

        <div className={styles.associationCard} onClick={() => router.push("/association")}>
          <Image
            src="https://secure.meetupstatic.com/photos/event/2/1/7/600_525000535.webp?w=750"
            width={100}
            height={100}
            className={styles.associationImage}
            preview={false}
          />
          <div className={styles.associationName}>{events[eventSelectedKey].organiser?.name}</div>
        </div>
        <div className={styles.eventInfos}>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Date de début : </div>
            <div className={styles.eventStartDate}>{formattedStartDate}</div>
          </div>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Date de fin : </div>
            <div className={styles.eventEndDate}>{formattedEndDate}</div>
          </div>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Lieu :</div>
            <div className={styles.eventLocation}>
              <div>{selectedEventAddress.street}</div>
              <div>{selectedEventAddress.city}</div>
              <div>{selectedEventAddress.zipcode}</div>
            </div>
          </div>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Public visé :</div>
            <div className={styles.eventTarget}>{selectedEventTarget.join(", ")}</div>
          </div>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Catégories de l'événement :</div>
            <div className={styles.eventCategories}>{selectedEventCategories.join(" ")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
//commentaire pour valider le push
