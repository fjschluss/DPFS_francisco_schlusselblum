-- ============================================================
-- LuBo — Base de Datos
-- structure.sql: creación de estructura completa
-- ============================================================

DROP DATABASE IF EXISTS lubo_db;
CREATE DATABASE lubo_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE lubo_db;

-- ── Tabla: categories ────────────────────────────────────────
CREATE TABLE categories (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100)    NOT NULL,
    createdAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ── Tabla: brands ────────────────────────────────────────────
CREATE TABLE brands (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100)    NOT NULL,
    createdAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- ── Tabla: products ──────────────────────────────────────────
CREATE TABLE products (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    name        VARCHAR(200)    NOT NULL,
    description TEXT            NOT NULL,
    price       DECIMAL(10,2)   NOT NULL,
    image       VARCHAR(300)    NOT NULL DEFAULT '/images/placeholder.jpg',
    categoryId  INT UNSIGNED    NOT NULL,
    brandId     INT UNSIGNED    NOT NULL,
    createdAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_products_category
        FOREIGN KEY (categoryId) REFERENCES categories(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_products_brand
        FOREIGN KEY (brandId) REFERENCES brands(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ── Tabla: users ─────────────────────────────────────────────
CREATE TABLE users (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    firstName   VARCHAR(100)    NOT NULL,
    lastName    VARCHAR(100)    NOT NULL,
    email       VARCHAR(200)    NOT NULL,
    password    VARCHAR(255)    NOT NULL,
    image       VARCHAR(300)    NOT NULL DEFAULT '/images/users/default.jpg',
    category    ENUM('admin','cliente') NOT NULL DEFAULT 'cliente',
    createdAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uq_users_email UNIQUE (email)
) ENGINE=InnoDB;