import { ITeachingPlan } from "./teachingPlan";

interface IDepartament {
  id: number;
  name: string;
  code: string;
  teachers?: IUser[];
  admins?: IAdmins[];
  subjects?: ISubject[];
}

interface IAdmins {
  id: number;
  adminRole: string;
  user?: IUser;
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
  teachingPlan: ITeachingPlan;
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
