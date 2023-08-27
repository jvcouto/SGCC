import React from "react";
import { Button, Collapse, Descriptions } from "antd";
import ISubject from "../../../types/apiResponses/subject";

const { Panel } = Collapse;

interface ICourseSubjects {
  subjectsInfo: ISubject[];
}

function SubjectsList(props: ICourseSubjects) {
  const { subjectsInfo } = props;

  return (
    <Collapse>
      {subjectsInfo.map((subject) => (
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
          </Descriptions>
        </Panel>
      ))}
    </Collapse>
  );
}

export default SubjectsList;
