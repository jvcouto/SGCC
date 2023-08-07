import IUser from "./users";

interface IAdmins {
  id: number;
  adminRole: string;
  user?: IUser;
}

export default IAdmins;
