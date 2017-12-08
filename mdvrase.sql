-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2017 at 04:30 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mdvrase`
--

-- --------------------------------------------------------

--
-- Table structure for table `carros`
--

CREATE TABLE `carros` (
  `id_carro` int(10) UNSIGNED NOT NULL,
  `empresa` int(10) UNSIGNED NOT NULL,
  `num_placa` varchar(20) NOT NULL,
  `foto_vehiculo` varchar(100) DEFAULT NULL,
  `color` varchar(40) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `marca` int(10) UNSIGNED NOT NULL,
  `year` year(4) NOT NULL,
  `num_serie` varchar(100) NOT NULL,
  `fecha_obtenido` date DEFAULT NULL,
  `equipo_extra` varchar(200) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `conductor` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carros`
--

INSERT INTO `carros` (`id_carro`, `empresa`, `num_placa`, `foto_vehiculo`, `color`, `modelo`, `marca`, `year`, `num_serie`, `fecha_obtenido`, `equipo_extra`, `descripcion`, `conductor`) VALUES
(1, 1, 'SVT4566', 'mazda3.jpg', 'Blanco', 'Mazda 3', 1, 2011, 'ABCDE123456', '2017-01-01', NULL, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.', 'Alejandro Ramirez'),
(2, 3, 'SSC231', 'yaris.jpg', 'Plateado', 'Yaris', 5, 2007, 'YARTYT324556', '2010-10-13', 'Aire acondicionado.\nLe falta un frente.\nUna banderilla en la antena.', 'Yaris de Alex. Esta un poco chocado.', 'Mauricio Ramirez'),
(4, 1, 'BTMN001', NULL, 'Negro', 'Batimovil', 6, 2017, 'BTMCNEOWC23', '2010-02-12', NULL, NULL, 'Bruce Wayne'),
(5, 1, 'LNCR1232', 'lancer.jpg', 'Blanco', 'Lancer', 6, 2016, 'LNCR1237345', '2017-01-13', NULL, NULL, 'Alejandro Ramirez'),
(6, 1, 'SVT1234', NULL, 'Rojo', 'S model', 6, 2016, 'SMDL049387345', '2017-01-13', NULL, NULL, 'Alejandro Ramirez'),
(7, 1, 'SVT1234', NULL, 'Rojo', 'S model', 6, 2016, 'SMDL049387345', '2017-01-13', NULL, NULL, 'Alejandro Ramirez'),
(8, 1, 'SVT1234', NULL, 'Rojo', 'S model', 6, 2016, 'SMDL049387345', '2017-01-13', NULL, NULL, 'Alejandro Ramirez'),
(9, 1, 'SVT1234', NULL, 'Rojo', 'S model', 6, 2016, 'SMDL049387345', '2017-01-13', NULL, NULL, 'Alejandro Ramirez');

-- --------------------------------------------------------

--
-- Table structure for table `carros_facturas`
--

CREATE TABLE `carros_facturas` (
  `id_carro` int(10) UNSIGNED NOT NULL,
  `id_factura` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `carros_polizas`
--

CREATE TABLE `carros_polizas` (
  `num_poliza` varchar(50) NOT NULL,
  `id_carro` int(10) UNSIGNED NOT NULL,
  `poliza_actual` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carros_polizas`
--

INSERT INTO `carros_polizas` (`num_poliza`, `id_carro`, `poliza_actual`) VALUES
('VEVDSFV345JOKH', 9, 1),
('DSFV345JVEVOKH', 4, 1),
('EIFNEEFOJR', 1, 0),
('wefwefVEVDSFV345JOKH', 4, 1),
('22222222VEVDSFV345JOKH', 2, 0),
('POLIZASAMPLEJOKH', 2, 1),
('SAMPLESEGURO', 1, 1),
('CALLBACKCORRECTLY', 5, 1),
('sample', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `empresas`
--

CREATE TABLE `empresas` (
  `id_empresa` int(10) UNSIGNED NOT NULL,
  `nombre_empresa` varchar(255) NOT NULL,
  `rfc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `empresas`
--

INSERT INTO `empresas` (`id_empresa`, `nombre_empresa`, `rfc`) VALUES
(1, 'RASE', 'RASE1234567'),
(2, 'Efarma', 'EFM76543212'),
(3, 'Aurum', 'AURM2983759'),
(4, 'AlexCorp', 'ALXCRP235235');

-- --------------------------------------------------------

--
-- Table structure for table `facturas`
--

CREATE TABLE `facturas` (
  `id_factura` varchar(255) NOT NULL,
  `empresa` int(10) UNSIGNED NOT NULL,
  `emisor` varchar(255) NOT NULL,
  `costo` int(11) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `pagado` tinyint(1) NOT NULL,
  `usuario_que_capturo` int(10) UNSIGNED NOT NULL,
  `fecha_factura` date NOT NULL,
  `fecha_capturado` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `facturas`
--

INSERT INTO `facturas` (`id_factura`, `empresa`, `emisor`, `costo`, `descripcion`, `pagado`, `usuario_que_capturo`, `fecha_factura`, `fecha_capturado`) VALUES
('ADSFH234TSD', 2, 'Lexcorp', 23532, 'Muy caro.', 0, 1, '2017-04-16', '2017-04-03'),
('FHEH3423R4SD', 3, 'Lexcorp', 232425, '235235', 0, 1, '2017-04-20', '2017-04-03');

-- --------------------------------------------------------

--
-- Table structure for table `marcas`
--

CREATE TABLE `marcas` (
  `id_marca` int(10) UNSIGNED NOT NULL,
  `nombre_marca` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `marcas`
--

INSERT INTO `marcas` (`id_marca`, `nombre_marca`) VALUES
(1, 'Mazda'),
(2, 'Honda'),
(3, 'Mitsubishi'),
(4, 'KIA'),
(5, 'Toyota'),
(6, 'Tesla'),
(9, 'Tesla2'),
(10, 'Tesla3'),
(11, 'GM'),
(12, 'GM2'),
(13, 'GM4'),
(14, 'General Motors'),
(15, 'GMOTORS'),
(16, 'GMOTORS2'),
(17, 'GMOTOR333'),
(18, 'AlexMotors');

-- --------------------------------------------------------

--
-- Table structure for table `modelos`
--

CREATE TABLE `modelos` (
  `id_modelo` int(10) UNSIGNED NOT NULL,
  `nombre_modelo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `modelos`
--

INSERT INTO `modelos` (`id_modelo`, `nombre_modelo`) VALUES
(1, 'Yaris'),
(2, 'Mazda 3'),
(3, 'Mazda 2'),
(4, 'Patriot'),
(5, 'Pathfinder'),
(6, 'Lancer'),
(7, 'Tesla 2');

-- --------------------------------------------------------

--
-- Table structure for table `polizas`
--

CREATE TABLE `polizas` (
  `num_poliza` varchar(50) NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `fecha_expedicion` date NOT NULL,
  `aseguradora` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `polizas`
--

INSERT INTO `polizas` (`num_poliza`, `fecha_vencimiento`, `fecha_expedicion`, `aseguradora`) VALUES
('22222222VEVDSFV345JOKH', '2027-01-15', '2017-01-15', 'Banorte Seguros'),
('CALLBACKCORRECTLY', '2027-01-15', '2017-01-15', 'Banorte Seguros'),
('DSFV345JVEVOKH', '2027-01-15', '2016-12-30', 'Wayne Insurance'),
('EIFNEEFOJR', '2027-01-06', '2017-01-06', 'Geico'),
('POLIZASAMPLEJOKH', '2018-03-31', '2017-01-15', 'Sample Insurance Co.'),
('sample', '2027-01-15', '2017-01-15', 'Banorte Seguros'),
('SAMPLE2', '2017-01-05', '2016-12-29', 'SAMPPLE2'),
('SAMPLESEGURO', '2027-01-15', '2017-01-15', 'Alex Seguros'),
('VEVDSFV345JOKH', '2027-01-15', '2017-01-15', 'Banorte Seguros'),
('wefwefVEVDSFV345JOKH', '2027-01-15', '2017-01-15', 'Banorte Seguros');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(10) UNSIGNED NOT NULL,
  `nombre_rol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Capturista');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `rol` int(10) UNSIGNED NOT NULL,
  `empresa` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `username`, `rol`, `empresa`, `nombre`, `password`, `activo`) VALUES
(1, 'alexmachina', 1, 1, 'Alejandro Ramírez', '$2a$10$m2DSPOkTpUeGNm8FR4rFOumV1qtOOQQWIcMW0.dysrBQPx7Tk7mDW', 1),
(2, 'maux3', 2, 2, 'Mauricio Rmz.', '$2a$10$16/9sh8XbbgxFUzjhQVrRO73u5ORhCwBY7ISW0rRizgV6nGPUZfZi', 0),
(3, 'alexmachina3', 2, 2, 'Alejandro Ramirez', '$2a$10$zwdJCqXQpfmVaAG7T6psb.l/CvfGMvxl6RXlAvoBkCRpF..GP3VO.', 0),
(4, 'axmach', 2, 3, 'axmachin aads', '$2a$10$bCZ0gKj/4xvPhsqDQDNWTeli8hH.ePQSjeZOZLDHQCkGg/Y4Xcun.', 0),
(5, 'newuser2', 2, 2, 'Alex Ram', '$2a$10$Y2NMIGLE1zk9PJC1Yww5V.zFT3t0fk271btDWp72eIWNCX2V3xGX2', 0),
(6, 'aflore74', 2, 2, 'alexram', '$2a$10$cfAwt2vrPTy0GjSmUljadei69Q/9zciXC9Y3SGqZ3V4iiXs5BaJDm', 0),
(7, 'dfswdfvcsdv', 2, 3, 'sdvsdvsvd', '$2a$10$yqm0HXON.987iSyKVNmCluahh6KuNAX/YaAkvIqLCLZ4GXj7yt0r6', 0),
(8, 'Nuevo usuariois', 2, 3, 'alexram', '$2a$10$HRVk4P4zvQ6CJXe/dl/KJObCFGLYZdLdwTzV5YXNaJ8LowF0xozTW', 0),
(9, 'akefcwef', 2, 2, 'wefwe', '$2a$10$pY1cm.u/EvSWF.xJ9rq2o.Ql.vXP8nCXnJs3lX1xPG4Ct4mIBkLNK', 0),
(10, 'Alex TEST', 2, 3, 'Alex Test Signup', '$2a$10$2WF8uFH/ebE/v7AdWSLJAuMh2HW6/sRpv0faqi6IeTxa3th6JGaYK', 0),
(11, 'Alex Test Admin', 2, 1, 'Alex test admin', '$2a$10$CR0fvz6XGarzI3eENFNKQu1e1zSzM26TxVGGyeGJ3TPIGSYgzNMDC', 0),
(12, 'alexmachina', 2, 3, 'alexcram', '$2a$10$FIBzeaKX8rknMnkYx7SB/eWrE0vRW2/bZZLZTaMjiSbKQg1I2b8Qm', 0),
(13, 'alexmachinaADMIN', 1, 3, 'Alex Admin', '$2a$10$VqX7naHmsLeXPr/F.hwkpe5MhVdyK3CtKjbX2.HuZc.Qz/itwhwBO', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carros`
--
ALTER TABLE `carros`
  ADD PRIMARY KEY (`id_carro`),
  ADD KEY `empresa` (`empresa`),
  ADD KEY `marca` (`marca`);

--
-- Indexes for table `carros_facturas`
--
ALTER TABLE `carros_facturas`
  ADD KEY `id_carro` (`id_carro`),
  ADD KEY `id_factura` (`id_factura`);

--
-- Indexes for table `carros_polizas`
--
ALTER TABLE `carros_polizas`
  ADD KEY `num_poliza` (`num_poliza`),
  ADD KEY `id_carro` (`id_carro`);

--
-- Indexes for table `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indexes for table `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`id_factura`),
  ADD KEY `empresa` (`empresa`),
  ADD KEY `usuario_que_capturo` (`usuario_que_capturo`);

--
-- Indexes for table `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id_marca`);

--
-- Indexes for table `modelos`
--
ALTER TABLE `modelos`
  ADD PRIMARY KEY (`id_modelo`);

--
-- Indexes for table `polizas`
--
ALTER TABLE `polizas`
  ADD PRIMARY KEY (`num_poliza`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `rol` (`rol`),
  ADD KEY `empresa` (`empresa`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carros`
--
ALTER TABLE `carros`
  MODIFY `id_carro` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id_empresa` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id_marca` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `modelos`
--
ALTER TABLE `modelos`
  MODIFY `id_modelo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `carros`
--
ALTER TABLE `carros`
  ADD CONSTRAINT `carros_ibfk_1` FOREIGN KEY (`empresa`) REFERENCES `empresas` (`id_empresa`),
  ADD CONSTRAINT `carros_ibfk_3` FOREIGN KEY (`marca`) REFERENCES `marcas` (`id_marca`);

--
-- Constraints for table `carros_facturas`
--
ALTER TABLE `carros_facturas`
  ADD CONSTRAINT `carros_facturas_ibfk_1` FOREIGN KEY (`id_carro`) REFERENCES `carros` (`id_carro`),
  ADD CONSTRAINT `carros_facturas_ibfk_2` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`id_factura`);

--
-- Constraints for table `carros_polizas`
--
ALTER TABLE `carros_polizas`
  ADD CONSTRAINT `carros_polizas_ibfk_1` FOREIGN KEY (`num_poliza`) REFERENCES `polizas` (`num_poliza`),
  ADD CONSTRAINT `carros_polizas_ibfk_2` FOREIGN KEY (`id_carro`) REFERENCES `carros` (`id_carro`);

--
-- Constraints for table `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`empresa`) REFERENCES `empresas` (`id_empresa`),
  ADD CONSTRAINT `facturas_ibfk_2` FOREIGN KEY (`usuario_que_capturo`) REFERENCES `usuarios` (`id_usuario`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`id_rol`),
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`empresa`) REFERENCES `empresas` (`id_empresa`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
