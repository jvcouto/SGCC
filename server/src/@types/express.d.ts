declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      userRoles: Array<string>;
    };
  }
}
