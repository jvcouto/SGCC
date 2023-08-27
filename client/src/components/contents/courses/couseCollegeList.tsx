import React from "react";
import { Avatar, Empty, List, message } from "antd";
import IUser from "../../../types/apiResponses/users";
import api from "../../../services/request.service";
import ICourse from "../../../types/apiResponses/course";
import AddUserBulk, { IBulkUserFormValues } from "../../_ui/forms/addUserBulk";

interface ICourseCollegeMembers {
  selectedCourse: number;
  collegeMembers: IUser[];
}

function CollegeList(props: ICourseCollegeMembers) {
  const { collegeMembers, selectedCourse } = props;

  const onSubmit = async (values: IBulkUserFormValues) => {
    if (!values?.users?.length) {
      return;
    }
    const patchValues = {
      collegeMembers: values.users.map((eachMember) => ({
        id: eachMember.user,
      })),
    };
    api
      .patch(`/api/courses/${selectedCourse}`, patchValues)
      .then((response) => {
        message.success("Membros do colegiado adicionados!");
        const { data: updatedCourse }: { data: ICourse } = response.data;
      })
      .catch(() => {
        message.error("Algo deu errado, tente novamente!");
      });
  };

  return (
    <>
      <AddUserBulk onSubmit={onSubmit} />
      <List
        itemLayout="horizontal"
        dataSource={collegeMembers}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Não há membros do colegiado"
            />
          ),
        }}
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
    </>
  );
}

export default CollegeList;
