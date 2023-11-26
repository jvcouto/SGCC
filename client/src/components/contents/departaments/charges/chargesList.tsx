import React, { useEffect, useState } from "react";
import { Avatar, Collapse, Descriptions, Divider, List, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { usePeriod } from "../../../../contexts/periodContext";
import api from "../../../../services/request.service";
import IDepartament from "../../../../types/apiResponses/departament";
import { ISubjectOffer } from "../../../../types/apiResponses/subject";
import ChargeListHeader from "./chargesListHeader";

const { Panel } = Collapse;

interface DepartamentChargesListProps {
  departamentId: number;
}

interface IOffersGroupedByCourse {
  [key: string]: ISubjectOffer[];
}

function ChargesList(props: DepartamentChargesListProps) {
  const { departamentId } = props;
  const { selectedPeriod } = usePeriod();

  const [departamentChargesGrouped, setDepartamentChargesGrouped] =
    useState<IOffersGroupedByCourse>();

  useEffect(() => {
    api
      .get<{ data: IDepartament }>(
        `api/departaments/${departamentId}?period=${selectedPeriod}`
      )
      .then((response) => {
        const departamentResponse = response.data.data;
        const chargesGrouped = departamentResponse.subjects.reduce((acc, e) => {
          if (acc[e.course.name]) {
            acc[e.course.name] = [
              ...acc[e.course.name],
              ...e.offers.map((eachOffer) => {
                const offerWithSubject = { ...eachOffer, subject: e };
                return offerWithSubject;
              }),
            ];
            return acc;
          }
          acc[e.course.name] = e.offers.map((eachOffer) => {
            const offerWithSubject = { ...eachOffer, subject: e };
            return offerWithSubject;
          });
          return acc;
        }, {});
        setDepartamentChargesGrouped(chargesGrouped);
      });
  }, [departamentId, selectedPeriod]);

  const handleRequest = (id: number) => {
    api
      .patch<{ data: ISubjectOffer }>(`/api/subjectOffer/${id}/request`)
      .then((response) => {
        message.success("Solicitação adicionada!");
        const { data: offerUpdated } = response.data;

        const newDepartamentChargesGrouped = departamentChargesGrouped[
          offerUpdated.subject.course.name
        ].find((e) => e.id === offerUpdated.id);

        // setDepartamentChargesGrouped();
      })
      .catch(() => {
        message.error("Algo deu errado, tente novamente!");
      });
  };

  return (
    <>
      {Object.keys(departamentChargesGrouped ?? {}).map((eachCourse) => (
        <>
          <Divider orientation="left" orientationMargin="0">
            {eachCourse}
          </Divider>

          <Collapse collapsible="icon">
            {departamentChargesGrouped[eachCourse].map((charge) => (
              <Panel
                header={
                  <ChargeListHeader
                    subjectName={charge.subject.name}
                    subjectOfferTeachers={charge.teachers}
                    subjectOfferId={charge.id}
                    handleRequest={handleRequest}
                  />
                }
                key={charge.id}
              >
                <Descriptions title="Informações do Encargo">
                  <Descriptions.Item label="Turma">
                    {charge.class}
                  </Descriptions.Item>
                  <Descriptions.Item label="Semestre">
                    {charge.subject.semester}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vagas">
                    {charge.subject.places}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tipo">
                    {charge.subject.optionalSubject
                      ? "Opicional"
                      : "Obrigatória"}
                  </Descriptions.Item>
                </Descriptions>
                <Divider orientation="left" orientationMargin="0">
                  Professores Solicitantes
                </Divider>
                <List
                  itemLayout="horizontal"
                  dataSource={charge.teachers}
                  renderItem={(teacher) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="" icon={<UserOutlined />} />}
                        title={teacher.name}
                        description={teacher.email}
                      />
                    </List.Item>
                  )}
                />
              </Panel>
            ))}
          </Collapse>
        </>
      ))}
    </>
  );
}

export default ChargesList;
