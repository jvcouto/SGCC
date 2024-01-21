import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Collapse,
  Descriptions,
  Divider,
  Empty,
  List,
  Tooltip,
  message,
} from "antd";
import {
  LockOutlined,
  StopOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { usePeriod } from "../../../../contexts/periodContext";
import api from "../../../../services/request.service";
import IDepartament from "../../../../types/apiResponses/departament";
import { ISubjectOffer } from "../../../../types/apiResponses/subject";
import ChargeListHeader from "./chargesListHeader";
import USER_ROLES from "../../../../utils/constants/userRoles";
import { useAuth } from "../../../../contexts/authContext";
import { ChargesRequestListActionsWrapper } from "./chargeList.style";

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

  const { user } = useAuth();

  const shouldRenderTeachersCancelButton = user?.roles.includes(
    USER_ROLES.TEACHER
  );

  const shouldRenderAdminsRemoveButton =
    user?.roles.includes(USER_ROLES.SYSTEM_ADMIN) ||
    user?.roles.includes(USER_ROLES.DEPARTAMENT_ADMIN);

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

        const newDepartamentChargesGrouped = { ...departamentChargesGrouped };

        newDepartamentChargesGrouped[offerUpdated.subject.course.name].find(
          (e) => e.id === offerUpdated.id
        ).teachers = offerUpdated.teachers;

        setDepartamentChargesGrouped(newDepartamentChargesGrouped);
      })
      .catch(() => {
        message.error("Algo deu errado, tente novamente!");
      });
  };

  const handleDeleteOfferRequest = (teacherId: string, offerId: number) => {
    api
      .post<{ data: ISubjectOffer }>(`/api/subjectOffer/${offerId}/delete`, {
        teacherId,
      })
      .then((response) => {
        message.success("Operação realizada com sucesso!");

        const { data: offerUpdated } = response.data;

        const newDepartamentChargesGrouped = { ...departamentChargesGrouped };

        newDepartamentChargesGrouped[offerUpdated.subject.course.name].find(
          (e) => e.id === offerUpdated.id
        ).teachers = offerUpdated.teachers;

        setDepartamentChargesGrouped(newDepartamentChargesGrouped);
      })
      .catch((error) => {
        const { code } = error.response.data;
        switch (code) {
          case "NOT_AUTHORIZED":
            message.error("Usuário não autorizado para realizar a ação!");
            break;

          default:
            message.error("Algo deu errado, tente novamente!");
            break;
        }
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
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Não há professores solicitantes"
                      />
                    ),
                  }}
                  renderItem={(teacher) => (
                    <List.Item>
                      <>
                        <List.Item.Meta
                          avatar={<Avatar src="" icon={<UserOutlined />} />}
                          title={teacher.name}
                          description={teacher.email}
                        />
                        <ChargesRequestListActionsWrapper>
                          {(shouldRenderAdminsRemoveButton ||
                            (shouldRenderTeachersCancelButton &&
                              teacher.id === user.id)) && (
                            <Tooltip
                              title={<FormattedMessage id="exclude.request" />}
                            >
                              <Button
                                type="text"
                                icon={<StopOutlined />}
                                danger
                                onClick={() =>
                                  handleDeleteOfferRequest(
                                    teacher.id,
                                    charge.id
                                  )
                                }
                              />
                            </Tooltip>
                          )}
                        </ChargesRequestListActionsWrapper>
                      </>
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
