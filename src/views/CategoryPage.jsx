import React, { useEffect, useState } from "react";
import useDocumentHead from "../hooks/useDocumentHead";
import { useParams, useLocation } from "react-router-dom"; // useLocation pour les params de recherche
import Navigation from "../components/Navigation";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import "../styles/_settings.scss";

const API_URL = "https://api-trouve-ton-artisan.onrender.com";

const CategoryPage = () => {
  const { categoryName } = useParams(); // Récupère le nom de la catégorie depuis l'URL (ex: /batiment)
  const location = useLocation(); // Récupère l'objet location pour les query params (ex: ?search=...)

  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageMainTitle, setPageMainTitle] = useState("Nos artisans"); // Titre principal affiché dans le <h1>

  useEffect(() => {
    const fetchArtisans = async () => {
      setLoading(true);
      setError(null);
      setArtisans([]); // Réinitialise la liste des artisans à chaque nouveau chargement

      let apiUrl = `${API_URL}/api/artisans`; // URL de l'API par défaut pour tous les artisans
      let calculatedPageMainTitle = "Nos artisans"; // Titre temporaire pour le <h1>

      try {
        if (categoryName) {
          // recherche par catégorie
          const catRes = await fetch(
            `${API_URL}/api/categories/name?name=${encodeURIComponent(
              categoryName
            )}`
          );

          if (!catRes.ok) {
            const errorData = await catRes.json();
            const errorMessage =
              errorData.error || `Catégorie "${categoryName}" introuvable.`;
            setError(new Error(errorMessage));
            calculatedPageMainTitle = errorMessage;
            setLoading(false);
            setPageMainTitle(calculatedPageMainTitle);

            return;
          }

          const category = await catRes.json();
          if (!category) {
            const errorMessage = `Catégorie "${categoryName}" introuvable.`;
            setError(new Error(errorMessage));
            calculatedPageMainTitle = errorMessage;
            setPageMainTitle(calculatedPageMainTitle);

            return;
          }

          calculatedPageMainTitle = `Nos artisans - ${category.nom_categorie}`;
          apiUrl = `${API_URL}/api/artisans?categoryId=${category.id_categorie}`;
        } else {
          // Si la route est de type /artisans?search=...
          const searchParams = new URLSearchParams(location.search);
          const searchTerm = searchParams.get("search");

          if (searchTerm) {
            calculatedPageMainTitle = `Résultats de recherche pour "${searchTerm}"`;
            apiUrl = `${API_URL}/api/artisans?search=${encodeURIComponent(
              searchTerm
            )}`;
          } else {
            // Si ni catégorie ni terme de recherche (ex: /artisans sans query param)
            calculatedPageMainTitle = "Tous nos artisans";
          }
        }

        // Exécute la requête API pour les artisans une fois l'apiUrl déterminée
        const artisansRes = await fetch(apiUrl);
        if (!artisansRes.ok) {
          const errorData = await artisansRes.json();
          const errorMessage =
            errorData.message || "Erreur lors de la récupération des artisans";
          throw new Error(errorMessage);
        }

        const artisansData = await artisansRes.json();
        setArtisans(artisansData);
      } catch (err) {
        console.error("Erreur lors du chargement des artisans:", err);
        setError(err);
        setArtisans([]); // Vide la liste des artisans en cas d'erreur
        // Ajuste le titre si une erreur est survenue et qu'il n'y a pas déjà un message d'erreur spécifique
        if (
          !calculatedPageMainTitle.includes("introuvable") &&
          !calculatedPageMainTitle.includes("Erreur")
        ) {
          calculatedPageMainTitle = `Erreur: ${err.message}`;
        }
      } finally {
        setLoading(false);
        setPageMainTitle(calculatedPageMainTitle); // Met à jour le titre final
      }
    };

    fetchArtisans();
  }, [categoryName, location.search]);

  useEffect(() => {
    console.log("🔄 Changement détecté:", {
      categoryName,
      pageMainTitle,
      location: location.pathname + location.search,
    });
  }, [categoryName, pageMainTitle, location]);

  // Hook, définit le titre et la méta-description
  useDocumentHead(
    `${pageMainTitle}| Trouve ton artisan !`,
    `Partez à la rencontre des artisans de la catégorie ${categoryName}.`
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <div className="main flex-grow-1">
        <h1 className="text-center fw-bold fs-1 text-color3 mt-2 mb-5">
          {pageMainTitle}
        </h1>
        <div className="main-separation text-color5"></div>

        <div className="container MainPage">
          <div className="row justify-content-center">
            {loading ? (
              <p className="text-center">Chargement des artisans...</p>
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
              // Ce message apparaîtra si aucun artisan n'est trouvé ou si une erreur a effacé la liste
              <p className="text-center">
                {pageMainTitle.includes("introuvable") ||
                pageMainTitle.includes("Erreur")
                  ? "Aucun artisan trouvé ou une erreur est survenue."
                  : "Aucun artisan trouvé pour cette catégorie ou recherche."}
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
