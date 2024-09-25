import express, { Request, Response } from 'express';
import cors from 'cors';
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
} from './database';

const corsOptions = {
  origin : ['http://127.0.0.1:5173', 'http://localhost:5173'],
  methods : ["GET", "POST", "PUT", "DELETE"],
  credentials : true, // Permite enviar credenciales (cookies, autenticaciones)
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// -- GET --

app.get("/api/get/employees", async(req: Request, res: Response)=> {
  try {
    const employees = await getEmployees();
    res.status(201).send(employees);
  } catch(err) {
    console.log(err);
    res.status(500).send({ error: `Internal Server Error: ${err}` });
  }
});

// -- POST --

app.post("/api/create/employee", async(req: Request, res: Response)=> {
  try {
    const { name, age, country, charge, years } = req.body;

    // Validación básica de los datos
    if (!name || !age || !country || !charge || !years) {
      return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }
  
    const employee = await createEmployee(name, age, country, charge, years);
    // console.log("SQL EJECUTADO");
    res.status(201).send(employee);
  } catch(err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// -- PUT --

app.put("/api/update/employee", async(req: Request, res: Response)=> {
  try {
    const { id, name, age, country, charge, years } = req.body;

    // Validación básica de los datos
    if (!id || !name || !age || !country || !charge || !years) {
      return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }

    // Validación adicional si es necesario
    if (typeof id !== 'number' || typeof name !== 'string' || 
      typeof age !== 'number' || typeof country !== 'string' || 
      typeof charge !== 'string' || typeof years !== 'number') {
      return res.status(400).send({ error: "Formato de datos incorrecto" });
    }

    // console.log(`${id} ${name} ${age} ${country} ${charge} ${years}`);
    
    const employee = await updateEmployee(id, name, age, country, charge, years);
    // console.log("SQL EJECUTADO");
    res.status(200).send(employee);
  } catch(err) {
    console.log(`Error en la actualizacion ${err}`);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// -- DELETE --

app.delete("/api/delete/employee/:id", async(req: Request, res: Response)=> {
  try {
    const { id } = req.params;  // Es decir de los parámetros que se enviarán vía URL

    // Validación básica de los datos
    if (!id) {
      return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }
  
    const employee = await deleteEmployee(Number(id));
    // console.log("SQL EJECUTADO");
    res.status(201).send(employee);
  } catch(err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || '3000';

app.listen(PORT, ()=> console.log(`Server is listening on PORT ${PORT}...`));