import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import Subject from "@models/subject.model";
import SubjectRepository from "@dataAccess/subject.repository";

export default class ListSubjects {
  constructor(private readonly repository: SubjectRepository) {}

  async execute(params: any) {
    try {
      return await this.repository.find(params);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting subjects");
    }
  }
}
