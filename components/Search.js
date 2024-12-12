import Link from "next/link";
import styles from "../styles/Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React from 'react';
import { Calendar } from 'antd';
import { useState, useEffect } from "react";
import ModalForm from './ModalForm';

function Search() {
  const [selectedDate, setSelectedDate] = useState('')

  const handleSelectedDate = () => {
   
  }
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  }
  return (
    <div className={styles.searchMain}>
      <div className={styles.searchHeaders}>
        <h2 className={styles.searchTitle}>Événements à proximité de Paris</h2>
        <div className={styles.searchTabs}>
          <span className={styles.tab}>Événements</span>
          <span className={styles.tab}>Associations</span>
        </div>
      </div>
      <div className={styles.filterContainer}>
        <div className={styles.filterbox}>Date
        <Calendar className={styles.calendar} onPanelChange={onPanelChange} />
        </div>
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
              <FontAwesomeIcon
                className={styles.resultIcon}
                icon={faBookmark}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.map}></div></div>
      <ModalForm/>
    </div>
  );
}

export default Search;
