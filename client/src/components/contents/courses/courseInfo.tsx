import { Button, Descriptions } from "antd";
import React from "react";

interface ICourseInfo {
  courseInfo: {
    id: number;
    name: string;
    teachers: {
      id: string;
      name: string;
    }[];
  };
}

function CourseInfo(props: ICourseInfo) {
  const { courseInfo } = props;

  return (
    <Descriptions
      title="Informações do curso"
      extra={<Button type="primary">Editar</Button>}
    >
      <Descriptions.Item label="Nome">{courseInfo.name}</Descriptions.Item>
      <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
      <Descriptions.Item label="Remark">empty</Descriptions.Item>
      <Descriptions.Item label="Address">
        No. 18, Wantang Road, Xihu District
      </Descriptions.Item>
    </Descriptions>
  );
}

export default CourseInfo;
