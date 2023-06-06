import React from "react";
import { Avatar, List } from "antd";

interface ICourseTeachers {
  collegeMembers: {
    id: number;
    name: string;
    email: string;
  }[];
}

function CollegeList(props: ICourseTeachers) {
  const { collegeMembers } = props;

  return (
    <List
      itemLayout="horizontal"
      dataSource={collegeMembers}
      renderItem={(collegeMember) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="" />}
            title={collegeMember.name}
            description={collegeMember.email}
          />
        </List.Item>
      )}
    />
  );
}

export default CollegeList;
