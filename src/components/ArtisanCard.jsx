import React, { useEffect, useState } from "react";
import Formulaire from "./Formulaire";
import ImageCard from "./ImageCard";
import StarRating from "./StarRating";
import "../styles/components/_artisanCard.scss";
import "../styles/components/_formulaire.scss";

const API_URL = "https://api-trouve-ton-artisan.onrender.com";


const ArtisanCard = ({ artisanId }) => {
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchArtisan = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/api/artisans/${artisanId}`);
        if (!res.ok)
          throw new Error("Erreur lors de la récupération de l'artisan");
        const data = await res.json();
        setArtisan(data);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (artisanId) fetchArtisan();
  }, [artisanId]);

  const toggleForm = () => setShowForm((prev) => !prev);

  if (loading) return <p>Chargement de l'artisan...</p>;
  if (error) return <p className="text-color5">Erreur: {error.message}</p>;
  if (!artisan) return <p>Artisan non trouvé.</p>;

  return (
    <div className="container mt-5 artisanCard">
      <div className="container d-flex flex-column text-center mx-auto bg-custom border-0 mt-3 mb-3">
        <div className="card-title text-color6 mt-4 fw-bold">
          <h2>{artisan.nom_artisan}</h2>
        </div>

        <div
          className="d-flex flex-row justify-content-center align-items-start p-3"
          id="mainArtisanCard"
        >
          <div className="imgCard-flex mb-3 mb-lg-0 me-lg-4 text-center">
            <ImageCard
              specialite={artisan.specialite?.nom_specialite}
              size="large"
            />

            {artisan.site_web && (
              <div className="mt-2">
                <a
                  href={artisan.site_web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link text-decoration-none"
                >
                  Visitez notre site
                </a>
              </div>
            )}

            <div className="mt-2">
              <StarRating note={artisan.note ?? 0} />
            </div>
          </div>

          <div className="text-start flex-grow-1 ms-lg-0 ms-xl-5">
            <div className="localisation text-color2 my-2">Localisation :</div>
            <p className="text-color4">{artisan.ville}</p>

            <div className="specialite text-color2 mt-2">Spécialité :</div>
            <p className="text-color4">{artisan.specialite?.nom_specialite}</p>

            <div className="aPropos text-color2 mt-2">À propos :</div>
            <p className="text-color4">{artisan.a_propos}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            className="btn bg-custom-1"
            onClick={toggleForm}
          >
            {showForm ? "Fermer le formulaire" : "Prendre contact"}
          </button>
        </div>

        {showForm && (
          <div className="formContainer">
            <Formulaire artisanId={artisan.id_artisan} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisanCard;
