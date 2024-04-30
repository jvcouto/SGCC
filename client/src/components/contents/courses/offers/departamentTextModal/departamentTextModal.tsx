import React, { useEffect, useState } from "react";

import { Modal, Radio, RadioChangeEvent } from "antd";
import api from "../../../../../services/request.service";
import { usePeriod } from "../../../../../contexts/periodContext";
import ICourse from "../../../../../types/apiResponses/course";
import { ISubjectOffer } from "../../../../../types/apiResponses/subject";
import IDepartament from "../../../../../types/apiResponses/departament";
import DepartamentAdminRole from "../../../../../utils/constants/adminRoles";
import IPeriod from "../../../../../types/apiResponses/periods";
import { useAuth } from "../../../../../contexts/authContext";

interface IDepartamentTextModalProps {
  selectedCourse: number;
  open: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IOffersByDepartament {
  [k: string]: {
    offers: Array<ISubjectOffer>;
    departament: IDepartament;
  };
}

function DepartamentTextModal(props: IDepartamentTextModalProps) {
  const { open, setIsModalOpen, selectedCourse } = props;

  const [offersByDepartament, setOffersByDepartament] =
    useState<IOffersByDepartament>();

  const [seletedDepartament, setSelectedDepartament] = useState<string>();
  const [selectedPeriodName, setSelectedPeriodName] = useState<string>();
  const [selectedCourseName, setSeletedCourseName] = useState<string>();

  const { selectedPeriod } = usePeriod();
  const { user } = useAuth();

  useEffect(() => {
    api
      .get<{ data: ICourse }>(
        `api/courses/${selectedCourse}?period=${selectedPeriod}`
      )
      .then((response) => {
        const courseResponse = response.data.data;

        const offerByDepartamentData = courseResponse.subjects.reduce(
          (acc, curr) => {
            const currentSubjectDepName = curr.departament.name;
            if (acc[currentSubjectDepName]) {
              acc[currentSubjectDepName].offers = [
                ...acc[currentSubjectDepName].offers,
                ...curr.offers.map((e) => ({
                  ...e,
                  subject: curr,
                })),
              ];
              return acc;
            }

            acc[currentSubjectDepName] = {
              offers: [...curr.offers].map((e) => ({
                ...e,
                subject: curr,
              })),
              departament: curr.departament,
            };
            return acc;
          },
          {} as IOffersByDepartament
        );

        setOffersByDepartament(offerByDepartamentData);
      });

    api
      .get<{ data: IPeriod }>(`api/periods/${selectedPeriod}`)
      .then((response) => {
        const periodReponse = response.data.data;
        setSelectedPeriodName(periodReponse.code);
      });

    api
      .get<{ data: ICourse }>(`api/courses/${selectedCourse}`)
      .then((response) => {
        const courseResponse = response.data.data;
        setSeletedCourseName(courseResponse.name);
      });
  }, [selectedCourse, selectedPeriod]);

  const handleDepartamentChange = (e: RadioChangeEvent) => {
    setSelectedDepartament(e.target.value);
  };

  const handleCancel = () => {
    setSelectedDepartament(null);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Mensagem para departamento"
      open={open}
      footer={null}
      onCancel={() => handleCancel()}
      width={1200}
    >
      <Radio.Group
        value={seletedDepartament}
        onChange={handleDepartamentChange}
        size="small"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {offersByDepartament &&
          Object.keys(offersByDepartament).map((e) => (
            <Radio.Button style={{ margin: "0.3rem" }} value={e}>
              {e}
            </Radio.Button>
          ))}
      </Radio.Group>

      <div>
        {offersByDepartament && seletedDepartament && (
          <div>
            {`Prezado(a) ${
              offersByDepartament[seletedDepartament].departament.admins.find(
                (e) => e.adminRole === DepartamentAdminRole.CHIEF
              ).user.name
            }, a Coordenadoria do
            Curso de ${selectedCourseName} solicita ao ${
              offersByDepartament[seletedDepartament].departament.name
            } o oferecimento de docentes para lecionar as unidades
            curriculares do curso de Graduação em Ciência da Computação, para o
            período ${selectedPeriodName}.`}
            <br />
            <br />
            <span>
              OBS.: Disciplinas que na lista abaixo ocorrem repetidamente
              indicam a existência de mais de uma turma para a mesma.
            </span>
            <br />
            <br />
            Segue abaixo a lista das disciplinas solicidatas:
            <br />
            <br />
            {offersByDepartament[seletedDepartament]?.offers.map((e, idx) => (
              <>
                <span>
                  {idx + 1}. {e.subject.name} - CH {e.subject.workload} -
                  {e.subject.semester} Periodo
                </span>
                <br />
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

export default DepartamentTextModal;
