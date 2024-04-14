import React, { useEffect, useState } from "react";

import { Modal, Radio, RadioChangeEvent } from "antd";
import api from "../../../../../services/request.service";
import { usePeriod } from "../../../../../contexts/periodContext";
import ICourse from "../../../../../types/apiResponses/course";
import { ISubjectOffer } from "../../../../../types/apiResponses/subject";
import IDepartament from "../../../../../types/apiResponses/departament";
import DepartamentAdminRole from "../../../../../utils/constants/adminRoles";
import IPeriod from "../../../../../types/apiResponses/periods";

interface IDepartamentTextModalProps {
  selectedCourse: number;
  open: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IOffersByDepartament {
  [k: string]: {
    offers: Array<ISubjectOffer & { subjectName: string }>;
    departament: IDepartament;
  };
}

function DepartamentTextModal(props: IDepartamentTextModalProps) {
  const { open, setIsModalOpen, selectedCourse } = props;

  const [offersByDepartament, setOffersByDepartament] =
    useState<IOffersByDepartament>();

  const [seletedDepartament, setSelectedDepartament] = useState<string>();
  const [selectedPeriodName, setSelectedPeriodName] = useState<string>();

  const { selectedPeriod } = usePeriod();

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
                  subjectName: curr.name,
                })),
              ];
              return acc;
            }

            acc[currentSubjectDepName] = {
              offers: [...curr.offers].map((e) => ({
                ...e,
                subjectName: curr.name,
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
            }, A Coordenadoria do
            Curso de Ciência da Computação solicita ao ${
              offersByDepartament[seletedDepartament].departament.name
            } o oferecimento de docentes para lecionar as unidades
            curriculares do curso de Graduação em Ciência da Computação, para o
            período ${selectedPeriodName}.`}

            <br />
            <br />

            {offersByDepartament[seletedDepartament]?.offers.map((e) => (
              <>
                <span>{e.subjectName}</span>
                <br />
              </>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default DepartamentTextModal;
