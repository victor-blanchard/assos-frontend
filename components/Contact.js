import React, { useState, useEffect } from "react";
import * as emailjs from "emailjs-com";

function Contact() {

   useEffect(() => {
      emailjs.init({
        publicKey: "VJDA6kgRI7pMWQtp7", // EmailJS Public Key'inizi buraya girin
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
        <div className="row m-5">
            <div className="col-md-6 col-md">
                <h2>Contact</h2>
                <p>Contact us!</p>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-sm-6 form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={contactData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-sm-6 form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={contactData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <label htmlFor="message">Message:</label>
                            <textarea
                                className="form-control"
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
                    <div className="row mt-2">
                        <div className="col-sm-12 form-group">
                            <button type="submit" className="btn btn-primary">
                                Send
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;