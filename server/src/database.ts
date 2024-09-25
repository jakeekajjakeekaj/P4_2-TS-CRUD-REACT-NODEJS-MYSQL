import mysql, { Pool, RowDataPacket } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();  // Inicializa dotenv

const pool: Pool = mysql.createPool({
  // Las mayúsculas son variables de entorno
  host : process.env.MYSQL_HOST as string,
  user : process.env.MYSQL_USER as string,
  password : process.env.MYSQL_PASSWORD as string,
  database : process.env.MYSQL_DATABASE as string,
});

// Se define una interfaz para los empleados
interface Employee {
  id?: number;
  name: string;
  age: number;
  country: string;
  charge: string;
  years: number;
}

// GET EMPLOYEE

export async function getEmployees(): Promise<Employee[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
      SELECT * FROM employees;
    `
  );

  return rows as Employee[];
};

// POST EMPLOYEE

export async function createEmployee(
  name: string, 
  age: number, 
  country: string, 
  charge: string, 
  years: number
): Promise<any> {
  const [result] = await pool.query(  // [result] es utilizado como desesctructuración de nuestra pool, para este caso se puede utilizar [rows] o [result], generalmente [rows] suele ser el primer dato, este se suele mostrar en forma de filas y corresponde más a cuando se usa SELECT, sin embargo [result] es otro dato de la desesctrucutración, y es el que se encarga de checar por ejemplo ya los metadatos y ese tipo de cosas, básicamente información generada al utilizar INSERT, UPDATE, DELETE, etc.
    `
      INSERT INTO employees (name, age, country, charge, years) VALUES (?, ?, ?, ?, ?);
    `, [name, age, country, charge, years]
  );

  // employeeID = result.insertId;
  return result;
};

// PUT EMPLOYEE

export async function updateEmployee(
  id: number, 
  name: string, 
  age: number, 
  country: string, 
  charge: string, 
  years: number
): Promise<any> {
  // console.log(`func ${id} ${name} ${age} ${country} ${charge} ${years}`);
  const [result] = await pool.query(
    `
      UPDATE employees SET name=?, age=?, country=?, charge=?, years=?
      WHERE id = ?;
    `, [name, age, country, charge, years, id]
  );
  return result;
};

// DELETE EMPLOYEE

export async function deleteEmployee(id: number): Promise<any> {
  const [result] = await pool.query(
    `
      DELETE FROM employees WHERE id = ? 
    `, id
  );
  return result;
};