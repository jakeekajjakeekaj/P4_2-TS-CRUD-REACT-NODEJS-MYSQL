export interface Employee {
  name: string;
  age: number | string;
  country: string;
  charge: string;
  years: number | string;
  id: number;
}

export interface EmployeeFormProps {
  name: string;
  setName: (value: string) => void;
  age: string | number;
  setAge: (value: string | number) => void;
  country: string;
  setCountry: (value: string) => void;
  charge: string;
  setCharge: (value: string) => void;
  years: string | number;
  setYears: (value: string | number) => void;
  edit: boolean;
  handleSubmit: (event: React.FormEvent) => void;
  handleCancel: () => void;
}

export interface EmployeeListProps {
  employees: Employee[];
  editEmp: (id: number)=> void;
  deleteEmp: (id: number)=> void;
}

export interface EmployeeRowProps {
  val: Employee;
  index: number;
  editEmp: (id: number)=> void;
  deleteEmp: (id: number, name: string)=> void;
}