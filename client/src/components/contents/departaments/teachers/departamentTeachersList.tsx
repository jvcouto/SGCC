import React from "react";
import { Avatar, List, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import IUser from "../../../../types/apiResponses/users";
import AddUserBulk, {
  ICollegeMembersFormValues,
} from "../../courses/college/college-members-form/collegeMembersForm";
import IDepartament from "../../../../types/apiResponses/departament";
import api from "../../../../services/request.service";

interface IDepartamentTeachers {
  departamentId: number;
  teachersInfo: IUser[];
}

function TeachersList(props: IDepartamentTeachers) {
  const { teachersInfo, departamentId } = props;

  const onSubmit = async (values: ICollegeMembersFormValues) => {
    if (!values?.users?.length) {
      return;
    }

    const patchValues = {
      ids: values.users.map((user) => user.user),
      data: {
        departament: departamentId,
      },
    };
    api
      .post(`/api/user/update`, patchValues)
      .then((response) => {
        message.success("Professores adicionados!");
        const { data: updatedDepartament }: { data: IDepartament } =
          response.data;
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
    </>
  );
}

export default TeachersList;
