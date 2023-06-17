import ISubject from "./subject";

interface ICourse {
  id: number;
  name: string;
  duration: number;
  shift: string;
  createdAt: string;
  updatedAt: string;
  collegeMembers?: IUser[];
  admins?: IUser[];
  subjects?: ISubject[];
}

interface IUser {
  id: string;
  name: string;
  email: string;
  sysAdmin: boolean;
  firstLogin: boolean;
  colleges?: ICourse[];
  administrating?: ICourse[];
  roles: number[];
}

export default IUser;
