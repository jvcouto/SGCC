import ISubject from "./subject";

interface ICourseAdmins {
  id: number;
  adminRole: string;
  user?: IUser;
}

interface ICourse {
  id: number;
  name: string;
  duration: number;
  shift: string;
  createdAt: string;
  updatedAt: string;
  collegeMembers?: IUser[];
  admins?: ICourseAdmins[];
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
