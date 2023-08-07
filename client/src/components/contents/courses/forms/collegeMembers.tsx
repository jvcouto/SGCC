import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import React from "react";
import PersonSelect from "../../../_ui/userSelect";

export interface ICollegeMembersFormValues {
  users: {
    user: string;
  }[];
}

interface ICollegeMembersFormProps {
  onFormFinish: (values: ICollegeMembersFormValues) => void;
  onCancel: () => void;
}

function CollegeMembersForm(props: ICollegeMembersFormProps) {
  const { onFormFinish, onCancel } = props;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Form
        name="collegeMembersForm"
        onFinish={onFormFinish}
        onReset={onCancel}
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
                    <PersonSelect placeholder="Selecione um membro" />
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
                  Adicionar Membro
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
  );
}

export default CollegeMembersForm;
