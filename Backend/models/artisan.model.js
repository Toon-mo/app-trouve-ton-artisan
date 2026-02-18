// Import des types de données Sequelize
const { DataTypes } = require("sequelize");
// Import de la connexion à la base de données
const { sequelize } = require("../config/db");

// Définition du modèle Artisan
const Artisan = sequelize.define(
  "Artisan", // Nom du modèle
  {
    // ID unique de l'artisan
    id_artisan: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Clé primaire pour rendre la colonne unique
      autoIncrement: true, // Incrémente à chaque nouvelle entrée
      field: "id_artisan", // Nom de la colonne dans la table
    },
    // Nom de l'artisan
    nom_artisan: {
      type: DataTypes.STRING(50), // Texte de 50 caractères max
      allowNull: false, // Champ obligatoire
      field: "nom_artisan", // Nom de la colonne dans la table
    },
    // Note de l'artisan (ex: 4.5/5)
    note: {
      type: DataTypes.DECIMAL(5, 1), // Nombre décimal avec 1 chiffre après la virgule
      allowNull: false, // Champ obligatoire
      field: "note", // Nom de la colonne dans la table
    },
    // Ville où travaille l'artisan
    ville: {
      type: DataTypes.STRING(50), // Texte de 50 caractères max
      allowNull: false, // Champ obligatoire
      field: "ville", // Nom de la colonne dans la table
    },
    // Description de l'artisan
    a_propos: {
      type: DataTypes.TEXT, // Texte long
      allowNull: false, // Champ obligatoire
      field: "a_propos", // Nom de la colonne dans la table
    },
    // Email de contact
    email: {
      type: DataTypes.STRING(50), // Texte de 50 caractères max
      allowNull: false, // Champ obligatoire
      field: "email", // Nom de la colonne dans la table
    },
    // Site web (optionnel)
    site_web: {
      type: DataTypes.STRING(50), // Texte de 50 caractères max
      allowNull: true, // Champ optionnel
      field: "site_web", // Nom de la colonne dans la table
    },
    // Indique si l'artisan est dans le top 3 du mois
    top: {
      type: DataTypes.BOOLEAN(1), // Booléen (0 ou 1)
      allowNull: false, // Champ obligatoire
      defaultValue: 0, // Par défaut pas dans le top
      field: "top", // Nom de la colonne dans la table
    },
    // ID de la spécialité de l'artisan
    id_specialite: {
      type: DataTypes.INTEGER, // Nombre entier
      allowNull: false, // Champ obligatoire
      field: "id_specialite", // Nom de la colonne dans la table
    },
  },
  {
    tableName: "tab_artisan", // Nom de la table dans la base
    timestamps: false, // Pas de colonnes created_at/updated_at
  }
);

// Export du modèle pour l'utiliser ailleurs
module.exports = Artisan;
