-- ===============================
-- SPRINT 6 - DATABASE STRUCTURE
-- ===============================

-- 1️⃣ Crear base de datos
CREATE DATABASE IF NOT EXISTS lubo_db;
USE lubo_db;

-- ===============================
-- USUARIOS
-- ===============================

CREATE TABLE usuarios (
    id_usuarios INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===============================
-- CATEGORIAS
-- ===============================

CREATE TABLE categorias (
    id_categorias INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- ===============================
-- BRANDS
-- ===============================

CREATE TABLE brands (
    id_brands INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- ===============================
-- PRODUCTOS
-- ===============================

CREATE TABLE productos (
    id_productos INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(255),
    id_categorias INT NOT NULL,
    id_brands INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_productos_categorias
        FOREIGN KEY (id_categorias)
        REFERENCES categorias(id_categorias)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_products_brand
        FOREIGN KEY (id_brands)
        REFERENCES brands(id_brands)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);