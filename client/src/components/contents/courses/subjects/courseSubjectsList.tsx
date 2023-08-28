import React, { useState } from "react";
import { Button, Collapse, Descriptions, FormInstance, message } from "antd";
import ISubject from "../../../../types/apiResponses/subject";
import SubjectForm, { ISubjectFormValues } from "./subject-form";
import api from "../../../../services/request.service";

const { Panel } = Collapse;

interface ICourseSubjects {
  subjectsInfo: ISubject[];
  selectedCourse: number;
}

function SubjectsList(props: ICourseSubjects) {
  const { subjectsInfo, selectedCourse } = props;

  const [subjects, setSubjects] = useState(subjectsInfo);

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
        id: selectedCourse,
      },
      departament: {
        id: values.departament,
      },
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
      <SubjectForm onSubmit={onSubmit} />
      <Collapse>
        {subjects.map((subject) => (
          <Panel header={subject.name} key={subject.id}>
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
                {subject.semester}
              </Descriptions.Item>
              <Descriptions.Item label="Departamento">
                {subject.departament.name}
              </Descriptions.Item>
            </Descriptions>
          </Panel>
        ))}
      </Collapse>
    </>
  );
}

export default SubjectsList;
