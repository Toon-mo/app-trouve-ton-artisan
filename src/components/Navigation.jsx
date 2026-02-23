import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import "../styles/components/_navigation.scss";
import logoImg from "../assets/images/Logo.png";
import searchIcon from "../assets/images/SearchIcon.png";

const API_URL = "https://api-trouve-ton-artisan.onrender.com";

const slugify = (str) =>
  str
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // enlève accents
    .toLowerCase()
    .replace(/\s+/g, "-"); // espaces → tirets


const Navigation = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/categories`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/artisans?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg shadow bg-custom">
      {/* Logo */}
      <Link className="navbar-brand order-0" to="/">
        <img
          className="img-fluid"
          src={logoImg}
          alt="Logo"
          width="295"
          height="166"
        />
      </Link>

      {/* Bouton hamburger */}
      <div className="menuHamburger order-3">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="text-toggler">Menu</div>
      </div>

      <div className="collapse navbar-collapse order-1" id="navbarText">
        <ul className="navbar-nav mb-2 mb-lg-0">
          {categories.map((cat) => {
            return (
              <li className="nav-item ms-0" key={cat.id_categorie}>
                <NavLink to={`/categorie/${cat.slug}`} className="nav-link">
                  {cat.nom_categorie}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Barre de recherche */}
      <div className="desktop-search-form order-2 me-2">
        <form
          className="formSearch d-flex flex-row "
          role="search"
          onSubmit={handleSearch}
        >
          <input
            className="form-control"
            type="search"
            placeholder="Entrez le nom de l’artisan"
            aria-label="Search"
            id="deskTopSearchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            className="imgSearch btnSearch me-2"
            src={searchIcon}
            alt="Rechercher"
          />
        </form>
      </div>

      {/* Bouton alternatif pour petits écrans */}
      <button
        className="btn btn-search ms-auto me-2 order-1 d-block d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mobileSearchCollapse"
        aria-controls="mobileSearchCollapse"
        aria-expanded="false"
        aria-label="Toggle search"
        id="btnSearch2"
      >
        <img
          className="img"
          src={searchIcon}
          alt="Rechercher"
          id="imgBtnSearch2"
          width="27"
          height="28"
        />
      </button>

      <div
        className="mobile-search-collapse collapse"
        id="mobileSearchCollapse"
      >
        <form className="d-flex" role="search" onSubmit={handleSearch}>
          <input
            className="form-control"
            type="search"
            placeholder="Entrez le nom de l’artisan souhaité"
            aria-label="Search"
            id="mobileSearchInputForm" // ID spécifique pour l'input mobile
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
};

export default Navigation;
