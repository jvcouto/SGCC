import React, { useState } from "react";
import { Avatar, Button, Empty, List, message } from "antd";
import IUser from "../../../types/apiResponses/users";
import ContentAddButtonWrapper from "../../_ui/styles/contentAddButtonWrapper";
import CollegeMembersForm, {
  ICollegeMembersFormValues,
} from "./forms/collegeMembers";
import api from "../../../services/request.service";
import ICourse from "../../../types/apiResponses/course";

interface ICourseCollegeMembers {
  selectedCourse: number;
  collegeMembers: IUser[];
}

function CollegeList(props: ICourseCollegeMembers) {
  const { collegeMembers, selectedCourse } = props;
  const [cMembers, setCMembers] = useState(collegeMembers);
  const [enableForm, seEnableForm] = useState(false);

  const handleFormFinish = (values: ICollegeMembersFormValues) => {
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
        setCMembers(updatedCourse.collegeMembers);
      })
      .catch(() => {
        message.error("Algo deu errado, tente novamente!");
      });
    seEnableForm(false);
  };

  const handleFormCancel = () => {
    seEnableForm(false);
  };

  return (
    <>
      {enableForm ? (
        <CollegeMembersForm
          onFormFinish={handleFormFinish}
          onCancel={handleFormCancel}
        />
      ) : (
        <ContentAddButtonWrapper>
          <Button onClick={() => seEnableForm(!enableForm)} type="link">
            Adicionar
          </Button>
        </ContentAddButtonWrapper>
      )}
      <List
        itemLayout="horizontal"
        dataSource={cMembers}
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
