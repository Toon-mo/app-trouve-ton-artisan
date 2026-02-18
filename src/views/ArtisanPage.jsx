import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDocumentHead from "../hooks/useDocumentHead";
import Navigation from "../components/Navigation";
import ArtisanCard from "../components/ArtisanCard";
import Footer from "../components/Footer";
import "../styles/_settings.scss";
import "../styles/components/_artisanCard.scss";

const API_URL = "https://api-trouve-ton-artisan.onrender.com";

const ArtisanPage = () => {
  const { artisanId } = useParams();
  const [artisan, setArtisan] = useState(null); // Stock les détails de l'artisan
  const [loading, setLoading] = useState(true); // Gère l'état de chargement
  const [error, setError] = useState(null); // Gére les erreurs

  useEffect(() => {
    const fetchArtisanDetails = async () => {
      setLoading(true);
      setError(null); // Réinitialise l'erreur à chaque nouvelle tentative de récupération
      try {
        const response = await fetch(`${API_URL}/api/artisans/${artisanId}`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        setArtisan(data); // Met à jour l'état avec les données de l'artisan
      } catch (err) {
        setError(err);
        console.error(
          "Erreur lors de la récupération des détails de l'artisan :",
          err
        );
      } finally {
        setLoading(false); // Indique que le chargement est terminé, qu'il y ait eu succès ou échec
      }
    };

    if (artisanId) {
      // S'assure qu'un ID est disponible avant de faire l'appel API
      fetchArtisanDetails();
    } else {
      setLoading(false); // Pas d'ID, pas besoin de charger
      setError(new Error("Aucun ID d'artisan fourni."));
    }
  }, [artisanId]); // L'effet se re-déclenche si artisanId change dans l'URL

  // Logic pour déterminer le titre de la catégorie
  const categoryTitle = artisan?.specialite?.categorie?.nom_categorie; // Accès sécurisé aux propriétés (artisans si la propriété existe , puis spécialité .....)

  // Titre et méta-description pour le hook
  const pageTitle = artisan?.nom_artisan
    ? `Fiche de l'artisan ${artisan.nom_artisan} de la catégorie ${
        categoryTitle || "artisanat"
      } | Trouve ton artisan !`
    : `Fiche de l'artisan | Trouve ton artisan !`;

  const metaDescriptionContent = loading
    ? "Chargement des informations de l'artisan..."
    : artisan
    ? `Découvrez ${artisan.nom_artisan}, ${artisan.specialite?.nom_specialite} à ${artisan.ville}.`
    : "Artisan non trouvé. Explorez la liste d'artisans.";

  // Hook, définit le titre et la méta-description
  useDocumentHead(pageTitle, metaDescriptionContent);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <div className="main flex-grow-1 mainArtisan">
        <h1 className="text-center fw-bold fs-1 text-color3 mt-5 mb-5">
          {
            loading
              ? "Chargement..." // Message si la page est en cours de chargement
              : error
              ? `Erreur : ${error.message}` // Message si une erreur est survenue
              : categoryTitle // Si la catégorie est trouvée
              ? `Catégorie : ${categoryTitle}` // Affiche le titre de la catégorie
              : "Artisan non trouvé" // Si pas d'artisan ni de catégorie après chargement
          }
        </h1>
        <div className="main-separation mb-5 w-25 text-color5"></div>
        <ArtisanCard artisanId={artisanId} />{" "}
      </div>
      <Footer />
    </div>
  );
};

export default ArtisanPage;
