import { Row, Col, Card, Badge } from "antd";
import React, { useEffect, useState } from "react";
import { maxBy } from "lodash";
import api from "../../../../services/request.service";
import ICourse from "../../../../types/apiResponses/course";
import { usePeriod } from "../../../../contexts/periodContext";
import splitArrayIntoChunks from "../../../../utils/dataManipulation/array";
import { ITeachingPlan } from "../../../../types/apiResponses/teachingPlan";
import { ISubjectApprovalHistory } from "../../../../types/apiResponses/subject";
import HistoryModal from "./historyModal";

interface IPlanEvaluationProps {
  selectedCourse: number;
}

export interface ISubjectOfferList {
  id: number;
  subjectName: string;
  class: string;
  optionalSubject: boolean;
  semester: number;
  places: number;
  closed: boolean;
  teachers: Array<{
    name: string;
    email: string;
  }>;
  teachingPlan: ITeachingPlan;
  approvalHistory: ISubjectApprovalHistory[];
}

function PlanEvaluation(props: IPlanEvaluationProps) {
  const { selectedCourse } = props;
  const { selectedPeriod } = usePeriod();

  const [courseOffers, setCouseOffers] = useState<ISubjectOfferList[]>();

  const [selectedOffer, setSelectedOffer] = useState<ISubjectOfferList>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    api
      .get<{ data: ICourse }>(
        `api/courses/${selectedCourse}?period=${selectedPeriod}`
      )
      .then((response) => {
        const courseResponse = response.data.data;
        setCouseOffers(
          courseResponse.subjects.reduce((acc, eachSubject) => {
            if (eachSubject.offers) {
              const subjectOfferParsedWithTeachingPlan = eachSubject.offers
                .map((eachOffer) => ({
                  subjectName: eachSubject.name,
                  optionalSubject: eachSubject.optionalSubject,
                  id: eachOffer.id,
                  class: eachOffer.class,
                  semester: eachSubject.semester,
                  places: eachOffer.places,
                  closed: eachOffer.closed,
                  teachers: eachOffer?.teachers?.map((e) => ({
                    name: e.name,
                    email: e.email,
                  })),
                  teachingPlan: eachOffer.teachingPlan,
                  approvalHistory: eachOffer.subjectApprovalHistory,
                }))
                .filter((e) => e.teachingPlan);
              return [...acc, ...subjectOfferParsedWithTeachingPlan];
            }
            return acc;
          }, [])
        );
      });
  }, [selectedCourse, selectedPeriod, selectedOffer]);

  function handleCardClick(e: ISubjectOfferList) {
    setSelectedOffer(e);
    setModalOpen(true);
  }

  function getBadgeText(e: ISubjectOfferList) {
    if (!e.approvalHistory.length)
      return { message: "Pendente", color: "blue" };

    const maxDateApprovalHistory = maxBy(e.approvalHistory, "createdAt");

    if (maxDateApprovalHistory.approve)
      return { message: "Aprovado", color: "green" };

    return { message: "Rejeitado", color: "red" };
  }

  return (
    <>
      {splitArrayIntoChunks<ISubjectOfferList>(courseOffers, 3).reduce(
        (acc, curr) => {
          const rowComponent = (
            <Row gutter={16}>
              {curr.map((e) => (
                <Col span={8}>
                  <Badge.Ribbon
                    text={getBadgeText(e).message}
                    color={getBadgeText(e).color}
                  >
                    <Card
                      hoverable
                      title={e.subjectName}
                      onClick={() => handleCardClick(e)}
                      bordered
                      headStyle={{
                        fontSize: "0.8rem",
                      }}
                    >
                      <span>
                        <b> Turma:</b> {e.class}
                      </span>

                      <br />
                      <br />

                      <h3>Professores:</h3>
                      {e?.teachers?.map((teacher) => (
                        <span>
                          <b>Nome: </b> {teacher.name}
                          <br />
                          <b>Email: </b>
                          {teacher.email}
                        </span>
                      ))}
                    </Card>
                  </Badge.Ribbon>
                </Col>
              ))}
            </Row>
          );

          acc.push(rowComponent);
          return acc;
        },
        [] as Array<React.JSX.Element>
      )}
      <HistoryModal
        isModalOpen={modalOpen}
        setIsModalOpen={setModalOpen}
        teachingPlan={selectedOffer?.teachingPlan}
        approvalHistory={selectedOffer?.approvalHistory}
        subjectName={selectedOffer?.subjectName}
        offerId={selectedOffer?.id}
        setSelectedOffer={setSelectedOffer}
      />
    </>
  );
}

export default PlanEvaluation;
