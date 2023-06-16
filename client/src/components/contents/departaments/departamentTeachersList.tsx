import React from "react";
import { Avatar, List } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface IDepartamentTeachers {
  teachersInfo: {
    id: number;
    name: string;
    email: string;
  }[];
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
