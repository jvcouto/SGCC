import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import UserRepository from "@dataAccess/user.repository";
import InvalidQueryStringItemError from "@errors/invalidQueryStringItem.error";

export interface UserQueryOpts {
  name?: string;
}

export default class ListUsers {
  constructor(private readonly repository: UserRepository) {}

  private PERMITTED_QUERY_ITEMS = ["name"];

  private _validadeQueryString(query: any) {
    for (const key in query) {
      if (!this.PERMITTED_QUERY_ITEMS.includes(key)) {
        throw new InvalidQueryStringItemError("Invalid query item");
      }
    }

    return query as UserQueryOpts;
  }

  async execute(query: unknown) {
    const queryItems = this._validadeQueryString(query);
    try {
      return await this.repository.findAll(queryItems);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting users");
    }
  }
}
