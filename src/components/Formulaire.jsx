import React, { useState } from "react";
import ValidationCard from "./ValidationCard";
import "../styles/_settings.scss";
import "../styles/components/_validationCard.scss";

const API_URL = "https://api-trouve-ton-artisan.onrender.com";

const Formulaire = ({ artisanId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [objet, setObjet] = useState("");
  const [message, setMessage] = useState("");
  const [showValidationCard, setShowValidationCard] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleObjetChange = (e) => setObjet(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !objet || !message || !artisanId) {
      setFormError(
        "Veuillez remplir tous les champs et l'ID de l'artisan est manquant.",
      );
      return;
    }
    setFormError(null); // Réinitialise l'erreur

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject: objet,
          message,
          artisanId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      setShowValidationCard(true);

      setName("");
      setEmail("");
      setObjet("");
      setMessage("");

      setTimeout(() => setShowValidationCard(false), 3000);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setFormError(`Échec de l'envoi du message : ${error.message}`);
    }
  };

  return (
    <div className="form" id="formContainer">
      <form onSubmit={handleSubmit}>
        {formError && <div className="alert alert-danger">{formError}</div>}{" "}
        {/* Affiche les erreurs */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nom
          </label>
          <input
            type="text"
            className="message-input"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Veuillez entrer votre nom"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="message-input"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Veuillez entrer votre adresse mail"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="objet" className="form-label">
            Objet
          </label>
          <input
            type="text"
            className="message-input"
            id="objet"
            value={objet}
            onChange={handleObjetChange}
            placeholder="Quel est l'objet de votre message ?"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            className="message-textarea"
            placeholder="Veuillez entrer votre message"
            value={message}
            onChange={handleMessageChange}
            rows="4"
            id="message"
          ></textarea>
        </div>
        <button type="submit" className="btn bg-custom-1">
          Envoyer
        </button>
      </form>
      {showValidationCard && <ValidationCard />}{" "}
      {/* Affiche la carte de validation */}
    </div>
  );
};

export default Formulaire;
