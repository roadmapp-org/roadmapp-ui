INSERT INTO users VALUES
    ('tobiolea',1,'$2a$10$DJSezd2kgaLZ1MKHSzC7KOHi8.IQLNE5KG4lPY9IYE5Wlu.4kpeKq','USER'),
    ('smartinez',1,'$2a$10$DJSezd2kgaLZ1MKHSzC7KOHi8.IQLNE5KG4lPY9IYE5Wlu.4kpeKq','USER');
INSERT INTO `projects` VALUES
    (1,_binary '','WSMercados','tobiolea'),
    (2,_binary '','Amparos','tobiolea'),
    (3,_binary '','DemonioMQ','tobiolea'),
    (4,_binary '','TFLOW','tobiolea'),
    (5,_binary '','Multiradio','smartinez'),
    (6,_binary '','YPF','smartinez'),
    (7,_binary '','Sodexo','smartinez');

INSERT INTO `tasks` VALUES
    (1,_binary '','Migración DevOps',1),
    (2,_binary '','Migración DevOps',2),
    (3,_binary '','Migración DevOps',3),
    (4,_binary '','Migración DevOps',4),
    (5,_binary '','Compensacion Automatica',5),
    (6,_binary '','Esker AP',6),
    (7,_binary '','Factura electrónica',7),
    (8,_binary '','Esker SOP',7);

INSERT INTO `subtasks` VALUES
    (1,_binary '','Compilacion en DESA',1),
    (2,_binary '','RFO',1),
    (3,_binary '','Adecuación',2),
    (5,_binary '','Creación de ListViewer',2),
    (6,_binary '','Localizacion',2),
    (7,_binary '','Creación de monitor',2);
