import Link from "next/link";
import styles from "../styles/Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React from "react";
import { Calendar, DatePicker, Input, Select, Switch, Tabs, List, Avatar } from "antd/lib";
import { useState, useEffect } from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addEvents, deleteEvents, addFilters, deleteFilters } from "../reducers/searchResults";
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
  const events = useSelector((state) => state.searchResults.value.events);

  const eventsToDisplay = events.map((data, i) => {
    const categoriesToDisplay = data.categories.map((data, i) => {
      return <div className={styles.cardCategory}>{data}</div>;
    });

    const formattedDate = new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(data.startDate));

    return (
      <div className={styles.card}>
        <Image
          src="https://secure.meetupstatic.com/photos/event/2/1/7/600_525000535.webp?w=750"
          width={180}
          height={100}
          className={styles.cardImage}
        />
        <div className={styles.cardInfos}>
          <div className={styles.cardDate}>{formattedDate}</div>
          <div className={styles.cardName}>{data.name}</div>
          {/* <div className={styles.cardOrganiser}>{data.organiser.name}</div> */}
          <div className={styles.cardDescription}>{data.description}</div>

          <div className={styles.cardSlotsAvailable}>{data.slotsAvailable} Places </div>
        </div>
        <div className={styles.cardType}>
          <div className={styles.cardCategories}>{categoriesToDisplay}</div>
          {/* <div className={styles.cardTarget}>{data.target.join(" ")}</div> */}
          {/* <div className={styles.cardCity}>{data.address.city}</div> */}
          <div className={styles.cardZipcode}>{data.address.zipcode}</div>
        </div>
      </div>
    );
  });

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState("");
  const [target, setTarget] = useState("");
  const [openOnly, setOpenOnly] = useState(true);

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

  const openOnlyChange = (openOnly) => {
    console.log("Display open events only:", openOnly);
  };
  // const locationReducer = useSelector((state) => state.searchResults.value.filters.location);
  // let locationValue;
  // if (locationReducer) {
  //   locationValue = location;
  // }
  // const keywordReducer = useSelector((state) => state.searchResults.value.filters.keyword);
  // let keywordValue;
  // if (keywordReducer) {
  //   keywordValue = keyword;
  // }

  return (
    <div>
      <div className={styles.filterContainer}>
        <Input
          className={styles.filterbox}
          placeholder="Mot clé"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Input
          className={styles.filterbox}
          placeholder="Lieu"
          onChange={(e) => setLocation(e.target.value)}
        />
        <DatePicker
          className={styles.filterbox}
          placeholder="Date"
          onChange={(date) => setDate(date)}
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
        <Select
          className={styles.filterbox}
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Public visé"
          defaultValue={[]}
          options={publicOptions}
          onChange={(value) => setTarget(value.join(","))}
        />

        
        <div className={styles.openOnlyBox}>
          <div className={styles.openOnlyText}> Inscriptions ouvertes uniquement </div>
          <Switch onChange={(checked) => setOpenOnly(checked)} defaultChecked />
          <Button className={styles.filterbox} onClick={() => handleSearch()}>
            Actualiser
          </Button>
        </div>
      </div>
      <div className={styles.resultContainer}>
        {eventsToDisplay}
        {/* <div className={styles.imageContainer}>
              <Image
                src="https://secure.meetupstatic.com/photos/event/c/0/9/a/600_514189306.webp?w=384"
                width={80}
                height={100}
              />
            </div>
            <div className={styles.resultDefandIcons}>
              <div className={styles.resultDetailsContainer}>
                <span className={styles.EventDate}>Date</span>

                <span className={styles.EventTitle}>Event Title</span>
                <span className={styles.EventDescription}>Event Description</span>
                <span className={styles.EventCity}>Event City</span>
                <span className={styles.EventAssociationName}>Association Name</span>
              </div>
              <div className={styles.resultShareAndBookmarkContainer}>
                <FontAwesomeIcon className={styles.resultIcon} icon={faShare} />
                <FontAwesomeIcon className={styles.resultIcon} icon={faBookmark} />
              </div>
            </div> */}
      </div>

      {/* <div className={styles.map}></div> */}
    </div>
  );
};
const AssociationSearchContent = () => {
  return (
    <div>
      <div className={styles.filterContainer}>
        <Input className={styles.filterbox} placeholder="Location" />

        <Select
          className={styles.filterbox}
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Categories"
          defaultValue={[]}
          options={categoriesOptions}
        />

        <div className={styles.filterbox}></div>
      </div>
      <div className={styles.resultPageAndMap}>
        <div className={styles.resultPageContainer}>
          <div className={styles.resultContainer}>
            <div className={styles.imageContainer}>
              <Image
                src="https://secure.meetupstatic.com/photos/event/c/0/9/a/600_514189306.webp?w=384"
                width={80}
                height={100}
              />
            </div>
          </div>
        </div>
        <div className={styles.map}></div>
      </div>
    </div>
  );
};
const items = [
  {
    key: "1",
    label: "Evenements",
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
        <h2 className={styles.searchTitle}>Événements à proximité</h2>
        <div className={styles.searchTabs}>
          <Tabs defaultActiveKey="1" centered items={items} />
        </div>
      </div>
    </div>
  );
}

export default Search;
