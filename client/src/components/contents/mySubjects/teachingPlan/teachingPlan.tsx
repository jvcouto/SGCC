import React from "react";

import { Divider } from "antd";
import TeachingPlanContent from "./teachingPlanContent/teachingPlanContent";
import SubjectTeachingPlan from "./subjectTeachingPlan/subjectTeachingPlan";
import { ISubjectOffer } from "../../../../types/apiResponses/subject";

interface ITeachingPlanProps {
  subjectOffer: ISubjectOffer;
}

function TeachingPlan(props: ITeachingPlanProps) {
  const { subjectOffer } = props;
  return (
    <>
      <Divider />
      <SubjectTeachingPlan subject={subjectOffer.subject} />

      <Divider />
      <TeachingPlanContent
        subjectOfferId={subjectOffer.id}
        teachingPlanInfo={subjectOffer.teachingPlan}
      />
    </>
  );
}

export default TeachingPlan;
