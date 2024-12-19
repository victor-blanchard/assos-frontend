import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React from "react";
import { Calendar, DatePicker, Input, Select, Switch, Tabs, List, Avatar } from "antd/lib";
import { useState, useEffect } from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";

import {
  addEvents,
  deleteEvents,
  addFilters,
  deleteFilters,
  addAssociations,
  deleteAssociations,
  addEventId,
  addAssociationId,
} from "../reducers/searchResults";
const categoriesOptions = [
  { label: "Aide à la personne", value: "Aide à la personne" },
  { label: "Sport", value: "Sport" },
  { label: "Santé", value: "Santé" },
  { label: "Enfant", value: "Enfant" },
  { label: "Solidarité", value: "Solidarité" },
  { label: "Art & Culture", value: "Art & Culture" },
  { label: "Education", value: "Education" },
  { label: "Animaux", value: "Education" },
];

const publicOptions = [
  { label: "Adulte", value: "Adulte" },
  { label: "Ado", value: "Ado" },
  { label: "Enfant", value: "Enfant" },
  { label: "Senior", value: "Senior" },
];

const EventSearchContent = () => {
  const router = useRouter();
  const events = useSelector((state) => state.searchResults.value.events);
  // const eventSelectedId = useSelector((state) => state.searchResults.value.selectedEventId);
  const filters = useSelector((state) => state.searchResults.value.filters);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState(null);
  const [target, setTarget] = useState(null);
  const [openOnly, setOpenOnly] = useState(true);

  const test = router.query;
  console.log(test.testQuery);

  useEffect(() => {
    if (router.query.categories) {
      const categories = router.query.categories;
      if (categories != "") setCategories(categories);
    }

    if (router.query.keyword) {
      setKeyword(router.query.keyword);
    }

    if (router.query.location) {
      setLocation(router.query.location);
    }

    // if (filters?.keyword?.length > 0) {
    //   setKeyword(filters.keyword);
    // }

    // if (filters?.location?.length > 0) {
    //   setLocation(filters.location);
    // }

    // if (filters?.categories?.length > 0) {
    //   setCategories(filters.categories);
    // }
  }, []);

  const eventsToDisplay = events.map((data, i) => {
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

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(
      addFilters({
        keyword: keyword,
        location: location,
        date: date,
        categories: categories,
        target: target,
        openOnly: openOnly,
      })
    );

    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries({
          keyword: keyword,
          location: location,
          date: date,
          categories: categories,
          target: target,
          openOnly: openOnly,
        }).filter(([_, value]) => value !== undefined && value !== null && value !== "")
      )
    );
    // Remplacer %2C par ,
    const queryString = params.toString().replace(/%2C/g, ",");

    fetch(`http://localhost:3000/events/filtered?${queryString}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addEvents(data.events));
          console.log(`${data.events.length} events ajoutés au reducer searchResult`);
        }
      });
  };

  const handleEventDisplay = (id) => {
    router.push(`/event?id=${id}`); //gere la navigation au click vers la page search en évitant la page blanche
  };

  const openOnlyChange = (openOnly) => {
    console.log("Display open events only:", openOnly);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h2 className={styles.searchTitle}>Événements à proximité</h2>
      <div className={styles.filterContainer}>
        <Input
          className={styles.filterbox}
          placeholder="Mot clé"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          onClear={() => setKeyword("")}
          allowClear
        />
        <Input
          className={styles.filterbox}
          placeholder="Lieu"
          value={location}
          allowClear
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          onClear={() => {
            setLocation("");
            console.log(location);
          }}
          // allowClear="true"
        />
        <DatePicker
          className={styles.filterboxDate}
          placeholder="Date"
          onChange={(date) => {
            if (date) {
              const formattedDate = date.toISOString(); // Format ISO 8601 : 2024-03-10T10:00:00.000Z
              setDate(formattedDate);
            } else {
              setDate(null);
            }
          }}
        />
        <Select
          className={styles.filterbox}
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Categories"
          value={categories?.split(",")}
          options={categoriesOptions}
          onChange={(value) => {
            setCategories(value.join(","));
          }}
        />
        <Select
          className={styles.filterbox}
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Public visé"
          defaultValue={[]}
          options={publicOptions}
          onChange={(value) => {
            setTarget(value.join(","));
            console.log(target);
          }}
        />

        <div className={styles.openOnlyBox}>
          <div className={styles.openOnlyText}> Inscriptions ouvertes uniquement </div>
          <Switch onChange={(checked) => setOpenOnly(checked)} defaultChecked />
        </div>
        <Button className={styles.filterbox} onClick={() => handleSearch()}>
          Actualiser
        </Button>
      </div>
      <div className={styles.resultContainer}>{eventsToDisplay}</div>

      {/* <div className={styles.map}></div> */}
    </div>
  );
};

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

const AssociationSearchContent = () => {
  const router = useRouter();
  const associations = useSelector((state) => state.searchResults.value.associations);

  const handleAssociationDisplay = (id) => {
    router.push(`/public_association?id=${id}`);
  };

  const associationsToDisplay = associations.map((data, i) => {
    const categoriesToDisplay = data.categories.map((data, i) => {
      return (
        <div key={i} className={styles.cardCategory}>
          {data}
        </div>
      );
    });

    return (
      <div
        onClick={() => handleAssociationDisplay(data._id)}
        id={data._id}
        key={i}
        className={styles.card}
      >
        <Image
          src="https://secure.meetupstatic.com/photos/event/2/1/7/600_525000535.webp?w=750"
          width={180}
          height={100}
          alt="image de l'association"
          className={styles.cardImage}
        />
        <div className={styles.cardInfos}>
          <div className={styles.cardName}>{data.name}</div>
          {/* <div className={styles.cardOrganiser}>{data.organiser.name}</div> */}
          <div className={styles.cardDescription}>{sliceByWords(data.description, 300)}</div>
        </div>
        <div className={styles.cardType}>
          <div className={styles.cardCategories}>{categoriesToDisplay}</div>
          {/* <div className={styles.cardTarget}>{data.target.join(" ")}</div> */}
          {/* <div className={styles.cardCity}>{data.address.city}</div> */}
          <div className={styles.cardAddress}>
            <div className={styles.cardCity}>{data.address.city}</div>
            <div className={styles.cardZipcode}>{data.address.zipcode}</div>
          </div>
          {/* <div className={styles.cardZipcode}>{data.address.zipcode}</div> */}
        </div>
      </div>
    );
  });

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState("");

  const handleSearch = () => {
    dispatch(
      addFilters({
        keyword: keyword,
        location: location,
        categories: categories,
      })
    );

    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries({
          keyword: keyword,
          location: location,
          categories: categories,
        }).filter(([_, value]) => value !== undefined && value !== null && value !== "")
      )
    );
    // Remplacer %2C par ,
    const queryString = params.toString().replace(/%2C/g, ",");

    fetch(`http://localhost:3000/associations/filtered?${queryString}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addAssociations(data.associations));
          console.log(`${data.associations.length} associations ajoutés au reducer searchResult`);
        }
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h2 className={styles.searchTitle}>Associations à proximité</h2>
      <div className={styles.filterContainer}>
        <Input
          className={styles.filterbox}
          placeholder="Mot clé"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          className={styles.filterbox}
          placeholder="Lieu"
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Select
          className={styles.filterbox}
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Categories"
          defaultValue={[]}
          options={categoriesOptions}
          onChange={(value) => setCategories(value.join(","))}
        />
        <div className={styles.openOnlyBox}>
          <Button className={styles.filterbox} onClick={() => handleSearch()}>
            Actualiser
          </Button>
        </div>
      </div>
      <div className={styles.resultContainer}>{associationsToDisplay}</div>

      {/* <div className={styles.map}></div> */}
    </div>
  );
};
const items = [
  {
    key: "1",
    label: "Événements",
    children: <EventSearchContent />,
  },
  {
    key: "2",
    label: "Associations",
    children: <AssociationSearchContent />,
  },
];

function Search() {
  // useEffect(() => {
  //   (async () => {
  //     // const result = await ;
  //     const status = result?.status;

  //     if (status === "granted") {
  //       Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
  //         setCurrentPosition(location.coords);
  //       });
  //     }
  //   })();
  // }, []);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const [selectedDate, setSelectedDate] = useState("");

  const handleSelectedDate = () => {};
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <div className={styles.searchMain}>
      <div className={styles.searchHeaders}>
        <div className={styles.searchTabs}>
          <Tabs defaultActiveKey="1" centered items={items} />
        </div>
      </div>
    </div>
  );
}

export default Search;
