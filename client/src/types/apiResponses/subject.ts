interface IDepartament {
  id: number;
  name: string;
  code: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  sysAdmin: boolean;
  firstLogin: boolean;
}

interface ICourse {
  id: number;
  name: string;
  duration: number;
  shift: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISubjectOffer {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  class: string;
  places: number;
  subject?: ISubject;
  teachers?: IUser[];
  closed: boolean;
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
  offers?: ISubjectOffer[];
  shortName: string;
  places: number;
  course?: ICourse;
  curriculum: Date;
  syllabus: string;
  objective: string;
  bibliography: string;
  complementaryBibliography: string;
  preRequisite: Array<ISubject>;
  coRequisite: Array<ISubject>;
}

export default ISubject;
