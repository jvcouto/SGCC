import React from "react";
import { Descriptions } from "antd";
import PageContent from "../../../styles/content.style";
import { ISubjectOffer } from "../../../types/apiResponses/subject";
import TeachingPlan from "./teachingPlan/teachingPlan";

interface IMySubjectsProps {
  subjectOffer: ISubjectOffer;
}

function MySubject(props: IMySubjectsProps) {
  const { subjectOffer } = props;
  return (
    <PageContent>
      <Descriptions title="Informações da disciplina">
        <Descriptions.Item label="Nome">
          {subjectOffer.subject.name}
        </Descriptions.Item>
        <Descriptions.Item label="Nome breve">
          {subjectOffer.subject.shortName}
        </Descriptions.Item>
        <Descriptions.Item label="Curso">
          {subjectOffer.subject.course.name}
        </Descriptions.Item>
        <Descriptions.Item label="Opcional">
          {subjectOffer.subject.optionalSubject ? "Sim" : "Não"}
        </Descriptions.Item>
        <Descriptions.Item label="Semestre">
          {subjectOffer.subject.semester}
        </Descriptions.Item>
        <Descriptions.Item label="Carga horária total">
          {subjectOffer.subject.workload}
        </Descriptions.Item>
        <Descriptions.Item label="Carga horária teórica">
          {subjectOffer.subject.theoreticalWorkload}
        </Descriptions.Item>
        <Descriptions.Item label="Carga horária prática">
          {subjectOffer.subject.praticalWorkload}
        </Descriptions.Item>
        <Descriptions.Item label="Vagas">
          {subjectOffer.subject.places}
        </Descriptions.Item>
      </Descriptions>

      <TeachingPlan subjectOffer={subjectOffer} />
    </PageContent>
  );
}

export default MySubject;
