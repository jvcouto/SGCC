import TeachingPlanRepository from "@dataAccess/teachingPlan.repository";
import UpdateTeachingPlan from "./update";
import CreateTeachingPlan from "./create";

const teachingPlanRepository = new TeachingPlanRepository();

const updateTeachingPlan = new UpdateTeachingPlan(teachingPlanRepository);

const createTeachingPlan = new CreateTeachingPlan(teachingPlanRepository);

export { updateTeachingPlan, createTeachingPlan };
