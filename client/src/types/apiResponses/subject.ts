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
}

export default ISubject;
