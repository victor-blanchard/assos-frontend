import styles from "../styles/MyEvents.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Tabs, Button } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function MyEvents() {
  const router = useRouter();
  const user = useSelector((state) => state.users.value);
  const token = user.token;
  console.log("token of user in Event pasge ==> " + token);

  const [likedEvents, setLikedEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    if (user && user.token) {
      fetch(`http://localhost:3000/users/getUserLikedEvents/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API response:", data);
          setLikedEvents(data.likedEvents); // likedEvents dizisini al
        })
        .catch((error) => console.error("API fetch error:", error));
    }
  }, [user]);

  const handleClick = (eventId) => {
    router.push(`/event/${eventId}`);
  };

  const handleGoBack = () => {
    router.back();
  };

  const items = [
    {
      key: "upcoming",
      label: "A venir",
      children: null,
    },
    {
      key: "past",
      label: "Passés",
      children: null,
    },
  ];

  // Event'leri filtrele
  const displayedEvents = likedEvents.filter((event) => {
    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    if (activeTab === "upcoming") {
      return startDate > now;
    } else {
      return endDate < now;
    }
  });

  function sliceByWords(text, maxLength) {
    if (text.length <= maxLength) return text;
    const words = text.split(" ");
    let result = "";
    for (const word of words) {
      if (result.length + word.length + 1 > maxLength) break;
      result += (result.length ? " " : "") + word;
    }
    return result + "...";
  }

  const handleEventDisplay = (id) => {
    router.push(`/event?id=${id}`); //gere la navigation au click vers la page search en évitant la page blanche
  };

  const eventsToDisplay = displayedEvents.map((data, i) => {
    const categoriesToDisplay = data.categories.map((data, i) => {
      return (
        <div key={data} className={styles.cardCategory}>
          {data}
        </div>
      );
    });

    const formattedDate = new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(data.startDate));

    return (
      <div
        onClick={() => handleEventDisplay(data._id)}
        key={data._id}
        id={data._id}
        className={styles.card}
      >
        <Image
          src="https://secure.meetupstatic.com/photos/event/2/1/7/600_525000535.webp?w=750"
          width={180}
          height={100}
          alt="image de l'événement"
          className={styles.cardImage}
        />
        <div className={styles.cardInfos}>
          <div className={styles.cardDate}>{formattedDate}</div>
          <div className={styles.cardName}>{data.name}</div>
          {/* <div className={styles.cardOrganiser}>{data.organiser.name}</div> */}
          <div className={styles.cardDescription}>{sliceByWords(data.description, 200)}</div>

          <div className={styles.cardSlotsAvailable}>{data.slotsAvailable} Places </div>
        </div>
        <div className={styles.cardType}>
          <div className={styles.cardCategories}>{categoriesToDisplay}</div>
          <div className={styles.cardTarget}>{data.target.join(" ")}</div>
          <div className={styles.cardAddress}>
            <div className={styles.cardCity}>{data.address.city}</div>
            <div className={styles.cardZipcode}>{data.address.zipcode}</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.main}>
      <div className={styles.leftSection}>
        <Button className={styles.backButton} onClick={handleGoBack}>
          <FontAwesomeIcon className={styles.btnSearch} icon={faArrowLeft} />
          Retour
        </Button>
        <div className={styles.tabs}>
          <Tabs
            tabPosition="left"
            defaultActiveKey="upcoming"
            items={items}
            onChange={(key) => setActiveTab(key)} // Mise à  jour de l'onglet actif
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <h1 className={styles.title}>Mes évenements</h1>
        <div className={styles.container}>
          {displayedEvents.length > 0 ? (
            eventsToDisplay
          ) : (
            <p>Aucun évenement dans cette catégorie.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyEvents;
