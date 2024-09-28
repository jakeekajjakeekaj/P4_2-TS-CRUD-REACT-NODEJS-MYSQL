import { EmployeeRowProps } from "../types/types";

export default function EmployeeRow ({ val, index, editEmp, deleteEmp }: EmployeeRowProps) {
  return (
    // La key no es especificada en el tr debido a que ya mandamos a llamar a esta key cada vez que iniciamos al componente
    <tr>
      <th scope="row">{ index + 1 }</th>
      <td>{ val.name }</td>
      <td>{ val.age }</td>
      <td>{ val.country }</td>
      <td>{ val.charge }</td>
      <td>{ val.years }</td>
      <td>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button"
        onClick={ ()=> {
          editEmp(val.id);
        } }
        className="btn btn-info">Editar</button>

        <button type="button"
        onClick={ ()=> {
          deleteEmp(val.id, val.name)
        } }
        className="btn btn-danger">Eliminar</button>
      </div>
      </td>
    </tr>
  )
};