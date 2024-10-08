import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Descriptions,
  Divider,
  FormInstance,
  message,
} from "antd";
import ISubject from "../../../../types/apiResponses/subject";
import SubjectForm, { ISubjectFormValues } from "./subject-form";
import api from "../../../../services/request.service";
import ICourse from "../../../../types/apiResponses/course";

const { Panel } = Collapse;

interface ICourseSubjects {
  subjectsInfo: ISubject[];
  selectedCourse: ICourse;
}

function SubjectsList(props: ICourseSubjects) {
  const { subjectsInfo, selectedCourse } = props;

  const [subjects, setSubjects] = useState(subjectsInfo);

  useEffect(() => {
    setSubjects(subjectsInfo);
  }, [selectedCourse]);

  const onSubmit = async (
    values: ISubjectFormValues,
    form: FormInstance<any>
  ) => {
    const newSubjetValue = {
      name: values.name,
      semester: values.semester,
      workload: values.workload,
      theoreticalWorkload: values.theoreticalWorkload,
      praticalWorkload: values.praticallWorkload,
      optionalSubject: values.optional,
      course: {
        id: selectedCourse.id,
      },
      departament: {
        id: values.departament,
      },
      shortName: values.shortName,
      places: values.places,
      curriculum: values.curriculum.format(),
      syllabus: values.syllabus,
      objective: values.objective,
      bibliography: values.bibliography,
      complementaryBibliography: values.complementaryBibliography,
      preRequisite: values.preRequisite?.map((e) => ({
        id: e,
      })),
      coRequisite: values.coRequisite?.map((e) => ({
        id: e,
      })),
    };
    api
      .post(`/api/subjects`, newSubjetValue)
      .then((response) => {
        message.success("Disciplina adicionada!");
        const { data: newSubject }: { data: ISubject } = response.data;
        setSubjects([...subjects, newSubject]);

        form.resetFields();
      })
      .catch(() => {
        message.error("Algo deu errado, tente novamente!");
      });
  };

  return (
    <>
      <SubjectForm onSubmit={onSubmit} selectedCourse={selectedCourse} />
      <Collapse>
        {subjects.map((subject) => (
          <Panel
            header={`${subject.name} - ${subject.shortName}`}
            key={subject.id}
          >
            <Descriptions
              title="Informações da disciplina"
              extra={<Button type="primary">Editar</Button>}
            >
              <Descriptions.Item label="Carga Horária">
                {subject.workload}
              </Descriptions.Item>
              <Descriptions.Item label="Carga horaria teórica">
                {subject.theoreticalWorkload}
              </Descriptions.Item>
              <Descriptions.Item label="Carga horaria prática">
                {subject.praticalWorkload}
              </Descriptions.Item>
              <Descriptions.Item label="Tipo">
                {subject.optionalSubject ? "Opcional" : "Obrigatória"}
              </Descriptions.Item>
              <Descriptions.Item label="Semestre">
                {subject.semester === 99 ? "OP" : subject.semester}
              </Descriptions.Item>
              <Descriptions.Item label="Vagas">
                {subject.places}
              </Descriptions.Item>
              <Descriptions.Item label="Departamento">
                {subject.departament.name}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Plano de ensino" bordered column={1}>
              <Descriptions.Item label="Curriculo">
                {new Date(subject.curriculum).getFullYear()}
              </Descriptions.Item>
              <Descriptions.Item label="Ementa">
                {subject.syllabus}
              </Descriptions.Item>
              <Descriptions.Item label="Objetivo">
                {subject.objective}
              </Descriptions.Item>
              <Descriptions.Item label="Bibliografia">
                {subject.bibliography}
              </Descriptions.Item>
              <Descriptions.Item label="Bibliografia Complementar">
                {subject.complementaryBibliography}
              </Descriptions.Item>
              <Descriptions.Item label="Pré Requisito">
                {subject.preRequisite?.length
                  ? subject.preRequisite?.map((e) => e.name).join(", ")
                  : "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Co Requisito">
                {subject.coRequisite?.length
                  ? subject.coRequisite?.map((e) => e.name).join(", ")
                  : "-"}
              </Descriptions.Item>
            </Descriptions>
          </Panel>
        ))}
      </Collapse>
    </>
  );
}

export default SubjectsList;
