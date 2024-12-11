import Link from "next/link";
import styles from "../styles/Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React from "react";
import { Calendar, DatePicker, Input, Select, Switch, Tabs } from "antd/lib";
import { useState, useEffect } from "react";
import { Button } from "antd";
const categoriesOptions = [
  { label: "Sport", value: "Sport" },
  { label: "Humanitaire", value: "Humanitaire" },
];
const publicOptions = [
  { label: "Adulte", value: "Adulte" },
  { label: "Ado", value: "Ado" },
  { label: "Enfant", value: "Enfant" },
  { label: "Senior", value: "Senior" },
];
const EventSearchContent = () => {
  const onSwitchChange = (checked) => {
    console.log("Switch state:", checked);
  };

  return (
    <div>
      <div className={styles.filterContainer}>
        <Input className={styles.filterbox} placeholder="Location" />
        <DatePicker className={styles.filterbox} />
        <Select
          className={styles.filterbox}
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Categories"
          defaultValue={[]}
          options={categoriesOptions}
        />
        <Select
          className={styles.filterbox}
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Public visé"
          defaultValue={[]}
          options={publicOptions}
        />
        <div className={styles.filterbox}>
          Open only <Switch onChange={onSwitchChange} />
        </div>
        <Button className={styles.filterbox}>Actualiser</Button>
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
            </div>
          </div>
        </div>
        <div className={styles.map}></div>
      </div>
    </div>
  );
};
const AssociationSearchContent = () => {
  const onSwitchChange = (checked) => {
    console.log("Switch state:", checked);
  };

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
