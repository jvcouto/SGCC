import { Avatar, Button, Descriptions, Divider, List, Tag } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import ICourse from "../../../types/apiResponses/course";

interface ICourseInfo {
  courseInfo: ICourse;
}

function CourseInfo(props: ICourseInfo) {
  const { courseInfo } = props;

  return (
    <>
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
      <Divider orientation="left" orientationMargin="0">
        Administradores
      </Divider>

      <List
        itemLayout="horizontal"
        dataSource={courseInfo.admins}
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

export default CourseInfo;
