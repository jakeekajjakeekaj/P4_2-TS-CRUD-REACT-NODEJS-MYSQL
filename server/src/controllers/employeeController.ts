import { Request, Response } from 'express';
import {
  getEmployeesFromDB,
  createEmployeeInDB,
  updateEmployeeInDB,
  deleteEmployeeFromDB,
} from '../models/employeeModel';

// Obtener Empleados
export const getEmployees = async(req: Request, res: Response)=> {
  try {
    const employees = await getEmployeesFromDB();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
    console.log("no");
  }
};

// Crear Empleado
export const createEmployee = async(req: Request, res: Response)=> {
  try {
    const { name, age, country, charge, years } = req.body;
    const result = await createEmployeeInDB(name, age, country, charge, years);
    res.status(201).json({ id: result.insertId, name, age, country, charge, years });
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
  }
};

// Actualizar Empleado

export const updateEmployee = async(req: Request, res: Response)=> {
  try {
    const { id } = req.params;
    // id = Number(id);
    const { name, age, country, charge, years } = req.body;
    // console.log(id);
    await updateEmployeeInDB(Number(id), name, age, country, charge, years);
    res.status(200).json({ message: "Empleado actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
  }
};

// Eliminar Empleado

export const deleteEmployee = async(req: Request, res: Response)=> {
  try {
    const { id } = req.params;
    await deleteEmployeeFromDB(Number(id));
    res.status(200).json({ message: "Empleado eliinado correctamente" });
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
  }
};