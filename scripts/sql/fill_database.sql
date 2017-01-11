INSERT INTO roles (nombre_rol) VALUES 
("Administrador"), 
("Capturista ");

INSERT INTO empresas (nombre_empresa, RFC) VALUES 
("RASE", "RASE1234567"), 
("Efarma", "EFM76543212"), 
("Aurum", "AURM2983759");

INSERT INTO marcas (nombre_marca) VALUES ("Mazda"), ("Honda"), ("Mitsubishi"), ("KIA"), ("Toyota");

INSERT INTO modelos (nombre_modelo) VALUES
("Yaris"),
("Mazda 3"),
("Mazda 2"),
("Patriot"),
("Pathfinder"),
("Lancer"),
("Tesla 2");

INSERT INTO carros (
    empresa, 
    num_placa, 
    foto_vehiculo,
    color,
    modelo,
    marca,
    year,
    num_serie,
    fecha_obtenido,
    equipo_extra,
    descripcion,
    conductor
) VALUES
(1, "SVT4566", NULL, "Blanco", 2, 3, "2016-01-01", "ABCDE123456", "2017-01-01", NULL, NULL, "Alejandro Ramirez");