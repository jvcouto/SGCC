import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import SubjectRepository from "@dataAccess/subject.repository";

export default class ListSubjects {
  constructor(private readonly repository: SubjectRepository) {}

  async execute(query: unknown) {
    try {
      return await this.repository.find(query);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting subjects");
    }
  }
}
