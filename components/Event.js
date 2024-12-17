import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Event.module.css";
import { Image, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { addAssociationId } from "../reducers/searchResults";

function Event() {
  const [event, setEvent] = useState(null);
  const eventSelectedId = useSelector((state) => state.searchResults.value.selectedEventId);
  const associationSelectedId = useSelector(
    (state) => state.searchResults.value.selectedAssociationId
  );
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventSelectedId) {
      fetch(`http://localhost:3000/events/eventById/${eventSelectedId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log(data.event);
            setEvent(data.event);
          }
        })
        .catch((error) => console.error("Erreur lors de la récupération de l'événement :", error));
    }
  }, [eventSelectedId]);

  const handleGoBack = () => {
    router.back();
  };

  const formatDateTime = (date) => {
    if (!date) return "Non défini";
    try {
      return new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(date));
    } catch {
      return "Date invalide";
    }
  };

  const handleAssociationDisplay = (id) => {
    console.log(`asso selected${id}`);
    dispatch(addAssociationId(id));
    console.log({ associationSelectedId });
    router.push("/public_association");
  };

  const handleMailto = () => {
    window.location.href = `mailto:${event?.organiser?.email}?subject=Demande d'informations ${event?.name}`;
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <Button className={styles.backButton} onClick={handleGoBack}>
          <FontAwesomeIcon className={styles.btnSearch} icon={faArrowLeft} />
          Retour aux résultats
        </Button>
        <h2 className={styles.eventTitle}>{event?.name || "Nom de l'événement non disponible"}</h2>
        <Image
          src="https://secure.meetupstatic.com/photos/event/7/e/1/600_500402017.webp?w=750"
          width={"35vw"}
          className={styles.eventImage}
          preview={false}
          alt="image de l'événement"
        />
        <div className={styles.eventLabelDetails}>Détails</div>
        <div className={styles.eventDescription}>
          {event?.description || "Pas de description disponible"}
        </div>
      </div>

      <div className={styles.rightContainer}>
        <Button className={styles.contactButton} onClick={handleMailto}>
          Contacter l'association
        </Button>

        <div
          className={styles.associationCard}
          onClick={() => handleAssociationDisplay(event?.organiser?._id)}
        >
          <div className={styles.associationName}>
            {event?.organiser?.name || "Nom de l'association non disponible"}
          </div>
          <Image
            src="https://secure.meetupstatic.com/photos/event/2/1/7/600_525000535.webp?w=750"
            width={70}
            height={70}
            className={styles.associationImage}
            preview={false}
            alt="image de l'association"
          />
        </div>
        <div className={styles.eventInfos}>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Date de début :</div>
            <div className={styles.eventStartDate}>{formatDateTime(event?.startDate)}</div>
          </div>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Date de fin :</div>
            <div className={styles.eventEndDate}>{formatDateTime(event?.endDate)}</div>
          </div>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Lieu :</div>
            <div className={styles.eventLocation}>
              <div>{event?.address?.street || "Adresse non disponible"}</div>
              <div>{event?.address?.city || "Ville non disponible"}</div>
              <div>{event?.address?.zipcode || "Code postal non disponible"}</div>
            </div>
          </div>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Public visé :</div>
            <div className={styles.eventTarget}>
              {event?.target?.join(", ") || "Aucun public spécifié"}
            </div>
          </div>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Catégories de l'événement :</div>
            <div className={styles.eventCategories}>
              {event?.categories?.join(", ") || "Aucune catégorie définie"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
