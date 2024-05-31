
## SQL Sentences
CREATE TABLE `alquiler` (
	`idCoche` INT(10) NOT NULL,
	`precio` FLOAT NOT NULL DEFAULT '0',
	`precioSeguro` FLOAT NOT NULL DEFAULT '0',
	`idUsuario` INT(10) NULL DEFAULT NULL,
	PRIMARY KEY (`idCoche`) USING BTREE
)
CREATE TABLE `cita` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`idUsuario` INT(10) NULL DEFAULT '0',
	`idEmpleado` INT(10) NULL DEFAULT '0',
	`idCoche` INT(10) NULL DEFAULT '0',
	`fecha` DATE NULL DEFAULT NULL,
	`hora` DATETIME NULL DEFAULT NULL,
	`autorizacion` BINARY(50) NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)

CREATE TABLE `coche` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`marca` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`modelo` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`descripcion` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`kilometros` INT(10) NULL DEFAULT NULL,
	`potencia` INT(10) NULL DEFAULT NULL,
	`transmision` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`combustible` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`carroceria` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`) USING BTREE
)
	CREATE TABLE `compra` (
	`idCoche` INT(10) NOT NULL,
	`precio` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`idUsuario` INT(10) NULL DEFAULT NULL,
	PRIMARY KEY (`idCoche`) USING BTREE
)
CREATE TABLE `empleado` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`idUsuario` INT(10) NULL DEFAULT '0',
	`rango` INT(10) NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE
)

CREATE TABLE `usuario` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`apellidos` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`email` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`password` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`) USING BTREE
)


### Introducción datos de coches
INSERT INTO coche (marca, modelo, descripcion, kilometros, potencia, transmision, combustible, carroceria) VALUES
('Toyota', 'Corolla', 'Sedán compacto eficiente', 50000, 132, 'Automática', 'Gasolina', 'Sedán'),
('Ford', 'Mustang', 'Deportivo clásico americano', 20000, 300, 'Manual', 'Gasolina', 'Coupé'),
('Honda', 'Civic', 'Confiabilidad y economía', 150000, 140, 'Manual', 'Gasolina', 'Sedán'),
('Tesla', 'Model 3', 'Vehículo eléctrico innovador', 30000, 258, 'Automática', 'Eléctrico', 'Sedán'),
('BMW', '320i', 'Sedán de lujo con buen rendimiento', 85000, 180, 'Automática', 'Gasolina', 'Sedán'),
('Nissan', 'Leaf', 'Compacto eléctrico', 40000, 110, 'Automática', 'Eléctrico', 'Hatchback'),
('Chevrolet', 'Camaro', 'Muscle car con mucha potencia', 12000, 275, 'Manual', 'Gasolina', 'Coupé'),
('Audi', 'A4', 'Combinación de lujo y tecnología', 77000, 190, 'Automática', 'Gasolina', 'Sedán'),
('Hyundai', 'Elantra', 'Sedán económico y espacioso', 60000, 147, 'Automática', 'Gasolina', 'Sedán'),
('Mercedes-Benz', 'C300', 'Alto estándar de confort y estilo', 45000, 255, 'Automática', 'Gasolina', 'Sedán'),
('Volkswagen', 'Golf', 'Compacto versátil y confiable', 35000, 170, 'Manual', 'Gasolina', 'Hatchback'),
('Porsche', '911', 'Deportivo icónico y potente', 9000, 350, 'Automática', 'Gasolina', 'Coupé'),
('Fiat', '500', 'Pequeño y ágil en la ciudad', 100000, 69, 'Manual', 'Gasolina', 'Hatchback'),
('Subaru', 'Impreza', 'Seguro y robusto para cualquier clima', 75000, 152, 'Automática', 'Gasolina', 'Sedán'),
('Mazda', 'CX-5', 'SUV confiable con buen manejo', 22000, 187, 'Automática', 'Gasolina', 'SUV'),
('Land Rover', 'Discovery Sport', 'Lujo y capacidad off-road', 58000, 240, 'Automática', 'Diésel', 'SUV'),
('Jaguar', 'XE', 'Elegancia británica con estilo deportivo', 30000, 247, 'Automática', 'Gasolina', 'Sedán'),
('Kia', 'Sportage', 'SUV compacto con buena relación calidad-precio', 48000, 181, 'Automática', 'Gasolina', 'SUV'),
('Renault', 'Clio', 'Económico y práctico para la ciudad', 120000, 75, 'Manual', 'Gasolina', 'Hatchback'),
('Peugeot', '208', 'Estiloso y eficiente en combustible', 25000, 100, 'Manual', 'Gasolina', 'Hatchback'),
('Alfa Romeo', 'Giulia', 'Diseño italiano con gran desempeño', 20000, 280, 'Automática', 'Gasolina', 'Sedán'),
('Volvo', 'XC40', 'Seguridad y tecnología nórdica', 15000, 248, 'Automática', 'Gasolina', 'SUV'),
('Lexus', 'RX', 'Confort y lujo en un SUV', 40000, 295, 'Automática', 'Híbrido', 'SUV'),
('Mitsubishi', 'Outlander', 'Espacioso y eficiente', 70000, 166, 'Automática', 'Gasolina', 'SUV'),
('Skoda', 'Octavia', 'Espacioso y práctico', 65000, 150, 'Manual', 'Gasolina', 'Sedán'),
('Jeep', 'Wrangler', 'Capacidad todoterreno indiscutible', 35000, 285, 'Manual', 'Gasolina', 'SUV'),
('Acura', 'TLX', 'Tecnología y confort premium', 20000, 272, 'Automática', 'Gasolina', 'Sedán'),
('Infiniti', 'Q50', 'Lujo y rendimiento', 30000, 300, 'Automática', 'Gasolina', 'Sedán'),
('Cadillac', 'CTS', 'Elegancia americana con alto rendimiento', 55000, 268, 'Automática', 'Gasolina', 'Sedán'),
('Mini', 'Cooper', 'Ícono compacto y divertido', 80000, 134, 'Manual', 'Gasolina', 'Hatchback'),
('Dodge', 'Challenger', 'Potencia americana en un coupé', 25000, 305, 'Automática', 'Gasolina', 'Coupé'),
('Lincoln', 'MKZ', 'Lujo y comodidad en un sedán', 33000, 245, 'Automática', 'Gasolina', 'Sedán'),
('GMC', 'Acadia', 'Amplio y robusto SUV', 45000, 310, 'Automática', 'Gasolina', 'SUV'),
('Buick', 'Enclave', 'Confort y espacio en un paquete lujoso', 37000, 310, 'Automática', 'Gasolina', 'SUV'),
('Citroen', 'C4', 'Confort francés en un compacto', 85000, 110, 'Manual', 'Gasolina', 'Hatchback'),
('Opel', 'Astra', 'Eficiente y confiable compacto alemán', 95000, 145, 'Manual', 'Gasolina', 'Hatchback'),
('Seat', 'Ibiza', 'Compacto español con estilo y eficiencia', 75000, 95, 'Manual', 'Gasolina', 'Hatchback'),
('Suzuki', 'Swift', 'Pequeño y económico, ideal para la ciudad', 60000, 82, 'Manual', 'Gasolina', 'Hatchback'),
('Ferrari', '488', 'Deportivo italiano de alto rendimiento', 15000, 661, 'Automática', 'Gasolina', 'Coupé'),
('Bentley', 'Continental GT', 'Lujo y potencia en un gran turismo', 20000, 626, 'Automática', 'Gasolina', 'Coupé'),
('Aston Martin', 'DB11', 'Elegancia y potencia británica', 10000, 503, 'Automática', 'Gasolina', 'Coupé'),
('Maserati', 'Ghibli', 'Sedán italiano con carácter deportivo', 30000, 345, 'Automática', 'Gasolina', 'Sedán'),
('Lamborghini', 'Huracan', 'Superdeportivo extremo', 8000, 610, 'Automática', 'Gasolina', 'Coupé'),
('McLaren', '570S', 'Deportivo superligero y rápido', 5000, 562, 'Automática', 'Gasolina', 'Coupé'),
('Rolls-Royce', 'Phantom', 'Sinónimo de lujo supremo', 25000, 563, 'Automática', 'Gasolina', 'Sedán'),
('Lotus', 'Elise', 'Agilidad y ligereza en un deportivo', 30000, 217, 'Manual', 'Gasolina', 'Coupé'),
('Saab', '9-3', 'Estilo y seguridad en un sedán sueco', 110000, 210, 'Manual', 'Gasolina', 'Sedán'),
('Smart', 'Fortwo', 'Solución urbana compacta', 50000, 70, 'Automática', 'Gasolina', 'Hatchback'),
('SsangYong', 'Tivoli', 'SUV económico y bien equipado', 20000, 128, 'Manual', 'Gasolina', 'SUV'),
('Isuzu', 'D-Max', 'Robusto y confiable para el trabajo duro', 90000, 164, 'Manual', 'Diésel', 'Pickup');

INSERT INTO compra (idCoche, precio) VALUES
(36, '75,000€'),  -- Dodge Challenger, precio estimado de un coupé potente
(37, '55,000€'),  -- Lincoln MKZ
(38, '65,000€'),  -- GMC Acadia
(39, '50,000€'),  -- Buick Enclave
(40, '25,000€'),  -- Citroen C4
(41, '30,000€'),  -- Opel Astra
(42, '20,000€'),  -- Seat Ibiza
(43, '18,000€'),  -- Suzuki Swift
(44, '250,000€'), -- Ferrari 488
(45, '220,000€'), -- Bentley Continental GT
(46, '210,000€'), -- Aston Martin DB11
(47, '100,000€'), -- Maserati Ghibli
(48, '280,000€'), -- Lamborghini Huracan
(49, '195,000€'), -- McLaren 570S
(50, '450,000€'), -- Rolls-Royce Phantom
(51, '60,000€'),  -- Lotus Elise
(52, '35,000€'),  -- Saab 9-3
(53, '15,000€'),  -- Smart Fortwo
(54, '25,000€'),  -- SsangYong Tivoli
(55, '35,000€');  -- Isuzu D-Max

INSERT INTO alquiler (idCoche, precio, precioSeguro) VALUES
(6, 700, 200),  -- Toyota Corolla
(11, 1200, 300), -- Ford Mustang
(16, 300, 100),  -- Honda Civic
(21, 800, 250),  -- Tesla Model 3
(26, 1000, 300), -- BMW 320i
(31, 500, 150),  -- Nissan Leaf
(36, 1100, 320), -- Chevrolet Camaro
(41, 950, 280),  -- Audi A4
(46, 350, 120),  -- Hyundai Elantra
(51, 1050, 300),-- Mercedes-Benz C300
(56, 400, 130), -- Volkswagen Golf
(61, 1300, 350),-- Porsche 911
(66, 250, 80),  -- Fiat 500
(71, 450, 140), -- Subaru Impreza
(76, 550, 170), -- Mazda CX-5
(81, 1100, 320),-- Land Rover Discovery Sport
(86, 900, 270), -- Jaguar XE
(91, 600, 180), -- Kia Sportage
(96, 250, 75),  -- Renault Clio
(101, 350, 110), -- Peugeot 208
(106, 1000, 300),-- Alfa Romeo Giulia
(111, 1100, 330),-- Volvo XC40
(116, 1200, 350),-- Lexus RX
(121, 500, 150), -- Mitsubishi Outlander
(126, 400, 120), -- Skoda Octavia
(131, 800, 240), -- Jeep Wrangler
(136, 950, 280), -- Acura TLX
(141, 1050, 310),-- Infiniti Q50
(146, 950, 280), -- Cadillac CTS
(151, 400, 120); -- Mini Cooper

INSERT INTO usuario (nombre, apellidos, email, password, rango) VALUES
('admin', 'admin admin', 'admin@gmail.com', 'admin', 1);
