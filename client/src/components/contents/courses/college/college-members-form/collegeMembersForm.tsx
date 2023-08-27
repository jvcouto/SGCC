import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import React, { useState } from "react";
import PersonSelect from "../../../../_ui/userSelect";
import ContentAddButtonWrapper from "../../../../_ui/styles/contentAddButtonWrapper";

export interface ICollegeMembersFormValues {
  users: {
    user: string;
  }[];
}

interface ICollegeMembersFormProps {
  onSubmit: (values: ICollegeMembersFormValues) => Promise<void>;
}

function CollegeMemberForm(props: ICollegeMembersFormProps) {
  const { onSubmit } = props;

  const [enableForm, seEnableForm] = useState(false);

  const handleFinish = async (values) => {
    await onSubmit(values);
    seEnableForm(false);
  };

  return enableForm ? (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Form
        name="CollegeMembers"
        onFinish={handleFinish}
        onReset={() => {
          seEnableForm(false);
        }}
        autoComplete="off"
        initialValues={[]}
        style={{ width: "50%" }}
      >
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space.Compact
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                    alignItems: "baseline",
                  }}
                >
                  <Form.Item
                    style={{ width: "100%", marginRight: "1rem" }}
                    {...restField}
                    name={[name, "user"]}
                    rules={[
                      { required: true, message: "Selecione um usuário" },
                    ]}
                  >
                    {/* @ts-ignore */}
                    <PersonSelect placeholder="Selecione um usuário" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space.Compact>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Adicionar
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: " 1rem" }}
        >
          <Form.Item>
            <Button type="primary" danger htmlType="reset">
              cancelar
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Confirmar
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  ) : (
    <ContentAddButtonWrapper>
      <Button onClick={() => seEnableForm(!enableForm)} type="link">
        Adicionar
      </Button>
    </ContentAddButtonWrapper>
  );
}

export default CollegeMemberForm;
