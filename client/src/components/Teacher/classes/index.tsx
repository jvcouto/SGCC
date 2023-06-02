import { UsergroupDeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Collapse, List, Modal, Tooltip } from "antd";
import React, { useState } from "react";

import PageContent from "../../../../styles/content.style";
import { ClassProps } from "../../../../ultis/ApiResposeTypes/Classes";
import { StudentProps } from "../../../../ultis/ApiResposeTypes/Types/Student";
import SCollapse from "./list.style";

const { Panel } = Collapse;

interface TeacherListClassesProps {
  classes: ClassProps[];
  onConfirmDelete: (values: any) => void;
}

function TeacherListClassesContent(props: TeacherListClassesProps) {
  const { classes, onConfirmDelete } = props;

  const [allClasses, setAllClasses] = useState<ClassProps[]>(classes);

  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [selectedClass, setSelectedClass] = useState<ClassProps>();
  const [selectedStudent, setSelectedStudent] = useState<StudentProps>();

  const handleOk = () => {
    setConfirmLoading(true);
    const newClassStudets = selectedClass.schoolClassStudens.filter(
      (e) => e.id !== selectedStudent.id
    );

    const newValues = {
      ...selectedClass,
      schoolClassStudens: newClassStudets,
    } as ClassProps;

    const newAllClasses = allClasses.filter((e) => e.id !== selectedClass.id);

    newAllClasses.push(newValues);

    setAllClasses(newAllClasses);

    onConfirmDelete(newValues);
    setConfirmLoading(false);
    setConfirmModal(false);
  };

  const handleCancel = () => {
    setConfirmModal(false);
  };

  return (
    <PageContent>
      <Modal
        title="Confirmar remoção do Aluno"
        visible={confirmModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <span>Por favor, confirme a exclusão do aluno </span>
          <b>{selectedStudent?.name}</b>
          <span> da turma </span>
          <b>{selectedClass?.name}</b>
        </div>
      </Modal>

      <SCollapse accordion>
        {allClasses.map((e) => (
          <Panel header={e.name} key={e.id}>
            <b>Alunos Cadastrados: </b>
            <List
              itemLayout="horizontal"
              dataSource={e.schoolClassStudens}
              renderItem={(student) => (
                <List.Item
                  key={student.id}
                  actions={[
                    <Tooltip title="Excluir aluno da turma">
                      <Button
                        danger
                        type="primary"
                        shape="circle"
                        icon={<UsergroupDeleteOutlined />}
                        onClick={() => {
                          setSelectedClass(e);
                          setSelectedStudent(student);
                          setConfirmModal(true);
                        }}
                      />
                    </Tooltip>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<span>{student.name}</span>}
                    description={<span>{student.email}</span>}
                  />
                </List.Item>
              )}
            />
          </Panel>
        ))}
      </SCollapse>
    </PageContent>
  );
}

export default TeacherListClassesContent;
