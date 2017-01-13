CREATE TABLE IF NOT EXISTS `roles`(
    id_rol INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `marcas`(
    id_marca INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_marca VARCHAR(255) NOT NULL
);

-- CREATE TABLE IF NOT EXISTS `modelos`(
--     id_modelo INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     nombre_modelo VARCHAR(255) NOT NULL
-- );

CREATE TABLE IF NOT EXISTS `empresas`(
    id_empresa INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_empresa VARCHAR(255) NOT NULL,
    rfc VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `usuarios`(
    id_usuario INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    rol INT UNSIGNED NOT NULL,
    empresa INT UNSIGNED NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    password CHAR(60) NOT NULL,
    activo TINYINT(1) NOT NULL,

    FOREIGN KEY (rol) REFERENCES roles(id_rol),
    FOREIGN KEY (empresa) REFERENCES empresas(id_empresa)
);

CREATE TABLE IF NOT EXISTS `facturas`(
    id_factura VARCHAR(255) NOT NULL PRIMARY KEY,
    empresa INT UNSIGNED NOT NULL,
    emisor VARCHAR(255) NOT NULL,
    costo INT NOT NULL,
    descripcion VARCHAR(500),
    pagado TINYINT(1) NOT NULL,
    usuario_que_capturo INT UNSIGNED NOT NULL,
    fecha DATE NOT NULL,

    FOREIGN KEY (empresa) REFERENCES empresas(id_empresa),
    FOREIGN KEY (usuario_que_capturo) REFERENCES usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS `carros`(
    id_carro INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    empresa INT UNSIGNED NOT NULL,
    num_placa VARCHAR(20) NOT NULL,
    foto_vehiculo VARCHAR(100),
    color VARCHAR(40) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    marca INT UNSIGNED NOT NULL,
    year YEAR NOT NULL,
    num_serie VARCHAR(100) NOT NULL, 
    fecha_obtenido DATE,
    equipo_extra VARCHAR(200),
    descripcion VARCHAR(500),
    conductor VARCHAR(250) NOT NULL,

    FOREIGN KEY (empresa) REFERENCES empresas(id_empresa),
    FOREIGN KEY (marca) REFERENCES marcas(id_marca)
);

CREATE TABLE IF NOT EXISTS `carros_facturas`(
    id_carro INT UNSIGNED NOT NULL,
    id_factura VARCHAR(255) NOT NULL,

    FOREIGN KEY (id_carro) REFERENCES carros(id_carro),
    FOREIGN KEY (id_factura) REFERENCES facturas(id_factura)
);

CREATE TABLE IF NOT EXISTS `polizas`(
    num_poliza VARCHAR(50) NOT NULL PRIMARY KEY,
    fecha_vencimiento DATE NOT NULL,
    fecha_expedicion DATE NOT NULL,
    aseguradora VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS `carros_polizas`(
    num_poliza VARCHAR(50) NOT NULL,
    id_carro INT UNSIGNED NOT NULL,
    poliza_actual TINYINT(1) NOT NULL,
    
    FOREIGN KEY (num_poliza) REFERENCES polizas(num_poliza),
    FOREIGN KEY (id_carro) REFERENCES carros(id_carro)
);