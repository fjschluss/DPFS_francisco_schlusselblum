-- ===============================
-- SPRINT 6 - SEED DATA
-- ===============================

USE lubo_db;

-- ===============================
-- CATEGORIES
-- ===============================

INSERT INTO categorias (nombre) VALUES
('Remeras'),
('Buzos'),
('Camisas'),
('Accesorios'),
('Pantalones');

-- ===============================
-- BRANDS
-- ===============================

INSERT INTO brands (nombre) VALUES
('LuBo Studio'),
('Urban Line'),
('Classic Wear'),
('Minimal Co'),
('Premium Edition');

-- ===============================
-- USERS
-- ===============================

INSERT INTO usuarios (nombre, apellido, email, password, role, avatar) VALUES
('Francisco', 'Schlusselblum', 'fran@lubo.com', '$2b$10$hashsimulado1', 'admin', 'default.png'),
('Lucia', 'Borrelli', 'lu@lubo.com', '$2b$10$hashsimulado2', 'admin', 'default.png'),
('Juan', 'Perez', 'juan@mail.com', '$2b$10$hashsimulado3', 'user', 'default.png'),
('Maria', 'Gomez', 'maria@mail.com', '$2b$10$hashsimulado4', 'user', 'default.png'),
('Carlos', 'Lopez', 'carlos@mail.com', '$2b$10$hashsimulado5', 'user', 'default.png');

-- ===============================
-- PRODUCTS
-- ===============================

INSERT INTO productos (nombre, descripcion, precio, imagen, id_categorias, id_brands) VALUES
('Remera Minimal', 'Remera de algodón estilo minimalista', 15999.99, 'remera1.jpg', 1, 4),
('Buzo Oversize', 'Buzo urbano oversize con capucha', 28999.50, 'buzo1.jpg', 2, 2),
('Camisa Clásica', 'Camisa formal de corte clásico', 34999.00, 'camisa1.jpg', 3, 3),
('Gorra Street', 'Gorra estilo streetwear', 8999.99, 'gorra1.jpg', 4, 2),
('Pantalón Cargo', 'Pantalón cargo con bolsillos laterales', 31999.00, 'pantalon1.jpg', 5, 2),
('Remera Premium', 'Remera edición premium limitada', 19999.99, 'remera2.jpg', 1, 5),
('Buzo Minimal', 'Buzo minimalista sin capucha', 25999.00, 'buzo2.jpg', 2, 4),
('Camisa Urban', 'Camisa estilo urbano slim fit', 29999.00, 'camisa2.jpg', 3, 2),
('Cinturón Cuero', 'Cinturón de cuero genuino', 12999.00, 'cinturon.jpg', 4, 3),
('Jean Slim Fit', 'Jean azul corte slim fit', 27999.99, 'jean.jpg', 5, 1);