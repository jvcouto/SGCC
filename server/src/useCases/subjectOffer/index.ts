import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";
import CreateSubjectOffer from "./create";
import RequestSubjectOffer from "./requestSubject";

const subjectOfferRepository = new SubjectOfferRepository();

const createSubjectOffer = new CreateSubjectOffer(subjectOfferRepository);

const requestSubjectOffer = new RequestSubjectOffer(subjectOfferRepository);

export { createSubjectOffer, requestSubjectOffer };
