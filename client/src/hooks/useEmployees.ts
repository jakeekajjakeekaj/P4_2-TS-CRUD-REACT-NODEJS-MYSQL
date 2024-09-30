import { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  getEmployees as fetchEmployees,
  createEmployee as addEmployee,
  updateEmployee as modifyEmployee,
  deleteEmployee as removeEmployee
} from '../services/employeeServices.js';
import { Employee } from '../types/types';
import { AxiosError } from 'axios';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee>({
    name: "",
    age: "",
    country: "",
    charge: "",
    years: "",
    id: 0
  });

  const MySwal = withReactContent(Swal);

  // useCallBack sería para las funciones que se pasan como props, de esta manera evitamos que se reendericen a cada rato y solo baste con que lo hagan una vez, a excepción de que cambien sus props, para este caso el edit, employees o el currentEmployee
  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    if (edit) {
      const originalEmployee = employees.find(emp => emp.id === currentEmployee.id);
      if (isFormValid(currentEmployee, originalEmployee)) {
        updateEmployee(currentEmployee);
      }
    } else {
      if (isFormValid(currentEmployee)) addNewEmployee();
    }
  }, [edit, employees, currentEmployee]);

  const handleCancel = useCallback(()=> {
    setEdit(false);
    clearFields();
  }, []);

  // Función centralizada para validar el formulario
  const isFormValid = useCallback((employeeData: Employee, originalEmployee: Employee | null = null): boolean => {
    // Validar que los datos no sean iguales al empleado original en caso de edición
    console.log("Pasa validacion");
    if (originalEmployee) {
      if (
        employeeData.name === originalEmployee.name &&
        employeeData.age === originalEmployee.age &&
        employeeData.country === originalEmployee.country &&
        employeeData.charge === originalEmployee.charge &&
        employeeData.years === originalEmployee.years
      ) {
        console.log("no se hacen cambios");
        return true; // No se hicieron cambios
      }
    }

    // Validar campos vacíos
    if (!employeeData.name || !employeeData.age || !employeeData.country || !employeeData.charge) {
      console.log("campo vacio");
      MySwal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos.",
        icon: "error",
        timer: 3500
      });
      return false;
    }

    // Validar que la edad y años de experiencia sean mayores a 0
    console.log("1: " + typeof(employeeData.age));
    if (Number(employeeData.age) <= 0 || Number(employeeData.years) < 0) {
      MySwal.fire({
        title: "Error",
        text: "La edad y los años de experiencia deben ser mayores que 0.",
        icon: "error",
        timer: 3500
      });
      return false;
    }

    return true; // Formulario válido
  }, [MySwal]);

  const addNewEmployee = useCallback(async () => {
    try {
      currentEmployee.age = Number(currentEmployee.age);
      currentEmployee.years = Number(currentEmployee.years);
      console.log("age " + typeof(currentEmployee.age));
      await addEmployee(currentEmployee);
      fetchAllEmployees();
      clearFields();
      MySwal.fire({
        title: "Registro Exitoso!",
        text: `El usuario ${currentEmployee.name} fue registrado`,
        icon: "success",
        timer: 3500
      });
    } catch (error) {
      showError(error, "Error al agregar el usuario");
    }
  }, [currentEmployee]);

  const updateEmployee = useCallback(async (currentEmployee: Employee) => {
    try {
      await modifyEmployee(currentEmployee);
      fetchAllEmployees();
      setEdit(false);
      clearFields();
      MySwal.fire({
        title: "Registro Actualizado!",
        text: `El usuario ${currentEmployee.name} fue actualizado`,
        icon: "success",
        timer: 3500
      });
    } catch (error) {
      showError(error, "Error al actualizar el usuario");
    }
  }, [currentEmployee]);

  const deleteEmployee = useCallback(async (id: number) => {
    const employeeToDelete = employees.find(emp=> emp.id === id);
    const name = employeeToDelete?.name || "Desconocido";

    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: `Eliminarás al usuario ${name} de forma permanente`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo eliminar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await removeEmployee(id);
        fetchAllEmployees();
        MySwal.fire({
          title: "Eliminado!",
          text: `El usuario ${name} ha sido eliminado.`,
          icon: "success",
          timer: 2500
        });
      } catch (error) {
        showError(error, "Error al eliminar el usuario");
      }
    }
  }, [MySwal]);

  const fetchAllEmployees = useCallback(async () => {
    try {
      // console.log("Pasa el all fetch");
      const res = await fetchEmployees();
      // console.log(res);
      setEmployees(res.data);
    } catch (error) {
      showError(error, "Error al obtener los usuarios");
    }
  }, []);

  const showError = useCallback((error: AxiosError | unknown, message: string) => {
    let errorMessage = message;
    let detailedError = null;

    if (error && (error as AxiosError).response) {
      // Errores del servidor
      const axiosError = error as AxiosError;
      const data = axiosError.response?.data as { message?: string };
      detailedError = data.message || data || 'Error del servidor';
    } else if (error && (error as AxiosError).request) {
      // Errores de red o falta de respuesta del servidor
      detailedError = "No se pudo contactar al servidor. Por favor, intente más tarde.";
    } else if (error instanceof Error) {
      // Otros errores (ej. errores de código o de configuración)
      detailedError = error.message;
    } else {
      detailedError = "Error Desconocido D:";
    }

    MySwal.fire({
      title: "Oooops...",
      text: errorMessage,
      icon: "error",
      footer: detailedError,
      timer: 3500
    });
  }, [MySwal]);

  const clearFields = useCallback(() => {
    setCurrentEmployee({
      name: "",
      age: "",
      country: "",
      charge: "",
      years: "",
      id: 0
    });
  }, []);

  // const editEmployee = useCallback((employee: Employee) => {
  //   setEdit(true);
  //   setCurrentEmployee(employee);
  // }, []);

  const editEmployee = useCallback((id: number) => {
    const employeeToEdit = employees.find(emp=> emp.id === id);
    if(employeeToEdit) {
      setEdit(true);
      setCurrentEmployee(employeeToEdit);
    }
  }, [employees]);

  // Cargar empleados al montar el hook
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return {
    employees,
    edit,
    currentEmployee,
    handleSubmit,
    handleCancel,
    editEmployee,
    deleteEmployee,
    setCurrentEmployee
  };
};