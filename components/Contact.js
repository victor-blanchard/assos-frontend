import React, { useState, useEffect } from "react";
import * as emailjs from "emailjs-com";
import styles from "../styles/Contact.module.css";


function Contact() {
   

   useEffect(() => {
      emailjs.init({
        publicKey: "VJDA6kgRI7pMWQtp7", // EmailJS Public Key
      });
    }, []);

    const initialFormState = {
        name: "",
        email: "",
        message: "",
    };

    const [contactData, setContactData] = useState({ ...initialFormState });

    const handleChange = ({ target }) => {
        setContactData({
            ...contactData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_vcekf98",
                "template_3h6k34a",
                e.target,
                "VJDA6kgRI7pMWQtp7", 
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                },
            );

        //reset the form after submission
        setContactData({ ...initialFormState });
    };

    return (
        <div className={styles.All}>
            <div className="col-md-6 col-md">
                <h2>Contact</h2>
                <p>L'équipe La Sauce est à votre entière disposition ! </p>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.subRow}>
                            <label htmlFor="name">Votre nom</label>
                            <input
                                type="text"
                                className={styles.formControl}
                                name="name"
                                value={contactData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.subRow}>
                            <label htmlFor="email">Votre email</label>
                            <input
                                type="email"
                                className={styles.formControl}
                                name="email"
                                value={contactData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                   
                    
                        <div className={styles.subRow}>
                            <label htmlFor="message">Votre message</label>
                            <textarea
                                 className={styles.formControl}
                                type="text"
                                name="message"
                                maxLength="6000"
                                rows="7"
                                value={contactData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.subRow}>
                            <button type="submit" className={styles.button}>
                                Envoyer
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;