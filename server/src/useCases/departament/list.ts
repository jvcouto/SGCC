import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import DepartamentRepository from "@dataAccess/departament.repository";
import InvalidQueryStringItemError from "@errors/invalidQueryStringItem.error";

export interface DepartamentQueryOpts {
  page?: number;
}

export default class FindAllDepartaments {
  constructor(private readonly repository: DepartamentRepository) {}

  private PERMITTED_QUERY_ITEMS = ["page"];

  private _validadeQueryString(query: any) {
    for (const key in query) {
      if (!this.PERMITTED_QUERY_ITEMS.includes(key)) {
        throw new InvalidQueryStringItemError("Invalid query item");
      }
    }

    return query as DepartamentQueryOpts;
  }

  async execute(query: unknown) {
    const queryItems = this._validadeQueryString(query);

    try {
      return await this.repository.findAll(queryItems);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting departaments");
    }
  }
}
