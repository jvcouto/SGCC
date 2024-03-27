import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";
import CreateSubjectOffer from "./create";
import RequestSubjectOffer from "./requestSubject";
import DeleteSubjectRequest from "./deleteSubjectRequest";
import UpdateSubjectOffer from "./update";
import CloseOffers from "./closeOffers";
import GetOfferTeachers from "./getTeachers";
import List from "./list";
import FindOneSubjectOffer from "./findOne";

const subjectOfferRepository = new SubjectOfferRepository();

const createSubjectOffer = new CreateSubjectOffer(subjectOfferRepository);

const requestSubjectOffer = new RequestSubjectOffer(subjectOfferRepository);

const deleteSubjectRequest = new DeleteSubjectRequest(subjectOfferRepository);

const updateSubjectOffer = new UpdateSubjectOffer(subjectOfferRepository);

const closeSubjectOffer = new CloseOffers(subjectOfferRepository);

const getOfferTeachers = new GetOfferTeachers(subjectOfferRepository);

const listSubjectOffers = new List(subjectOfferRepository);

const findOneOffer = new FindOneSubjectOffer(subjectOfferRepository);

export {
  createSubjectOffer,
  requestSubjectOffer,
  deleteSubjectRequest,
  updateSubjectOffer,
  closeSubjectOffer,
  getOfferTeachers,
  listSubjectOffers,
  findOneOffer,
};
