import { Button, Descriptions } from "antd";
import React from "react";
import ICourse from "../../../types/apiResponses/course";

interface ICourseInfo {
  courseInfo: ICourse;
}

function CourseInfo(props: ICourseInfo) {
  const { courseInfo } = props;

  return (
    <Descriptions
      title="Informações do curso"
      extra={<Button type="primary">Editar</Button>}
    >
      <Descriptions.Item label="Nome">{courseInfo.name}</Descriptions.Item>
      <Descriptions.Item label="Duração">
        {`${courseInfo.duration} semestres`}
      </Descriptions.Item>
      <Descriptions.Item label="Turno">{courseInfo.shift}</Descriptions.Item>
      <Descriptions.Item label="N° Disciplinas">
        {courseInfo.subjects.length}
      </Descriptions.Item>
      <Descriptions.Item label="N° Administradores">
        {courseInfo.admins.length}
      </Descriptions.Item>
      <Descriptions.Item label="N° Membros Colegiado">
        {courseInfo.collegeMembers.length}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default CourseInfo;
