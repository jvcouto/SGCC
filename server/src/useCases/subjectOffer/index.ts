import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";
import CreateSubjectOffer from "./create";
import RequestSubjectOffer from "./requestSubject";
import DeleteSubjectRequest from "./deleteSubjectRequest";

const subjectOfferRepository = new SubjectOfferRepository();

const createSubjectOffer = new CreateSubjectOffer(subjectOfferRepository);

const requestSubjectOffer = new RequestSubjectOffer(subjectOfferRepository);

const deleteSubjectRequest = new DeleteSubjectRequest(subjectOfferRepository);

export { createSubjectOffer, requestSubjectOffer, deleteSubjectRequest };
