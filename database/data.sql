-- ============================================================
-- LuBo — Base de Datos
-- data.sql: datos iniciales
-- ============================================================

USE lubo_db;

-- ── Categorías ───────────────────────────────────────────────
INSERT INTO categories (name) VALUES
('Fichas Técnicas'),
('Diseños Técnicos'),
('Moldes y Patrones'),
('Recursos Digitales');

-- ── Marcas ───────────────────────────────────────────────────
INSERT INTO brands (name) VALUES
('LuBo Originals'),
('Studio Pack'),
('Patrón Libre'),
('Edit House');

-- ── Productos ────────────────────────────────────────────────
INSERT INTO products (name, description, price, image, categoryId, brandId) VALUES
('Tech Pack Básico – Remera',         'Ficha técnica completa para remera con detalles de confección, avíos y especificaciones de tela.',                               3500.00, '/images/techpack-remera.jpg',    1, 1),
('Flat Design – Colección Outerwear', 'Pack de 12 diseños técnicos de prendas de abrigo: camperas, blazers y tapados. Vectores editables en AI y PDF.',                  5200.00, '/images/flat-outerwear.jpg',     2, 2),
('Molde Base – Pantalón Recto',       'Molde digital listo para imprimir a escala real. Incluye talle S, M y L con márgenes de costura marcados.',                       2800.00, '/images/molde-pantalon.jpg',     3, 3),
('Kit Editorial – Lookbook Minimalista','Plantillas editables en Canva para armar un lookbook profesional. Incluye 10 slides con tipografía y paleta definida.',         4100.00, '/images/kit-lookbook.jpg',       4, 4),
('Tech Pack Premium – Campera con Capucha','Ficha técnica detallada para campera con capucha. Incluye despiece completo y tabla de talles.',                              5800.00, '/images/techpack-campera.jpg',   1, 1),
('Flat Design – Básicos Mujer',       'Pack de 20 flats de básicos: remeras, camisas, joggers y bodies. Incluye vistas frente y espalda.',                               3900.00, '/images/flat-basicos.jpg',       2, 2),
('Molde Base – Camisa Clásica',       'Molde de camisa clásica con pinzas. Incluye talle S, M, L y XL. Listo para imprimir.',                                            3200.00, '/images/molde-camisa.jpg',       3, 3),
('Kit Fichas – Colección Verano',     'Set de 5 fichas técnicas de prendas de verano: short, vestido, top, mono y falda.',                                               6500.00, '/images/kit-verano.jpg',         1, 1),
('Flat Design – Activewear',          'Pack de 15 diseños técnicos de ropa deportiva: calzas, tops y camperas de abrigo.',                                               4400.00, '/images/flat-activewear.jpg',    2, 2),
('Molde Base – Vestido Recto',        'Molde de vestido recto con opción de manga corta y larga. Talles S a XL.',                                                        3600.00, '/images/molde-vestido.jpg',      3, 3),
('Recursos de Color – Paleta Fashion','Guía de combinaciones de colores para colecciones de moda. Incluye códigos Pantone y CMYK.',                                       2200.00, '/images/recursos-color.jpg',     4, 4),
('Tech Pack Avanzado – Jean',         'Ficha técnica para jean con costura doble, cierre y detalles de bolsillos. Incluye tabla de talles y especificaciones de tela.',  6200.00, '/images/techpack-jean.jpg',      1, 1),
('Kit Presentación – Moodboard',      'Plantillas en Canva para presentar colecciones: moodboard, paleta y ficha de producto.',                                          3800.00, '/images/kit-moodboard.jpg',      4, 4),
('Flat Design – Denim Collection',    'Pack de 10 diseños técnicos de prendas denim: jeans, chaquetas y faldas. Vectores editables.',                                    4900.00, '/images/flat-denim.jpg',         2, 2),
('Molde Sastre – Blazer Estructurado','Molde de blazer con solapa y bolsillos. Incluye forro. Talles S a XL.',                                                           5500.00, '/images/molde-blazer.jpg',       3, 3),
('Tech Pack – Enterito Corto',        'Ficha técnica para enterito con detalle de cierre, escote y terminaciones.',                                                      4700.00, '/images/techpack-enterito.jpg',  1, 1),
('Flat Design – Knitwear',            'Pack de 8 diseños técnicos de tejido de punto: sweaters, cardigans y bufandas.',                                                  4200.00, '/images/flat-knitwear.jpg',      2, 2),
('Recursos Tipográficos – Moda',      'Selección de 15 combinaciones tipográficas para uso en etiquetas, lookbooks y redes.',                                            1900.00, '/images/recursos-tipo.jpg',      4, 4),
('Molde Base – Short Tiro Alto',      'Molde de short tiro alto con pinzas. Talles S, M y L con márgenes de costura.',                                                   2600.00, '/images/molde-short.jpg',        3, 3),
('Kit Completo – Colección Invierno', 'Pack combinado: 3 fichas técnicas + 10 flats + 2 moldes para colección de invierno.',                                            9800.00, '/images/kit-invierno.jpg',       1, 1);

-- ── Usuarios ─────────────────────────────────────────────────
-- Nota: las contraseñas están hasheadas con bcrypt (clave: "password")
INSERT INTO users (firstName, lastName, email, password, image, category) VALUES
('Ludmila',    'Borrelli',    'ludmila@lubo.com',                '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '/images/users/default.jpg', 'admin'),
('Valentina',  'Martínez',    'valentina.martinez@gmail.com',    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '/images/users/default.jpg', 'cliente'),
('Camila',     'López',       'camila.lopez@hotmail.com',        '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '/images/users/default.jpg', 'cliente'),
('Martín',     'García',      'martin.garcia@outlook.com',       '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '/images/users/default.jpg', 'cliente'),
('Sofía',      'Rodríguez',   'sofia.rodriguez@gmail.com',       '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '/images/users/default.jpg', 'cliente'),
('Lucía',      'Fernández',   'lucia.fernandez@yahoo.com',       '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '/images/users/default.jpg', 'cliente'),
('Julián',     'Pérez',       'julian.perez@gmail.com',          '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '/images/users/default.jpg', 'cliente'),
('Florencia',  'Sánchez',     'florencia.sanchez@gmail.com',     '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '/images/users/default.jpg', 'cliente'),
('Ignacio',    'Torres',      'ignacio.torres@hotmail.com',      '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '/images/users/default.jpg', 'cliente'),
('Agustina',   'Díaz',        'agustina.diaz@gmail.com',         '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '/images/users/default.jpg', 'cliente');
-- Todos los usuarios del seed tienen contraseña: password