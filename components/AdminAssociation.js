import Link from "next/link";
import styles from "../styles/AdminAssociation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShare,
  faBookmark,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminAssociation() {
  const [association, setAssociation] = useState(null);
  const [name, setName] = useState("");
  const [nameEditable, setNameEditable] = useState(false);
  const [siret, setSiret] = useState("");
  const [siretEditable, setSiretEditable] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionEditable, setDescriptionEditable] = useState(false);
  const token = useSelector((state) => state.users.value.token);

  /// START - ASSOCIATION IDENTITY INFORMATION EDIT SECTION
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setNameEditable(true);
  //   setDescriptionEditable(true);
  // };

  // const handlePhotoChange = (event) => {
  //   // const file = event.target.files[0];
  //   setPhotoFile(file);

  //   // Create a preview of photo
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setPhotoPreview(reader.result);
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };
 /// END - ASSOCIATION IDENTITY INFORMATION EDIT SECTION
  //EVENT CREATION & UPDATES & DELETES SECTION /////////////////////////////////////////////////////////

  ///////////START - GET ALL THE EVENTS ///////////////

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/events/getAllEvents"
        );
        const data = await response.json();

        if (data.organiser == token) {
          setEvents(data.events);
        }
      } catch (error) {
        console.error("Error during the fetch of events:", error);
      }
    };
    fetchEvents();
  }, []);

  ///////////END - GET ALL THE EVENTS///////////////

  ///////////START - SELECT THE EVENTS  ///////////////

  const [selectedRows, setSelectedRows] = useState([]);
  const handleCheckboxChange = (selectedEvent) => {
    const eventId = selectedEvent.target.value;
    console.log("eventID" + eventId);

    if (selectedEvent.target.checked) {
      // Add the line if selected
      setSelectedRows([...selectedRows, eventId]);
    } else {
      // Remove the line if not selected
      setSelectedRows(selectedRows.filter((id) => id !== eventId));
    }
  };
  console.log(selectedRows);
  ///////////END - SELECT THE EVENTS  ///////////////
  
  
  ///////////START - DELETE AN EXISTING EVENT ///////////////
  
  const handleDeleteEvent = () => {
    // ID of the lines
    const eventIdsToDelete = selectedRows && selectedRows.map((row) => row._id);
    console.log("eventIdsToDelete" + eventIdsToDelete);
    if (!selectedRows) {
      console.error("selectedRows is undefined");
      return;
    }
    
    // // Request of delete
    eventIdsToDelete.forEach((eventId) => {
      fetch(`/events/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: eventId, organiser: token }),
      })
      .then(() => {
        // Remove item
        setEvents(events.filter((event) => event._id !== eventId));
      })
      .catch((error) => {
        console.error("Error during the deletion of the event:", error);
      });
    });
  };
  
  ///////////END - DELETE AN EXISTING EVENT ///////////////
  
  ///////////START - CREATE A NEW EVENT ///////////////
  
  const handleCreateEvent = () => {
    // Modal for Event Creation
  };
  ///////////END - CREATE A NEW EVENT ///////////////

  ///////////START - TRUNCATE THE TEXT  ///////////////
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

  ///////////END - TRUNCATE THE TEXT  ///////////////
  ///////////START - SORT THE EVENTS TABLE ///////////////

  const [sortOrder, setSortOrder] = useState({});

  const handleSort = (column) => {
    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [column]: prevSortOrder[column] === "asc" ? "desc" : "asc", // Change the order type
    }));

    // Sort events
    const sortedEvents = [...events].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      // Sort dates
      if (
        column === "startDate" ||
        column === "endDate" ||
        column === "limitDate"
      ) {
        return new Date(valueA) - new Date(valueB);
      }

      // Sort texts
      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB);
      }

      // Sort numbers
      return valueA - valueB;
    });

    // Change sort order
    if (sortOrder[column] === "desc") {
      sortedEvents.reverse();
    }

    setEvents(sortedEvents);
  };
  ///////////END - SORT THE EVENTS TABLE ///////////////
  return (
    <div className={styles.adminMain}>
      {/* <div className={styles.identitySection}>
        <h1>Admin Association</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="photo">Association Photo:</label>
            <input type="file" id="photo" onChange={handlePhotoChange} />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Photo Preview"
                style={{ maxWidth: "200px" }}
              />
            )}
          </div>
          <div>
            <label htmlFor="name">Association Name:</label>
            {nameEditable ? (
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <span>{name}</span>
            )}
            <button onClick={() => setNameEditable(!nameEditable)}>
              {nameEditable ? "Cancel" : "Edit"}
            </button>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            {descriptionEditable ? (
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <span>{description}</span>
            )}
            <button
              onClick={() => setDescriptionEditable(!descriptionEditable)}
            >
              {descriptionEditable ? "Cancel" : "Edit"}
            </button>
          </div>
          <div>
            <label htmlFor="name">Association SIRET:</label>
            {nameEditable ? (
              <input
                type="text"
                id="siret"
                value={siret}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <span>{siret}</span>
            )}
            <button onClick={() => setSiretEditable(!siretEditable)}>
              {siretEditable ? "Cancel" : "Edit"}
            </button>
          </div>

          {(nameEditable || descriptionEditable || siretEditable) && (
            <button type="submit">Save Changes</button>
          )}
        </form>
      </div> */}
      <div className={styles.eventsSection}>
        <h1>Events</h1>
        <button className={styles.eventButton} onClick={handleCreateEvent}>
          Create
        </button>
        <button
          className={styles.eventButton}
          onClick={() => handleCloneEvent(event)}
        >
          Clone
        </button>
        <button
          className={styles.eventButton}
          onClick={() => handleEditEvent(event)}
        >
          Edit
        </button>
        <button
          className={styles.eventButton}
          onClick={() => handleDeleteEvent()}
        >
          Delete
        </button>
        <table className={styles.tableOfEvents}>
          <thead>
            <tr>
              <th></th>
              <th>Event Name</th>
              <th onClick={() => handleSort("startDate")}>
                Start Date
                {sortOrder.startDate === "asc" ? (
                  <FontAwesomeIcon
                    className={styles.eventSortIcon}
                    icon={faSortUp}
                  />
                ) : sortOrder.startDate === "desc" ? (
                  <FontAwesomeIcon
                    className={styles.eventSortIcon}
                    icon={faSortDown}
                  />
                ) : (
                  <FontAwesomeIcon
                    className={styles.eventSortIcon}
                    icon={faSort}
                  />
                )}
              </th>
              <th onClick={() => handleSort("endDate")}>
                End Date
                {sortOrder.endDate === "asc" ? (
                  <FontAwesomeIcon
                    className={styles.eventSortIcon}
                    icon={faSortUp}
                  />
                ) : sortOrder.endDate === "desc" ? (
                  <FontAwesomeIcon
                    className={styles.eventSortIcon}
                    icon={faSortDown}
                  />
                ) : (
                  <FontAwesomeIcon
                    className={styles.eventSortIcon}
                    icon={faSort}
                  />
                )}
              </th>
              <th onClick={() => handleSort("limitDate")}>
                Limit Date
                {sortOrder.limitDate === "asc" ? (
                  <FontAwesomeIcon
                    className={styles.eventSortIcon}
                    icon={faSortUp}
                  />
                ) : sortOrder.limitDate === "desc" ? (
                  <FontAwesomeIcon
                    className={styles.eventSortIcon}
                    icon={faSortDown}
                  />
                ) : (
                  <FontAwesomeIcon
                    className={styles.eventSortIcon}
                    icon={faSort}
                  />
                )}
              </th>
              <th>Description</th>
              <th>Event Address </th>
              <th>Event Zipcode</th>
              <th>Event City</th>
              <th>Event Status</th>
              <th>Event Categories</th>
              <th>Targeted Public</th>
              <th>Available Slots</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>
                  <input
                    type="checkbox"
                    value={event._id}
                    checked={selectedRows.includes(event._id)}
                    onChange={handleCheckboxChange}
                  />
                </td>
                <td>{truncateText(event.name, 40)}</td>
                <td>{new Date(event.startDate).toLocaleDateString("fr-FR")}</td>
                <td>{new Date(event.endDate).toLocaleDateString("fr-FR")}</td>
                <td>{new Date(event.limitDate).toLocaleDateString("fr-FR")}</td>
                <td>{truncateText(event.description, 40)}</td>
                <td>{event.address.street} </td>
                <td>{event.address.zipcode} </td>
                <td>{event.address.city} </td>
                <td>{event.status}</td>
                <td>{event.categories.join(", ")}</td>
                <td>{event.target.join(", ")}</td>
                <td>{event.slotsAvailable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminAssociation;
