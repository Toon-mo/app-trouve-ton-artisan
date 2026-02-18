import React, { useEffect, useState } from "react";
import useDocumentHead from "../hooks/useDocumentHead";
import Navigation from "../components/Navigation";
import Image1 from "../assets/images/Atelier.jpg";
import MenuCard from "../components/MenuCard";
import Footer from "../components/Footer";
import "../styles/components/_menuCard.scss";
import "../styles/HomePage.scss";

const API_URL = "https://api-trouve-ton-artisan.onrender.com";

const HomePage = () => {
  const [topArtisans, setTopArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopArtisans = async () => {
      try {
        const response = await fetch(`${API_URL}/api/artisans/top`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        setTopArtisans(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error(
          "Erreur lors de la récupération des artisans du mois :",
          err
        );
      }
    };
    fetchTopArtisans();
  }, []);

  // Hook, définit le titre et la méta-description
  useDocumentHead(
    "Accueil | Trouve ton artisan !",
    "Partez à la rencontre des artisans d’excellence en Auvergne-Rhône-Alpes. Choisissez votre professionnel parmi les catégories bâtiment, services, fabrication ou alimentation."
  );

  if (loading)
    return (
      <p className="text-center mt-5">Chargement des artisans du mois...</p>
    );
  if (error)
    return (
      <p className="text-center mt-5 text-color5">Erreur: {error.message}</p>
    );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <div className="main flex-grow-1">
        <h1 className="text-center fw-bold fs-1 text-color3 mt-5 mb-5">
          Comment trouver mon artisan ?
        </h1>
        <div className="d-flex flex-row justify-content-center">
          <div className="container-img">
            <img
              src={Image1}
              className="img-fluid br-10"
              alt="Atelier d'artisanat"
            ></img>
          </div>
          <p className="text-start text-color4 mt-5 mb-5 description">
            1. Choisir la catégorie d’artisanat dans le menu. <br />
            2. Choisir un artisan. <br />
            3. Le contacter via le formulaire de contact. <br />
            4. Une réponse sera apportée sous 48h.
          </p>
        </div>
        <div className="main-separation text-color5"></div>
        <h2 className="text-center fw-bold fs-3 text-color2 mt-2 mb-5">
          Les trois artisans du mois
        </h2>

        <div className="container">
          <div className="artisan row justify-content-between">
            {topArtisans.length > 0 ? (
              topArtisans.map((artisan) => (
                <div
                  className="col-12 col-xl-4 mb-4 d-flex justify-content-center"
                  key={artisan.id_artisan}
                >
                  <MenuCard artisan={artisan} />
                </div>
              ))
            ) : (
              <p className="text-center">Aucun artisan du mois trouvé.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
