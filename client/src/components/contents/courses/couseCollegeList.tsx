import React from "react";
import { Avatar, List } from "antd";
import IUser from "../../../types/apiResponses/users";

interface ICourseCollegeMembers {
  collegeMembers: IUser[];
}

function CollegeList(props: ICourseCollegeMembers) {
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
