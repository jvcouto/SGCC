import React, { useState } from "react";
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

  return (
    <TeachingPlanContentWrapper>
      <Title level={5}>Plano da Oferta</Title>
      {teachingPlanInfo ? (
        <>
          <ContentAddButtonWrapper>
            <Button onClick={() => {}} type="link">
              Editar
            </Button>
          </ContentAddButtonWrapper>
          <Descriptions layout="vertical">
            <Descriptions.Item label="Conteúdo">
              {teachingPlanInfo.content}
            </Descriptions.Item>
            <Descriptions.Item label="Métodologia">
              {teachingPlanInfo.methodology}
            </Descriptions.Item>
            <Descriptions.Item label="Critério de avaliação">
              {teachingPlanInfo.ratingCriteria}
            </Descriptions.Item>
            <Descriptions.Item label="Horário de Atendimento">
              {teachingPlanInfo.serviceHours}
            </Descriptions.Item>
            <Descriptions.Item label="Substitutiva">
              {teachingPlanInfo.substitute}
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
