import { Descriptions, Button, Divider, List, Avatar, Tag, Empty } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import IDepartament from "../../../../types/apiResponses/departament";

interface IDepartamentInfo {
  departamentInfo: IDepartament;
}

function DepartamentInfo(props: IDepartamentInfo) {
  const { departamentInfo } = props;
  return (
    <>
      <Descriptions
        title="Informações do departamento"
        extra={<Button type="primary">Editar</Button>}
      >
        <Descriptions.Item label="Código">
          {departamentInfo.code}
        </Descriptions.Item>
        <Descriptions.Item label="Nome">
          {departamentInfo.name}
        </Descriptions.Item>
        <Descriptions.Item label="N° Professores">
          {departamentInfo.teachers.length}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left" orientationMargin="0">
        Administradores
      </Divider>

      <List
        itemLayout="horizontal"
        dataSource={departamentInfo.admins}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Não há adiministradores"
            />
          ),
        }}
        renderItem={(admin) => (
          <List.Item>
            <>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={admin.user.name}
                description={admin.user.email}
              />
              <Tag color="blue">
                <FormattedMessage id={admin.adminRole} />
              </Tag>
            </>
          </List.Item>
        )}
      />
    </>
  );
}

export default DepartamentInfo;
