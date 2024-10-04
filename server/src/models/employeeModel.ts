import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../config/database';

// Interfaz de Empleado
interface Employee {
  id?: number,
  name: string,
  age: number,
  country: string,
  charge: string,
  years: number;
}

// Obtener empleados desde la DB
export const getEmployeesFromDB = async(): Promise<Employee[]>=> {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT * FROM employees;
  `);
  return rows as Employee[];
};

// Crear un nuevo empleado en la DB
export const createEmployeeInDB = async (
  name: string,
  age: number,
  country: string,
  charge: string,
  years: number,
): Promise<ResultSetHeader>=> {
  const [result] = await pool.query<ResultSetHeader>(`
    INSERT INTO employees (name, age, country, charge, years) VALUES (?, ?, ?, ?, ?)  
  `, [name, age, country, charge, years]);
  return result;
};

// Actualizar un empleado
export const updateEmployeeInDB = async (
  id: number,
  name: string,
  age: number,
  country: string,
  charge: string,
  years: number,
): Promise<void>=> {
  await pool.query(`
    UPDATE employees SET name = ?, age = ?, country = ?, charge = ?, years = ? WHERE id = ? 
  `, [name, age, country, charge, years, id]);
};

// Eliminar un empleado
export const deleteEmployeeFromDB = async (id: number): Promise<void>=> {
  await pool.query(`
    DELETE FROM employees WHERE id = ?  
  `, [id]);
};