import React, { useEffect, useState } from "react";
import { FormInstance, List, Tag, message } from "antd";

import ISubject, {
  ISubjectOffer,
} from "../../../../types/apiResponses/subject";
import SubjectOfferForm, {
  ISubjectOfferFormValues,
} from "./offer-form/couseOfferForm";
import api from "../../../../services/request.service";

interface ISubjectOffersProps {
  subjectsInfo: ISubject[];
  selectedCourse: number;
}

function SubjectOffers(props: ISubjectOffersProps) {
  const { subjectsInfo, selectedCourse } = props;

  const [courseOffers, setCouseOffers] = useState(
    subjectsInfo.reduce(
      (acc, e) => {
        if (e.offers) {
          const subjectOfferParsed = e.offers.map((each) => ({
            subjectName: e.name,
            optionalSubject: e.optionalSubject,
            id: each.id,
            class: each.class,
          }));
          return [...acc, ...subjectOfferParsed];
        }
        return acc;
      },
      [selectedCourse]
    )
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
          }));
          return [...acc, ...subjectOfferParsed];
        }
        return acc;
      }, [])
    );
  }, [selectedCourse]);

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
          },
        ]);

        form.resetFields();
      })
      .catch(() => {
        message.error("Algo deu errado, tente novamente!");
      });
  };

  return (
    <>
      <SubjectOfferForm courseSubjects={subjectsInfo} onSubmit={onSubmit} />
      <List
        dataSource={courseOffers}
        renderItem={(subjectOffer: {
          id: number;
          subjectName: string;
          class: string;
          optionalSubject: boolean;
        }) => (
          <List.Item>
            <>
              {subjectOffer.subjectName}
              <div>
                <Tag color="blue">{subjectOffer.class}</Tag>
                <Tag color="green">
                  {subjectOffer.optionalSubject ? "Opcional" : "Obrigatória"}
                </Tag>
              </div>
            </>
          </List.Item>
        )}
      />
    </>
  );
}

export default SubjectOffers;
