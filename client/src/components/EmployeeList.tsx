import EmployeeRow from './EmployeeRow';
import { EmployeeListProps } from '../types/types';
import { useEffect } from 'react';

export default function EmployeeList ({ employees, editEmp, deleteEmp }: EmployeeListProps) {

  useEffect(()=> {
    console.log("Employees: ", employees);
  }, [employees]);

  return (
    <table className="table table-striped box-clamp">
        <thead>
          <tr>
            <th scope="col">No</th>
            {/* <th scope="col">#</th> */}
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            // Verifica si es undefined o null y luego verifica que haya algún valor
            employees && employees.length > 0 ? (
            
            employees.map((val, index)=> (
              <EmployeeRow
                key = { val.id }
                val = { val }
                index = { index }
                editEmp = { editEmp }
                deleteEmp = { deleteEmp }
              />
            ))
            ) : (
              <tr>
              </tr>
            )
          }
        </tbody>
      </table>
  );
};