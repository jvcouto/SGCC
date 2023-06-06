import React from "react";
import { Avatar, List } from "antd";

interface ICourseTeachers {
  teachersInfo: {
    id: number;
    name: string;
    email: string;
  }[];
}

function TeachersList(props: ICourseTeachers) {
  const { teachersInfo } = props;

  return (
    <List
      itemLayout="horizontal"
      dataSource={teachersInfo}
      renderItem={(teacher) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="" />}
            title={teacher.name}
            description={teacher.email}
          />
        </List.Item>
      )}
    />
  );
}

export default TeachersList;
