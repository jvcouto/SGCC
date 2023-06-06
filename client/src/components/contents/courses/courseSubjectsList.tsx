import React from "react";
import { Avatar, Button, Collapse, Descriptions, List } from "antd";
import { text } from "stream/consumers";

const { Panel } = Collapse;

interface ICourseSubjects {
  subjectsInfo: {
    optionalSubject: string;
    praticalWorkload: string;
    theoreticalWorkload: string;
    workload: string;
    id: number;
    name: string;
    email: string;
  }[];
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
              {subject.optionalSubject}
            </Descriptions.Item>
          </Descriptions>
        </Panel>
      ))}
    </Collapse>
  );
}

export default SubjectsList;
