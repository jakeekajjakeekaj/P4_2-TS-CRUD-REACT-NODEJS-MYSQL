-- Creación de la DB
CREATE DATABASE p4_empleados_crud;

USE p4_empleados_crud;

-- TABLA EMPLEADOS

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  country VARCHAR(100),
  charge VARCHAR(100),
  years INT
);
