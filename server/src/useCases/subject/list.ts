import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import Subject from "@models/subject.model";

export default class ListSubjects {
  constructor(
    private readonly findSubjects: (params: any) => Promise<[Subject[], number]>
  ) {}

  async list(params: any) {
    try {
      const data = await this.findSubjects(params);
      console.log(data);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting subjects");
    }
  }
}
