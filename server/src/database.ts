// Al especificar from 'mysql2/promise', estamos especificando que usaremos la versión que trae de forma nativa las promesas, es por esto que al crear la Pool, ya no es necesario colocar al final .promise()
// RowDataPacket ayuda a indicar que podremos manejar a los [rows] y por lo mismo podremos manejarlo como un arreglo en el cual especificaremos que recibiremos múltiples filas
// ResultSetHeader ayuda a indicar que podremos manejar los [result] y cual generalmente no lo llamaremos en forma de arreglo, ya que este más que filas y esp, contiene información específica para el confirmado del Post, Put y Delete
import mysql, { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
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

// Promise<Employee[]> indica que se creará una promesa que devolverá a un arreglo Employee, el cuál ya se definió a su interfaz más arriba
export async function getEmployees(): Promise<Employee[]> {
  // Para este caso no usamos el Employee[] porque ahora indicamos que esperamos un arreglo de filas al momento de realizar nuestra consulta
  const [rows] = await pool.query<RowDataPacket[]>(
    `
      SELECT * FROM employees;
    `
  );

  return rows as Employee[];
};

// POST EMPLOYEE

// Promise<any> es considerada una mala práctica, ya que en la promesa se puede devolver cualquier cosa
// ResultSetHeader es usado para cuando se trabaja con result en vez de con rows, y no es especificado en forma de arreglo, ya que este no devolverá múltiples filas como lo hace el RowDataPacket, este es un objeto que contiene información sobre el resultado de una operación SQL que no devuelve filas, contiene metadatos sobre la ejecución de la consulta, como el número de filas afectadas o el ID de la última fila insertada.
export async function createEmployee(
  name: string, 
  age: number, 
  country: string, 
  charge: string, 
  years: number
): Promise<ResultSetHeader> {
  const [result] = await pool.query<ResultSetHeader>(  // [result] es utilizado como desesctructuración de nuestra pool, para este caso se puede utilizar [rows] o [result], generalmente [rows] suele ser el primer dato, este se suele mostrar en forma de filas y corresponde más a cuando se usa SELECT, sin embargo [result] es otro dato de la desesctrucutración, y es el que se encarga de checar por ejemplo ya los metadatos y ese tipo de cosas, básicamente información generada al utilizar INSERT, UPDATE, DELETE, etc.
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
): Promise<ResultSetHeader> {
  // console.log(`func ${id} ${name} ${age} ${country} ${charge} ${years}`);
  const [result] = await pool.query<ResultSetHeader>(
    `
      UPDATE employees SET name=?, age=?, country=?, charge=?, years=?
      WHERE id = ?;
    `, [name, age, country, charge, years, id]
  );
  return result;
};

// DELETE EMPLOYEE

export async function deleteEmployee(id: number): Promise<ResultSetHeader> {
  const [result] = await pool.query<ResultSetHeader>(
    `
      DELETE FROM employees WHERE id = ? 
    `, id
  );
  return result;
};