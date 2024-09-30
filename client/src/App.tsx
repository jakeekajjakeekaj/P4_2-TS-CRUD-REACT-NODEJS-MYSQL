import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import EmployeeList from './components/EmployeeList.jsx';
import EmployeeForm from './components/EmployeeForm.jsx';
import { useEmployees } from './hooks/useEmployees';

export default function App() {

  const {
    employees,
    edit,
    currentEmployee,
    handleSubmit,
    handleCancel,
    editEmployee,
    deleteEmployee,
    setCurrentEmployee
  } = useEmployees();

  return (
    <div className="App">
    
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE EMPLEADOS
        </div>
        {/* FORMULARIO DE EMPLEADOS */}
        <EmployeeForm
          name = { currentEmployee.name } 
          setName = { (value)=> setCurrentEmployee( { ...currentEmployee, name: value }) }

          age = { currentEmployee.age } 
          setAge = { (value)=> setCurrentEmployee({ ...currentEmployee, age: value }) }

          country = { currentEmployee.country } 
          setCountry = { (value)=> setCurrentEmployee({ ...currentEmployee, country: value }) }

          charge = { currentEmployee.charge } 
          setCharge = { (value)=> setCurrentEmployee({ ...currentEmployee, charge: value }) }
           
          years = { currentEmployee.years } 
          setYears = { (value)=> setCurrentEmployee({ ...currentEmployee, years: value }) }

          edit={ edit }
          handleSubmit={ handleSubmit }
          handleCancel={ handleCancel }
        />
      </div>

      {/* tabla */}
      <EmployeeList 
      employees = { employees }
      editEmp = { editEmployee }
      deleteEmp = { deleteEmployee }
      />
    </div>
  )
};