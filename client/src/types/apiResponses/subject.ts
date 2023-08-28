interface IDepartament {
  id: number;
  name: string;
  code: string;
}

interface ISubject {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  semester: number;
  workload: number;
  theoreticalWorkload: number;
  praticalWorkload: number;
  optionalSubject: boolean;
  departament: IDepartament;
}

export default ISubject;
