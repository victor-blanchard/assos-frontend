import Link from "next/link";
import styles from "../styles/AdminAssociation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState, useEffect } from "react";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNameEditable(true);
    setDescriptionEditable(true);
  };

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

  return (
    <div>
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
          <button onClick={() => setDescriptionEditable(!descriptionEditable)}>
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
    </div>
  );
}

export default AdminAssociation;
