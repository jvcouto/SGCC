import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import Subject from "@models/subject.model";
import SubjectRepository from "@dataAccess/subject.repository";

export default class ListSubjects {
  constructor(private readonly repository: SubjectRepository) {}

  async execute(params: any) {
    try {
      const data = await this.repository.find(params);
      console.log(data);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting subjects");
    }
  }
}
