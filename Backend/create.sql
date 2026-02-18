-- Désactive temporairement les triggers
SET session_replication_role = 'replica';

-- Suppression des tables dans l'ordre inverse des dépendances
DROP TABLE IF EXISTS "tab_artisan";
DROP TABLE IF EXISTS "tab_specialite";
DROP TABLE IF EXISTS "tab_categorie";

--
-- Création de la table des catégories
--
CREATE TABLE "tab_categorie" (
  "id_categorie" SERIAL PRIMARY KEY,
  "categorie"    VARCHAR(50) NOT NULL
);

--
-- Création de la table des spécialités
--
CREATE TABLE "tab_specialite" (
  "id_specialite" SERIAL PRIMARY KEY,
  "specialite"    VARCHAR(50) NOT NULL,
  "id_categorie"  INTEGER NOT NULL,
  CONSTRAINT "fk_specialite_categorie"
    FOREIGN KEY ("id_categorie") REFERENCES "tab_categorie" ("id_categorie")
    ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "idx_id_categorie_specialite" ON "tab_specialite" ("id_categorie");

--
-- Création de la table des artisans
--
CREATE TABLE "tab_artisan" (
  "id_artisan"   SERIAL PRIMARY KEY,
  "nom_artisan"  VARCHAR(50)    NOT NULL UNIQUE,
  "note"         DECIMAL(5,1)   NOT NULL,
  "ville"        VARCHAR(50)    NOT NULL,
  "a_propos"     TEXT           NOT NULL,
  "email"        VARCHAR(50)    NOT NULL UNIQUE,
  "site_web"     VARCHAR(100)   DEFAULT NULL,
  "top"          BOOLEAN        NOT NULL DEFAULT false,
  "id_specialite" INTEGER       NOT NULL,
  CONSTRAINT "fk_artisan_specialite"
    FOREIGN KEY ("id_specialite") REFERENCES "tab_specialite" ("id_specialite")
    ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "idx_id_specialite_artisan" ON "tab_artisan" ("id_specialite");

-- Réactive les triggers
SET session_replication_role = 'origin';
