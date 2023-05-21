declare namespace Express {
  export interface Request {
    user?: {
      uuid: string;
      userRoles: Array<string>;
    };
  }
}
