import React from "react";
import { Descriptions } from "antd";
import ISubject from "../../../../../types/apiResponses/subject";

interface ITeachingPlanContent {
  subject: ISubject;
}

function SubjectTeachingPlan(props: ITeachingPlanContent) {
  const { subject } = props;
  return (
    <Descriptions title="Plano de ensino da disciplina" layout="vertical">
      <Descriptions.Item label="Curriculo">
        {new Date(subject.curriculum).getFullYear()}
      </Descriptions.Item>
      <Descriptions.Item label="Ementa">{subject.syllabus}</Descriptions.Item>
      <Descriptions.Item label="Objectivo">
        {subject.objective}
      </Descriptions.Item>
      <Descriptions.Item label="Bibliografia">
        {subject.bibliography}
      </Descriptions.Item>
      <Descriptions.Item label="Bibliografia Complementar">
        {subject.complementaryBibliography}
      </Descriptions.Item>
      <Descriptions.Item label="Pré Requisito">
        {subject.preRequisite.length
          ? subject.preRequisite?.map((e) => e.name).join(", ")
          : "-"}
      </Descriptions.Item>
      <Descriptions.Item label="Co Requisito">
        {subject.coRequisite.length
          ? subject.coRequisite?.map((e) => e.name).join(", ")
          : "-"}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default SubjectTeachingPlan;
