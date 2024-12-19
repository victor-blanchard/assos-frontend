import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/PublicAssociation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Table, Empty } from "antd/lib";
import {
  faHeart,
  faShare,
  faBookmark,
  faSort,
  faSortUp,
  faSortDown,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEventId } from "../reducers/searchResults";
import { login } from "../reducers/users";

function PublicAssociation() {
  const dispatch = useDispatch();
  const router = useRouter();

  // const associationSelectedId = useSelector(
  //   (state) => state.searchResults.value.selectedAssociationId
  // );

  const [association, setAssociation] = useState(null);
  const [events, setEvents] = useState([]);
  const [sortOrder, setSortOrder] = useState({});
  const [assoLikeStatus, setAssolikeStatus] = useState(false);
  const user = useSelector((state) => {
    return state.users.value;
  });

  const [associationId, setAssociationId] = useState(null);
  // const eventSelectedId = useSelector((state) => state.searchResults.value.selectedEventId);

  // Effet pour récupérer les données de l'association
  useEffect(() => {
    if (router.query.id) {
      setAssociationId(router.query.id);
      console.log(associationId);
    }
    // Vérification : attendre que associationSelectedId soit défini
    if (!associationId) return;

    const fetchAssociation = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/associations/getAssoInfos/${associationId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();

        if (data.result) {
          console.log(`Données de l'association--- ${associationId} -----récupérées`);
          setAssociation(data.association);
        } else {
          console.error("Erreur : Association non trouvée");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'association :", error);
      }
    };
    fetchAssociation();

    fetch(`http://localhost:3000/users/followingAssociations/${user.token}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        const likedAssosId = data?.followingAssociations?.map((event) => event._id);
        if (data?.result) {
          if (likedAssosId?.includes(associationId)) {
            setAssolikeStatus(true);
            console.log("asso dans les asso likés");
          }
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des following associations :", error)
      );
  }, [associationId, user, assoLikeStatus]);

  // Effet pour récupérer les événements de l'association
  useEffect(() => {
    if (associationId) {
      fetch(`http://localhost:3000/events/getAllEvents/${associationId}`)
        .then((response) => response.json())
        .then((data) => setEvents(data.events))
        .catch((error) => console.error("Erreur lors de la récupération des événements :", error));
      console.log("Events de l'association récupérés");
    }
  }, [associationId]);

  const categoriesToDisplay = association?.categories.map((data, i) => {
    return (
      <div key={i} className={styles.cardCategory}>
        {data}
      </div>
    );
  });

  const handleEventDisplay = (id) => {
    router.push(`/event?id=${id}`); //gere la navigation au click vers la page search en évitant la page blanche
  };

  const columns = [
    {
      title: "Evenements",
      dataIndex: "name",
      onCell: (event) => ({
        onClick: () => handleEventDisplay(event._id),
        style: { cursor: "pointer" },
      }),
    },
    {
      title: "Date de début",
      dataIndex: "startDate",
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
      // sorter: {
      //   compare: (a, b) => a.startDate - b.startDate,
      //   multiple: 2,
      // },
    },
    {
      title: "Date de fin",
      dataIndex: "endDate",
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
      // sorter: {
      //   compare: (a, b) => a.endDate - b.endDate,
      //   multiple: 3,
      // },
    },
    {
      title: "Description",
      dataIndex: "description",
      onCell: (e) => ({ style: { textAlign: "justify" } }),
    },
    // {
    //   title: "Adresse",
    //   dataIndex: "address.city",
    // },
    {
      title: "Catégories",
      dataIndex: "categories",
    },
    {
      title: "Places disponibles",
      dataIndex: "slotsAvailable",
    },
  ];

  const data = events;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  console.log("likestatusavantchargement=>" + assoLikeStatus);
  ///// START - LIKE OF THE ASSOCIATION /////

  function truncateText(text, maxLength) {
    if (!text) {
      // if text undefined or null
      return ""; // Return a blank
    }
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  const likeAsso = async (token, assoId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/addLikeAsso/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          assoId: assoId,
        }),
      });
      response.json().then((data) => {
        if (data.result) {
          console.log(`Données de l'association ${assoId} récupérées`);
        } else {
          console.error("Erreur : User non trouvé");
        }
      });
      setAssolikeStatus(true);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    }
  };

  const handleLikeAsso = () => {
    if (user && user.token) {
      // controle utilisateur
      console.log(user.token);
      console.log(associationId);
      likeAsso(user.token, associationId);
    } else {
      console.error("User not found.");
    }
  };

  ///// END - DISLIKE OF THE ASSOCIATION //////

  const dislikeAsso = async (token, assoId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/removeLikeAsso/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          assoId: assoId,
        }),
      });
      response.json().then((data) => {
        if (data.result) {
          console.log(`Données de l'association ${assoId} récupérées`);
        } else {
          console.error("Erreur : User non trouvé");
        }
      });
      setAssolikeStatus(false);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    }
  };

  const handledislikeAsso = () => {
    if (user && user.token) {
      // controle utilisateur
      console.log(user.token);
      console.log(associationId);
      dislikeAsso(user.token, associationId);
    } else {
      console.error("User not found.");
    }
  };

  ///// END - DISLIKE OF THE ASSOCIATION //////

  return (
    <div className={styles.publicAssoMain}>
      <div className={styles.leftContainer}>
        <Button className={styles.backButton} onClick={() => router.back()}>
          <FontAwesomeIcon className={styles.btnBack} icon={faArrowLeft} /> Retour
        </Button>
        <Image
          src={`/${association?.image}`}
          width={350}
          height={200}
          className={styles.associationImage}
          preview="false"
          alt="image de l'association"
        />
        <div className={styles.assoDescriptionLabel}>Description</div>
        <div className={styles.assoDescription}>
          {association?.description || "Aucune description disponible"}
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.rightTopContainer}>
          <div className={styles.assoInfos}>
            <div className={styles.assoName}>{association?.name}</div>
            <div className={styles.assoSiretSlot}>
              <div className={styles.assoLabel}>SIRET : </div>
              <div className={styles.assoSiret}>{association?.siret}</div>
            </div>
            <div className={styles.assoLocation}>
              <div>{association?.address?.street || "Adresse non disponible"}</div>
              <div>{association?.address?.city || "Ville non disponible"}</div>
              <div>{association?.address?.zipcode || "Code postal non disponible"}</div>
            </div>
            <div>
              <div className={styles.assoEmail}>{association?.email}</div>
              <div className={styles.assoContact}>{association?.phone}</div>
            </div>
            <div className={styles.assoCategoriesContainer}>
              <div className={styles.assoCategoriesLabel}>Thèmes</div>
              <div className={styles.assoCategories}>
                <div className={styles.cardCategories}>{categoriesToDisplay}</div>
              </div>
            </div>
          </div>
          {!user?.isAssociationOwner && user.token ? (
            assoLikeStatus ? (
              <Button
                className={styles.subButton}
                style={{ color: "#0093e9", backgroundColor: "white" }}
                onClick={() => handledislikeAsso(associationId)}
              >
                Ne plus suivre l'association
              </Button>
            ) : (
              <Button className={styles.subButton} onClick={() => handleLikeAsso(associationId)}>
                Suivre l'association
              </Button>
            )
          ) : (
            <div></div>
          )}
        </div>

        <h1>Événements</h1>
        <Table
          locale={{
            emptyText: <Empty description="Pas d'événements à afficher"></Empty>,
          }}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default PublicAssociation;
