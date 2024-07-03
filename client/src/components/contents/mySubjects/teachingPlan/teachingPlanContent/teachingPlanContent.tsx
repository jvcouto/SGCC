import React, { useEffect, useState } from "react";
import { Button, Descriptions } from "antd";
import Title from "antd/lib/typography/Title";
import { ITeachingPlan } from "../../../../../types/apiResponses/teachingPlan";
import TeachingPlanForm from "../teachingPlanForm/teachingPlanForm";
import { TeachingPlanContentWrapper } from "./teachingPlanContentWrapper.style";
import { ContentAddButtonWrapper } from "../../../content.style";

interface ITeachingPlanContent {
  subjectOfferId: number;
  teachingPlanInfo: ITeachingPlan;
}

function TeachingPlanContent(props: ITeachingPlanContent) {
  const { teachingPlanInfo, subjectOfferId } = props;

  const [teachingPlan, setTeachingPlan] = useState(teachingPlanInfo);

  useEffect(() => {
    setTeachingPlan(teachingPlanInfo);
  }, [subjectOfferId]);

  return (
    <TeachingPlanContentWrapper>
      <Title level={5}>Plano da Oferta</Title>
      {teachingPlan ? (
        <>
          <ContentAddButtonWrapper>
            <Button onClick={() => {}} type="link">
              Editar
            </Button>
          </ContentAddButtonWrapper>
          <Descriptions layout="vertical" bordered column={1}>
            <Descriptions.Item label="Conteúdo">
              {teachingPlan.content}
            </Descriptions.Item>
            <Descriptions.Item label="Métodologia">
              {teachingPlan.methodology}
            </Descriptions.Item>
            <Descriptions.Item label="Critério de avaliação">
              {teachingPlan.ratingCriteria}
            </Descriptions.Item>
            <Descriptions.Item label="Horário de Atendimento">
              {teachingPlan.serviceHours}
            </Descriptions.Item>
            <Descriptions.Item label="Substitutiva">
              {teachingPlan.substitute}
            </Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        <TeachingPlanForm
          subjectOfferId={subjectOfferId}
          setTeachingPlan={setTeachingPlan}
        />
      )}
    </TeachingPlanContentWrapper>
  );
}

export default TeachingPlanContent;
