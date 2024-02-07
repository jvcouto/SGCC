import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";
import { IUser } from "src/interfaces/user.interface";
import InvalidQueryStringItemError from "@errors/invalidQueryStringItem.error";

export interface OffersQueryOpts {
  page?: number;
  period?: number;
}

export default class List {
  constructor(private readonly repository: SubjectOfferRepository) {}

  private PERMITTED_QUERY_ITEMS = ["page", "period"];

  private _validadeQueryString(query: any) {
    for (const key in query) {
      if (!this.PERMITTED_QUERY_ITEMS.includes(key)) {
        throw new InvalidQueryStringItemError("Invalid query item");
      }
    }

    return query as OffersQueryOpts;
  }

  async execute(user: IUser, query: any) {
    const queryItems = this._validadeQueryString(query);

    try {
      const subjectOffers = await this.repository.find({
        query: queryItems,
        user,
      });

      return subjectOffers;
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fetching subject offers");
    }
  }
}
