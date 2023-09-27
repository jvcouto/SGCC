interface IDepartament {
  id: number;
  name: string;
  code: string;
}

export interface ISubjectOffer {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  class: string;
  places: number;
  teachingPlan: any; // todo
  teachingPlanApproved: boolean;
  subject: ISubject;
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
}

export default ISubject;
