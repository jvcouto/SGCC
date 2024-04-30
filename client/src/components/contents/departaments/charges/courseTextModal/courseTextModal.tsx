import React, { useEffect, useState } from "react";

import { Modal, Radio, RadioChangeEvent } from "antd";

import { ISubjectOffer } from "../../../../../types/apiResponses/subject";

import { useAuth } from "../../../../../contexts/authContext";
import api from "../../../../../services/request.service";
import IDepartament from "../../../../../types/apiResponses/departament";
import { usePeriod } from "../../../../../contexts/periodContext";
import ICourse from "../../../../../types/apiResponses/course";
import CourseAdminRole from "../../../../../utils/constants/courseRoles";

interface IOffersGroupedByCourse {
  [key: string]: {
    offers: Array<ISubjectOffer>;
    course: ICourse;
  };
}

interface IDepartamentTextModalProps {
  departamentId: number;
  open: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CourseTextModal(props: IDepartamentTextModalProps) {
  const { open, setIsModalOpen, departamentId } = props;

  const [offersByCourse, setOffersByCourse] =
    useState<IOffersGroupedByCourse>();

  const [selectedCourse, setSelectedCourse] = useState<string>();

  const { user } = useAuth();

  const { selectedPeriod } = usePeriod();

  const handleCourseChange = (e: RadioChangeEvent) => {
    setSelectedCourse(e.target.value);
  };

  const handleCancel = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    api
      .get<{ data: IDepartament }>(
        `api/departaments/${departamentId}?period=${selectedPeriod}`
      )
      .then((response) => {
        const departamentResponse = response.data.data;
        const chargesGrouped = departamentResponse.subjects.reduce((acc, e) => {
          if (acc[e.course.name]) {
            acc[e.course.name].offers = [
              ...acc[e.course.name].offers,
              ...e.offers.map((eachOffer) => {
                const offerWithSubject = { ...eachOffer, subject: e };
                return offerWithSubject;
              }),
            ];
            return acc;
          }
          acc[e.course.name] = {
            offers: e.offers.map((eachOffer) => {
              const offerWithSubject = { ...eachOffer, subject: e };
              return offerWithSubject;
            }),
            course: e.course,
          };
          return acc;
        }, {} as IOffersGroupedByCourse);

        setOffersByCourse(chargesGrouped);
      });
  }, [departamentId, selectedPeriod]);

  return (
    <Modal
      title="Mensagem para curso"
      open={open}
      footer={null}
      onCancel={() => handleCancel()}
      width={1200}
    >
      <Radio.Group
        value={selectedCourse}
        onChange={handleCourseChange}
        size="small"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {offersByCourse &&
          Object.keys(offersByCourse).map((e) => (
            <Radio.Button style={{ margin: "0.3rem" }} value={e}>
              {e}
            </Radio.Button>
          ))}
      </Radio.Group>

      <div>
        {offersByCourse && selectedCourse && (
          <div>
            {`Prezado(a) Coordenador(a), ${
              offersByCourse[selectedCourse].course.admins.find(
                (e) => e.adminRole === CourseAdminRole.COORDINATOR
              ).user.name
            }`}
            {offersByCourse[selectedCourse]?.offers.map((e, idx) => (
              <>
                <br />
                <br />
                <span>
                  {`O(s) professor(es) ${e.teachers
                    .map((eachTeacher) => eachTeacher.name)
                    .join(", ")} lecionará(ão) a disciplina ${
                    e.subject.name
                  }, CH ${
                    e.subject.workload
                  }, para o curso ${selectedCourse}. Contato ${
                    e.teachers.length > 1
                      ? "dos(as) professores(as)"
                      : "do(a) professor(a)"
                  }
                  : ${e.teachers.map((each) => each.email).join(", ")}`}
                </span>
              </>
            ))}
            <br />
            <br />
            Atenciosamente,
            <br />
            {user.name}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default CourseTextModal;
