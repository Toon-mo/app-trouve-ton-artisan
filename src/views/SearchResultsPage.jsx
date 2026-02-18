import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDocumentHead from "../hooks/useDocumentHead";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import "../styles/_settings.scss";

// Récupère l'URL de l'API depuis les variables d'environnement
const API_URL = "https://api-trouve-ton-artisan.onrender.com";

// Composant pour la page des résultats de recherche
const SearchResultsPage = () => {
  // Récupère les paramètres de recherche de l'URL
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search"); // Extrait la valeur du paramètre 'search'

  // États pour stocker les artisans trouvés, l'état de chargement et les erreurs
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true); // Vrai pendant le chargement des données
  const [error, setError] = useState(null); // Stocke les messages d'erreur si la récupération échoue

  // Effet de bord exécuté au montage du composant ou quand 'searchTerm' change
  useEffect(() => {
    // Fonction asynchrone pour récupérer les résultats de recherche
    const fetchSearchResults = async () => {
      // Si aucun terme de recherche n'est fourni, ne fait rien et termine le chargement
      if (!searchTerm) {
        setArtisans([]);
        setLoading(false);
        return;
      }

      setLoading(true); // Active l'état de chargement
      setError(null); // Réinitialise les erreurs précédentes
      try {
        // Requête GET à l'API pour rechercher des artisans par nom
        const response = await fetch(
          `${API_URL}/api/artisans?search=${encodeURIComponent(searchTerm)}`
        );
        // Vérifie si la réponse HTTP
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`); // Si la requête échoue, envoie une erreur
        }
        const data = await response.json();
        setArtisans(data);
      } catch (err) {
        setError(err); // Stocke l'erreur en cas d'échec
        console.error(
          "Erreur lors de la récupération des résultats de recherche :",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults(); // Appelle la fonction
  }, [searchTerm]);

  // Hook, définit le titre et la méta-description
  useDocumentHead(
    `Résultat de la recherche ${searchTerm} | Trouve ton artisan !`,
    "Résultats de recherche correspondant à vos critères."
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <div className="main flex-grow-1">
        <h1 className="text-center fw-bold fs-1 text-color3 mt-5 mb-5">
          Résultats de recherche pour "{searchTerm}"
        </h1>
        <div className="main-separation text-color5"></div>

        <div className="container MainPage">
          <div className="row justify-content-center">
            {loading ? (
              <p className="text-center">Chargement des résultats...</p>
            ) : error ? (
              <p className="text-center text-color5">Erreur: {error.message}</p>
            ) : artisans.length > 0 ? (
              artisans.map((artisan) => (
                <div
                  className="col-12 col-xl-6 mb-4 d-flex justify-content-center"
                  key={artisan.id_artisan}
                >
                  <Cards artisan={artisan} />
                </div>
              ))
            ) : (
              <p className="text-center">
                Aucun artisan trouvé pour "{searchTerm}".
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
