import React, { useEffect, useState } from "react";
import {
  Button,
  Empty,
  FormInstance,
  List,
  Space,
  Tag,
  Tooltip,
  message,
} from "antd";

import { FormattedMessage } from "react-intl";
import ISubject, {
  ISubjectOffer,
} from "../../../../types/apiResponses/subject";
import SubjectOfferForm, {
  ISubjectOfferFormValues,
} from "./offer-form/couseOfferForm";
import api from "../../../../services/request.service";
import { usePeriod } from "../../../../contexts/periodContext";
import ICourse from "../../../../types/apiResponses/course";
import OfferTeachersModal from "./offerTeachersModal/offerTeacherModal";
import DepartamentTextModal from "./departamentTextModal/departamentTextModal";
import {
  CurseOfferButtonsHeader,
  LeftHeaderButton,
} from "./courseOffers.style";

export interface ISubjectOfferList {
  id: number;
  subjectName: string;
  class: string;
  optionalSubject: boolean;
  semester: number;
  places: number;
  closed: boolean;
}

interface ISubjectOffersProps {
  subjectsInfo: ISubject[];
  selectedCourse: number;
}

function SubjectOffers(props: ISubjectOffersProps) {
  const { selectedCourse, subjectsInfo } = props;

  const { selectedPeriod } = usePeriod();
  const [courseOffers, setCouseOffers] = useState<ISubjectOfferList[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacherOffers, setSelectedTeacherOffer] = useState<number>();
  const [textModalOpen, setTextModalOpen] = useState(false);

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
              const subjectOfferParsed = eachSubject.offers.map(
                (eachOffer) => ({
                  subjectName: eachSubject.name,
                  optionalSubject: eachSubject.optionalSubject,
                  id: eachOffer.id,
                  class: eachOffer.class,
                  semester: eachSubject.semester,
                  places: eachOffer.places,
                  closed: eachOffer.closed,
                })
              );
              return [...acc, ...subjectOfferParsed];
            }
            return acc;
          }, [])
        );
      });
  }, [selectedCourse, selectedPeriod]);

  const handleAddRequiredSubjets = async (
    addRequired: boolean,
    addOptional: boolean
  ) => {
    api
      .post(`/api/courses/${selectedCourse}/offerRequired`, {
        periodId: selectedPeriod,
        addRequired,
        addOptional,
      })
      .then((response) => {
        message.success("Ofertas adicionadas!");
        const { data: newSubjectOffers }: { data: ISubjectOffer[] } =
          response.data;
        setCouseOffers([
          ...courseOffers,
          ...newSubjectOffers.map((newSubjectOffer) => ({
            id: newSubjectOffer.id,
            class: newSubjectOffer.class,
            optionalSubject: newSubjectOffer.subject.optionalSubject,
            subjectName: newSubjectOffer.subject.name,
            semester: newSubjectOffer.subject.semester,
            places: newSubjectOffer.places,
            closed: newSubjectOffer.closed,
          })),
        ]);
      })
      .catch((error: any) => {
        const { code } = error.response.data;
        switch (code) {
          case "DUPLICATED_ENTITY":
            message.error("Uma ou mais disciplinas já foram adicionadas");
            break;
          default:
            message.error("Algo deu errado, tente novamente!");
            break;
        }
      });
  };

  const onSubmit = async (
    values: ISubjectOfferFormValues,
    form: FormInstance<any>
  ) => {
    const newCourseOffer = {
      subject: {
        id: values.subject,
      },
      class: values.class,
      period: {
        id: selectedPeriod,
      },
      places: values.places,
    };
    api
      .post(`/api/subjectOffer`, newCourseOffer)
      .then((response) => {
        message.success("Oferta adicionada!");
        const {
          data: [newSubjectOffer],
        }: { data: ISubjectOffer[] } = response.data;
        setCouseOffers([
          ...courseOffers,
          {
            id: newSubjectOffer.id,
            class: newSubjectOffer.class,
            optionalSubject: newSubjectOffer.subject.optionalSubject,
            subjectName: newSubjectOffer.subject.name,
            semester: newSubjectOffer.subject.semester,
            places: newSubjectOffer.places,
            closed: newSubjectOffer.closed,
          },
        ]);

        form.resetFields();
      })
      .catch((error: any) => {
        const { code } = error.response.data;
        switch (code) {
          case "DUPLICATED_ENTITY":
            message.error("Uma ou mais disciplinas já foram adicionadas");
            break;

          default:
            message.error("Algo deu errado, tente novamente!");
            break;
        }
      });
  };

  const handleTeachersModal = (offerId: number) => {
    setSelectedTeacherOffer(offerId);
    setIsModalOpen(true);
  };

  return (
    <>
      <CurseOfferButtonsHeader>
        <LeftHeaderButton
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Button
            onClick={() => {
              setTextModalOpen(true);
            }}
            type="primary"
          >
            Gerar Texto de ofertas
          </Button>
        </LeftHeaderButton>

        <SubjectOfferForm
          courseSubjects={subjectsInfo}
          onSubmit={onSubmit}
          handleAddRequiredSubjets={handleAddRequiredSubjets}
        />
      </CurseOfferButtonsHeader>
      <List
        header={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <div>
              <b>Disciplina</b>
            </div>
            <Space size="large">
              <b>Professores</b>
              <b>Turma</b>
              <b>Vagas</b>
              <b>Tipo</b>
              <b>Semestre</b>
            </Space>
          </div>
        }
        dataSource={courseOffers}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Não há disciplinas ofertadas"
            />
          ),
        }}
        renderItem={(subjectOffer: ISubjectOfferList) => (
          <List.Item>
            <>
              {subjectOffer.subjectName}
              <Space size="middle">
                <Tooltip
                  title={
                    !subjectOffer.closed ? (
                      <FormattedMessage id="offer.teachers" />
                    ) : undefined
                  }
                >
                  <Button
                    type="link"
                    onClick={() => handleTeachersModal(subjectOffer.id)}
                    disabled={!subjectOffer.closed}
                  >
                    Professores
                  </Button>
                </Tooltip>

                <Tag color="blue">
                  {subjectOffer.class === "unique"
                    ? "Única"
                    : subjectOffer.class}
                </Tag>
                <Tag color="yellow">{subjectOffer.places}</Tag>
                <Tag color="green">
                  {subjectOffer.optionalSubject ? "Opcional" : "Obrigatória"}
                </Tag>
                <Tag color="purple">
                  {subjectOffer.semester === 99 ? "OP" : subjectOffer.semester}
                </Tag>
              </Space>
            </>
          </List.Item>
        )}
      />

      <OfferTeachersModal
        setIsModalOpen={setIsModalOpen}
        offerId={selectedTeacherOffers}
        open={isModalOpen}
      />

      <DepartamentTextModal
        setIsModalOpen={setTextModalOpen}
        selectedCourse={selectedCourse}
        open={textModalOpen}
      />
    </>
  );
}

export default SubjectOffers;
