import IAdmins from "./admins";
import IUser from "./users";

interface IDepartament {
  id: number;
  name: string;
  code: string;
  teachers: IUser[];
  admins: IAdmins[];
}

export default IDepartament;
