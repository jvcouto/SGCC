import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";
import CreateSubjectOffer from "./create";
import RequestSubjectOffer from "./requestSubject";
import DeleteSubjectRequest from "./deleteSubjectRequest";
import UpdateSubjectOffer from "./update";
import CloseOffers from "./closeOffers";

const subjectOfferRepository = new SubjectOfferRepository();

const createSubjectOffer = new CreateSubjectOffer(subjectOfferRepository);

const requestSubjectOffer = new RequestSubjectOffer(subjectOfferRepository);

const deleteSubjectRequest = new DeleteSubjectRequest(subjectOfferRepository);

const updateSubjectOffer = new UpdateSubjectOffer(subjectOfferRepository);

const closeSubjectOffer = new CloseOffers(subjectOfferRepository);

export {
  createSubjectOffer,
  requestSubjectOffer,
  deleteSubjectRequest,
  updateSubjectOffer,
  closeSubjectOffer,
};
