import React, { useEffect, useState } from "react";
import { FormInstance, List, Space, Tag, message } from "antd";

import ISubject, {
  ISubjectOffer,
} from "../../../../types/apiResponses/subject";
import SubjectOfferForm, {
  ISubjectOfferFormValues,
} from "./offer-form/couseOfferForm";
import api from "../../../../services/request.service";

export interface ISubjectOfferList {
  id: number;
  subjectName: string;
  class: string;
  optionalSubject: boolean;
  semester: number;
}

interface ISubjectOffersProps {
  subjectsInfo: ISubject[];
  selectedCourse: number;
}

function SubjectOffers(props: ISubjectOffersProps) {
  const { subjectsInfo, selectedCourse } = props;

  const [courseOffers, setCouseOffers] = useState<ISubjectOfferList[]>(
    subjectsInfo.reduce((acc, e) => {
      if (e.offers) {
        const subjectOfferParsed = e.offers.map((each) => ({
          subjectName: e.name,
          optionalSubject: e.optionalSubject,
          id: each.id,
          class: each.class,
          semester: e.semester,
        }));
        return [...acc, ...subjectOfferParsed];
      }
      return acc;
    }, [])
  );

  useEffect(() => {
    setCouseOffers(
      subjectsInfo.reduce((acc, e) => {
        if (e.offers) {
          const subjectOfferParsed = e.offers.map((each) => ({
            subjectName: e.name,
            optionalSubject: e.optionalSubject,
            id: each.id,
            class: each.class,
            semester: e.semester,
          }));
          return [...acc, ...subjectOfferParsed];
        }
        return acc;
      }, [])
    );
  }, [selectedCourse]);

  const handleAddRequiredSubjets = async (
    addRequired: boolean,
    addOptional: boolean
  ) => {
    api
      .post(`/api/courses/${selectedCourse}/offerRequired`, {
        periodId: 1,
        addRequired,
        addOptional,
      }) // TODO period
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
        id: 1,
      },
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

  return (
    <>
      <SubjectOfferForm
        courseSubjects={subjectsInfo}
        onSubmit={onSubmit}
        handleAddRequiredSubjets={handleAddRequiredSubjets}
      />
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
              <b>Turma</b>
              <b>Tipo</b>
              <b>Semestre</b>
            </Space>
          </div>
        }
        dataSource={courseOffers}
        renderItem={(subjectOffer: ISubjectOfferList) => (
          <List.Item>
            <>
              {subjectOffer.subjectName}
              <Space size="small">
                <Tag color="blue">
                  {subjectOffer.class === "unique"
                    ? "Única"
                    : subjectOffer.class}
                </Tag>
                <Tag color="green">
                  {subjectOffer.optionalSubject ? "Opcional" : "Obrigatória"}
                </Tag>
                <Tag color="purple">{subjectOffer.semester}</Tag>
              </Space>
            </>
          </List.Item>
        )}
      />
    </>
  );
}

export default SubjectOffers;
