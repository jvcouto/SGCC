import React from "react";
import { Avatar, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import IUser from "../../../types/apiResponses/users";

interface IDepartamentTeachers {
  teachersInfo: IUser[];
}

function TeachersList(props: IDepartamentTeachers) {
  const { teachersInfo } = props;

  return (
    <List
      itemLayout="horizontal"
      dataSource={teachersInfo}
      renderItem={(teacher) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="" icon={<UserOutlined />} />}
            title={teacher.name}
            description={teacher.email}
          />
        </List.Item>
      )}
    />
  );
}

export default TeachersList;
