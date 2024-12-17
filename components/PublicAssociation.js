import Link from "next/link";
import styles from "../styles/PublicAssociation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "antd/lib";
import {
  faHeart,
  faShare,
  faBookmark,
  faSort,
  faSortUp,
  faSortDown,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PublicAssociation() {
  const [association, setAssociation] = useState(null);
  const [editingAsso, setEditingAsso] = useState(null);
  const [name, setName] = useState(association?.name);
  const [nameEditable, setNameEditable] = useState(false);
  const [siret, setSiret] = useState(association?.siret);
  const [siretEditable, setSiretEditable] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [description, setDescription] = useState(association?.description);
  const [descriptionEditable, setDescriptionEditable] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [editingEvent, setEditingEvent] = useState(null);
  const categoriesOptions = [
    { label: "Aide à la personne", value: "Aide à la personne" },
    { label: "Sport", value: "Sport" },
    { label: "Santé", value: "Santé" },
    { label: "Enfant", value: "Enfant" },
    { label: "Solidarité", value: "Solidarité" },
    { label: "Art & Culture", value: "Art & Culture" },
    { label: "Education", value: "Education" },
    { label: "Animaux", value: "Animaux" },
  ];

  const publicOptions = [
    { label: "Adulte", value: "Adulte" },
    { label: "Ado", value: "Ado" },
    { label: "Enfant", value: "Enfant" },
    { label: "Senior", value: "Senior" },
  ];

  const [categories, setCategories] = useState("");
  const [target, setTarget] = useState("");

  ///START - ASSOCIATION IDENTITY INFORMATION EDIT SECTION

  ///START - GET THE ASSOCIATION DATA ////

  const token = "HW0ZerJu5ADHWreXP_FQDVBvLebMToZH";
  const id = "675c14923937bbd6164bd305";

  const fetchAssociation = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/associations/getasso/${id}`
      );
      const data = await response.json();

      setAssociation(data.association);
    } catch (error) {
      console.error("Error during the fetch of association:", error);
    }
  };

  useEffect(() => {
    fetchAssociation();
  }, [id]);

  //// END - GET THE ASSOCIATION DATA ////

  ////// START - EDIT THE ASSOCIATION DATA ////

  const handleSubmitAsso = async (event) => {
    event.preventDefault();

    try {
      console.log(
        "Sending PUT request to:",
        `http://localhost:3000/associations/update/${id}`
      );
      console.log("Request body:", { id: id, name: name, token: token });

      const response = await fetch(
        `http://localhost:3000/associations/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            name: name,
            description: description,
            siret: siret,
            token: token,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Asso updated:", data);
      } else {
        const errorData = await response.json();
        console.error("Failed to update asso:", errorData.error);
      }
    } catch (error) {
      console.error("Error updating asso:", error);
    }

    // setNameEditable(false);
    // // setDescriptionEditable(true);
    // // setSiretEditable(true);
        
    setEditingAsso(false);
 
  };

  ////// END - EDIT THE ASSOCIATION DATA ////

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhotoFile(file);

    // Create a preview of photo
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  //END - ASSOCIATION IDENTITY INFORMATION EDIT SECTION
  //EVENT CREATION & UPDATES & DELETES SECTION /////////////////////////////////////////////////////////

  ///////////START - GET ALL THE EVENTS ///////////////
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/getAllEvents?id=${id}`
      );
      const data = await response.json();

      setEvents(data.events);
    } catch (error) {
      console.error("Error during the fetch of events:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  ///////////END - GET ALL THE EVENTS///////////////

  ///////////START - DELETE AN EXISTING EVENT ///////////////

  const handleDeleteEvent = (token, _id) => {
    fetch("http://localhost:3000/events/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token, _id: _id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Event not deleted!");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.error);
        console.log(data.result);
        setEvents(events.filter((event) => event._id !== _id)); // Update state here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  ///////////END - DELETE AN EXISTING EVENT ///////////////

  ///////////START - CREATE A NEW EVENT ///////////////

  const handleCreateEvent = () => {
    setShowModal(true); // Show the modal
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event); // add event to the state
    setShowModal(true); // Open modal
  };
  const handleSubmitEditEvent = async (event) => {
    // handleSubmitEditEvent definition
    event.preventDefault();

    // Collect info
    const updatedEvent = {
      _id: editingEvent._id,
      name: event.target.eventName.value,
      description: event.target.eventDescription.value,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
      limitDate: event.target.limitDate.value,
      city: event.target.city.value,
      street: event.target.street.value,
      zipcode: event.target.zipcode.value,
      status: event.target.status.value,
      slotsAvailable: event.target.slotsAvailable.value,
      categories: categories,
      target: target,
    };
    console.log("updatedEvent:", updatedEvent);
    console.log("event.target.eventName.value:", event.target.eventName.value);
    try {
      console.log(
        "Sending PUT request to:",
        `http://localhost:3000/events/update/${editingEvent._id}`
      );
      console.log("Request body:", {
        token: token,
        event: updatedEvent,
      });
      const response = await fetch(
        `http://localhost:3000/events/update/${editingEvent._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: token,
            ...updatedEvent,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Event updated:", data);
        fetchEvents();
        handleCloseModal();
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleSubmitEvent = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get form data (replace with your actual form fields)
    const eventName = event.target.eventName.value;
    const eventDescription = event.target.eventDescription.value;
    const startDate = event.target.startDate.value;
    const endDate = event.target.endDate.value;
    const limitDate = event.target.limitDate.value;
    const city = event.target.city.value;
    const street = event.target.street.value;
    const zipcode = event.target.zipcode.value;
    const status = event.target.status.value;
    const slotsAvailable = event.target.slotsAvailable.value;

    try {
      const response = await fetch("http://localhost:3000/events/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          name: eventName,
          startDate: startDate,
          description: eventDescription,
          limitDate: limitDate,
          endDate: endDate,
          organiser: id,
          street: street,
          zipcode: zipcode,
          city: city,
          status: status,
          target: target,
          categories: categories,
          slotsAvailable: slotsAvailable,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Event created:", data);
        fetchEvents(); // Re-fetch events to update the list
        handleCloseModal(); // Close the modal
      } else {
        console.error("Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
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
      <div className={styles.identitySection}>
        <form onSubmit={handleSubmitAsso}>
          <div>
            
              <img
                src={photoPreview}
                alt="Photo Preview"
                style={{ maxWidth: "200px" }}
              />
        
          </div>
          <div>
            <h1 htmlFor="name">{association?.name}</h1>
            {nameEditable ? (
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                defaultValue={association?.name}
              />
            ) : (
              <span>{name}</span>
            )}  
       
          </div>
          <div>
            <label htmlFor="description">{association?.description}</label>
            {descriptionEditable ? (
              <textarea
                id="description"
                defaultValue={association?.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <span>{description}</span>
            )}
            
          </div>
          <div>
            <label htmlFor="name">{association?.siret}</label>
            {siretEditable ? (
              <input
                type="text"
                id="siret"
                defaultValue={association?.siret}
                onChange={(e) => setSiret(e.target.value)}
              />
            ) : (
              <span>{siret}</span>
            )}
           
          </div>

          
        </form>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{editingEvent ? "Edit Event" : "Create New Event"}</h2>
            <form
              onSubmit={
                editingEvent ? handleSubmitEditEvent : handleSubmitEvent
              }
            >
              <div>
                <label htmlFor="eventName">Name:</label>
             
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  defaultValue={editingEvent ? editingEvent.name : ""}
                  required
                />
              </div>
              <div>
                <label htmlFor="eventDescription">Description:</label>
                <input
                  type="text"
                  id="eventDescription"
                  name="eventDescription"
                  defaultValue={editingEvent ? editingEvent.description : ""}
                  required
                />
              </div>
              <div>
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  defaultValue={
                    editingEvent
                      ? new Date(editingEvent.startDate)
                          .toISOString()
                          .slice(0, 10)
                      : ""
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  defaultValue={
                    editingEvent
                      ? new Date(editingEvent.endDate)
                          .toISOString()
                          .slice(0, 10)
                      : ""
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="limitDate">Limit Date:</label>
                <input
                  type="date"
                  id="limitDate"
                  name="limitDate"
                  defaultValue={
                    editingEvent
                      ? new Date(editingEvent.limitDate)
                          .toISOString()
                          .slice(0, 10)
                      : ""
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={editingEvent ? editingEvent.address.city : ""}
                  required
                />
              </div>
              <div>
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  defaultValue={editingEvent ? editingEvent.address.street : ""}
                  required
                />
              </div>
              <div>
                <label htmlFor="zipcode">Zipcode</label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  defaultValue={
                    editingEvent ? editingEvent.address.zipcode : ""
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  defaultValue={editingEvent ? editingEvent.status : ""}
                  required
                />
              </div>
              <Select
                className={styles.filterbox}
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Categories"
                value={editingEvent ? editingEvent.categories : []}
                options={categoriesOptions}
                onChange={(value) => setCategories(value.join(","))}
              />
              <Select
                className={styles.filterbox}
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Public visé"
                value={editingEvent ? editingEvent.target : []}
                options={publicOptions}
                onChange={(value) => setTarget(value.join(","))}
              />
              <div>
                <label htmlFor="slotsAvailable">Slots</label>
                <input
                  type="text"
                  id="slotsAvailable"
                  name="slotsAvailable"
                  defaultValue={editingEvent ? editingEvent.slotsAvailable : ""}
                  required
                />
              </div>
           
            </form>
          </div>
        </div>
      )}

      <div className={styles.eventsSection}>
        <div className={styles.eventsAndLove}>
        <h1>Events</h1>
        <FontAwesomeIcon
                    className={styles.assoLoveIcon}
                    icon={faHeart}
                
                  />
      
      </div>

        <table className={styles.tableOfEvents}>
          <thead>
            <tr>
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

export default PublicAssociation;