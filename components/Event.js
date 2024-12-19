import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Event.module.css";
import { Image, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { addLikeEvent } from "../reducers/searchResults";

function Event() {
  const [event, setEvent] = useState(null);
  const [like, setLike] = useState(false);
  // const eventSelectedId = useSelector((state) => state.searchResults.value.selectedEventId);
  const user = useSelector((state) => state.users.value);
  const userLikedEvents = useSelector((state) => state.users.value.likedEvents);
  // const associationSelectedId = useSelector(
  //   (state) => state.searchResults.value.selectedAssociationId
  // );
  const router = useRouter();
  const dispatch = useDispatch();
  const [eventId, setEventId] = useState(null);

  useEffect(() => {
    if (router.query.id) {
      setEventId(router.query.id);
    }
    if (eventId) {
      fetch(`http://localhost:3000/events/eventById/${eventId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setEvent(data.event);
          }
        })
        .catch((error) => console.error("Erreur lors de la récupération de l'événement :", error));

      fetch(`http://localhost:3000/users/getUserLikedEvents/${user.token}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            const likedEventId = data?.likedEvents?.map((event) => event._id);
            if (likedEventId?.includes(eventId)) {
              setLike(true);
              console.log("event dans les events likés");
            } else {
              console.log("event pas dans les events likés");
            }
          }
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération des liked events :", error)
        );
    }
  }, [eventId, user]);

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
    // console.log(`asso selected${id}`);
    // dispatch(addAssociationId(id));
    // console.log({ associationSelectedId });
    router.push(`/public_association?id=${id}`);
  };

  const handleMailto = () => {
    window.location.href = `mailto:${event?.organiser?.email}?subject=Demande d'informations ${event?.name}`;
  };

  const handleLike = async () => {
    if (!like) {
      await fetch(`http://localhost:3000/users/addLikeEvent/${user.token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: eventId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log(`like ajouté `);
            setLike(true);
            console.log(data.likedEvents);
          } else {
            console.error("Erreur : erreur dans l'ajout du like");
          }
        });
    } else {
      await fetch(`http://localhost:3000/users/removeLikeEvent/${user.token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: eventId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log(`like ajouté `);
            setLike(false);
            console.log(data.likedEvents);
          } else {
            console.error("Erreur : erreur dans la suppression du like");
          }
        });
    }
  };

  const renderLikeButton = () => {
    if (!user?.token || user?.isAssociationOwner) return null;
    return like ? (
      <FontAwesomeIcon className={styles.likeButton} icon={faHeartSolid} onClick={handleLike} />
    ) : (
      <FontAwesomeIcon
        className={styles.likeButton}
        icon={faHeartRegular}
        style={{ color: "#4e4e4e" }}
        onClick={handleLike}
      />
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <Button className={styles.backButton} onClick={handleGoBack}>
          <FontAwesomeIcon className={styles.btnSearch} icon={faArrowLeft} />
          Retour
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
        <div className={styles.eventButtons}>
          <div className={styles.likeButton}>{renderLikeButton()}</div>
          <Button className={styles.contactButton} onClick={handleMailto}>
            Contacter l'association
          </Button>
        </div>
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
            <div className={styles.eventLabel}>Date limite d'inscription :</div>
            <div className={styles.eventLimitDate}>{formatDateTime(event?.limitDate)}</div>
          </div>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Lieu :</div>
            <div className={styles.eventLocation}>
              <div className={styles.eventStreet}>
                {event?.address?.street || "Adresse non disponible"}
              </div>
              <div>{event?.address?.city || "Ville non disponible"}</div>
              <div>{event?.address?.zipcode || "Code postal non disponible"}</div>
            </div>
          </div>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Public visé :</div>
            <div className={styles.eventTarget}>
              {event?.target?.join(" - ") || "Aucun public spécifié"}
            </div>
          </div>
          <div className={styles.eventSlot}>
            <div className={styles.eventLabel}>Catégories de l'événement :</div>
            <div className={styles.eventCategories}>
              {event?.categories?.join(" - ") || "Aucune catégorie définie"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
