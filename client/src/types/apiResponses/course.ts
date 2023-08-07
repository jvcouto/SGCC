import IAdmins from "./admins";
import ISubject from "./subject";
import IUser from "./users";

interface ICourse {
  id: number;
  name: string;
  duration: number;
  shift: string;
  createdAt: string;
  updatedAt: string;
  collegeMembers?: IUser[];
  admins?: IAdmins[];
  subjects?: ISubject[];
}

export default ICourse;
