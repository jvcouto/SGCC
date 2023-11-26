import IAdmins from "./admins";
import ISubject from "./subject";
import IUser from "./users";

interface IDepartament {
  id: number;
  name: string;
  code: string;
  teachers: IUser[];
  admins: IAdmins[];
  subjects: ISubject[];
}

export default IDepartament;
