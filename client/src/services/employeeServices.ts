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
  return Axios.get(`${API_URL}/get/employees`)};

export const createEmployee = (employee: Employee): Promise<AxiosResponse> => {
  return Axios.post(`${API_URL}/create/employee`, employee)};

export const updateEmployee = (employee: Employee): Promise<AxiosResponse> => {
return Axios.put(`${API_URL}/update/employee`, employee)};

export const deleteEmployee = (id: number): Promise<AxiosResponse> => {
return Axios.delete(`${API_URL}/delete/employee/${id}`)};