import { Descriptions, Button } from "antd";
import React from "react";

interface IDepartamentInfo {
  departamentInfo: {
    id: number;
    name: string;
    code: string;
    teachers: {
      id: number;
      name: string;
      email: string;
    }[];
  };
}

function DepartamentInfo(props: IDepartamentInfo) {
  const { departamentInfo } = props;
  return (
    <Descriptions
      title="Informações do departamento"
      extra={<Button type="primary">Editar</Button>}
    >
      <Descriptions.Item label="Código">
        {departamentInfo.code}
      </Descriptions.Item>
      <Descriptions.Item label="Nome">{departamentInfo.name}</Descriptions.Item>
      <Descriptions.Item label="N° Professores">
        {departamentInfo.teachers.length}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default DepartamentInfo;
