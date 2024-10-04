import Axios, { AxiosResponse } from 'axios';
import { Employee } from '../types/types';

const API_URL = 'http://localhost:3000/api';

// Tipos para las respuestas de Axios
// interface GetEmployeesResponse {
//   data: Employee[];
//   // employees: Employee[];
// }

// interface EmployeeResponse {
//   data: Employee;
//   // employees: Employee;
// }

export const getEmployees = (): Promise<AxiosResponse> => {
  return Axios.get(`${API_URL}/employees`)};

export const createEmployee = (employee: Employee): Promise<AxiosResponse> => {
  console.log(`Se procede a la API ${typeof(employee.name)} ${employee.name} ${typeof(employee.age)} ${employee.age} ${typeof(employee.country)} ${employee.country} ${typeof(employee.charge)} ${employee.charge} ${typeof(employee.years)} ${employee.years}`);
  return Axios.post(`${API_URL}/employee`, employee)};

export const updateEmployee = (id: number, employee: Employee): Promise<AxiosResponse> => {
return Axios.put(`${API_URL}/employee/${id}`, employee)};

export const deleteEmployee = (id: number): Promise<AxiosResponse> => {
return Axios.delete(`${API_URL}/employee/${id}`)};