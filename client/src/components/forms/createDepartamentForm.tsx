import { Form, FormInstance, Input, Modal, Radio, message } from "antd";
import React from "react";

export interface IDepartamentFormValues {
  code: string;
  name: string;
}

interface CreateDepartamentModalProps {
  open: boolean;
  onCreate: (values: IDepartamentFormValues, form: FormInstance<any>) => void;
  onCancel: () => void;
}

function CreateDepartamentModal({
  open,
  onCreate,
  onCancel,
}: CreateDepartamentModalProps) {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Criar novo Departamento"
      okText="Criar"
      cancelText="Cancelar"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values, form);
          })
          .catch((info) => {
            message.error("Algo deu errado, por favor tente novamente!");
          });
      }}
    >
      <Form form={form} layout="vertical" name="createDepartamentForm">
        <Form.Item
          name="name"
          label="Nome"
          rules={[
            {
              required: true,
              message: "Insira o nome do departamento!",
            },
          ]}
        >
          <Input placeholder="Insira um nome" />
        </Form.Item>
        <Form.Item
          name="code"
          label="Código"
          rules={[
            {
              required: true,
              message: "Insira o código do departamento!",
            },
          ]}
        >
          <Input placeholder="Insira um código" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateDepartamentModal;
