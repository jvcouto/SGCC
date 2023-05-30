import saveSubjectOffer from "@dataAccess/subjectOffer/save";
import CreateSubjectOffer from "./create";

const createSubjectOffer = new CreateSubjectOffer(saveSubjectOffer);

export { createSubjectOffer };
