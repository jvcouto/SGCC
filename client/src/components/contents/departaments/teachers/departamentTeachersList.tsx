import React, { useEffect, useState } from "react";
import { Avatar, Empty, List, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import IUser from "../../../../types/apiResponses/users";
import AddUserBulk, {
  ICollegeMembersFormValues,
} from "../../courses/college/college-members-form/collegeMembersForm";
import api from "../../../../services/request.service";

interface IDepartamentTeachers {
  departamentId: number;
  teachersInfo: IUser[];
}

function TeachersList(props: IDepartamentTeachers) {
  const { teachersInfo, departamentId } = props;

  const [teachersList, setTeachersList] = useState(teachersInfo);

  useEffect(() => {
    setTeachersList(teachersInfo);
  }, [departamentId]);

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
        const { data: teachersAdded }: { data: IUser[] } = response.data;
        setTeachersList([...teachersList, ...teachersAdded]);
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
        dataSource={teachersList}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Não há professores cadastrados"
            />
          ),
        }}
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
