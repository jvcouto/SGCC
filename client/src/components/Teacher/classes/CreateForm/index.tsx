import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Space, Input, Button, message } from "antd";
import React from "react";

import PageContent from "../../../../../styles/content.style";
import * as S from "./createForm.style";

interface TeacherCreateClassContentProps {
  onCreateClass: (values: any) => void;
}
interface ClassFormValuesProps {
  name: string;
  students: {
    name: string;
    email: string;
  }[];
}

function TeacherCreateClassContent(props: TeacherCreateClassContentProps) {
  const { onCreateClass } = props;

  const onFinish = (values: ClassFormValuesProps) => {
    if (!values.students || values.students.length < 1) {
      message.error("Insira pelo menos um aluno na turma!");
    }
    onCreateClass(values);
  };

  return (
    <PageContent>
      <S.form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Nome da Turma"
          labelAlign="left"
          name="name"
          rules={[{ required: true, message: "Insira o nome da turma!" }]}
        >
          <Input placeholder="Insira o nome da turma" />
        </Form.Item>
        <Form.List name="students">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    width: "100%",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[
                      {
                        required: true,
                        message: "Por favor insira o nome do aluno!",
                      },
                    ]}
                  >
                    <Input placeholder="Nome do aluno" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "email"]}
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Insira um email válido!",
                      },
                    ]}
                  >
                    <Input placeholder="Email do aluno" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Adicionar aluno
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <div style={{ display: "flex", width: "100%" }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Cadastar turma
            </Button>
          </div>
        </Form.Item>
      </S.form>
    </PageContent>
  );
}

export default TeacherCreateClassContent;
