CREATE DATABASE IF NOT EXISTS proyecto;

use proyecto;

CREATE TABLE productos(
    id int(9) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    timestampp datetime not null,
    nombre varchar(100) not null,
    descripcion varchar(100) not null,
    codigo varchar(30) not null,
    foto varchar(200) not null,
    precio int(10) not null,
    stock int(10) not null
);

CREATE TABLE carrito(
    id int(9) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    timestampp datetime not null
);

CREATE TABLE carrito_productos(
    id_carrito int(9),
    id_producto int(9),
    PRIMARY KEY(id_carrito, id_producto),
    FOREIGN KEY (id_carrito) REFERENCES carrito(id),
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);

INSERT INTO productos(timestampp, nombre, descripcion, codigo, foto, precio, stock) VALUES ("2021-03-09 01:58:05.082Z","Tomate","Un producto","12321","https://th.bing.com/th/id/R0963065943598659706461e76612dbb2?rik=x8wkip5bhcRbwA&riu=http%3a%2f%2ftomatissimocr.com%2fwp-content%2fuploads%2f2014%2f11%2ftomate.jpg&ehk=3e0iWzfF75FKNpzsvA5AMVpvgH5cT%2fq6iB%2fN4tPJiAQ%3d&risl=&pid=ImgRaw",1000,3);
INSERT INTO productos(timestampp, nombre, descripcion, codigo, foto, precio, stock) VALUES ("2021-03-09 01:58:05.082Z","Leche","Un producto 2","1232","https://th.bing.com/th/id/OIP.d0NQUwv2vu7BQzjipDkGigHaHa?pid=ImgDet&rs=1",2000,3);
INSERT INTO productos(timestampp, nombre, descripcion, codigo, foto, precio, stock) VALUES ("2021-03-09 01:58:05.082Z","Lechuga","Un producto 3","4321","https://www.aupsa.gob.pa/wp-content/uploads/2018/11/lechuga-romana.jpg",3000,3);

INSERT INTO carrito(timestampp) VALUES ("2021-03-09T02:26:08.246Z");
INSERT INTO carrito_productos(id_carrito, id_producto) VALUES (1,1);