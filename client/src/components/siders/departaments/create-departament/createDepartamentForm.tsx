import {
  Divider,
  Form,
  FormInstance,
  Input,
  Modal,
  Tooltip,
  message,
} from "antd";
import React from "react";
import ItemSelect, { EItemSearchTypes } from "../../../_ui/itemSelect";

export interface IDepartamentFormValues {
  code: string;
  name: string;
  admin: string;
  secretary: string;
  viceAdmin: string;
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
            onCreate(values, form);
          })
          .catch(() => {
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

        <Tooltip placement="top" title="Selecione uma opção">
          <Divider>Administradores</Divider>
        </Tooltip>

        <Form.Item name="admin" label="Chefe">
          {/* @ts-ignore */}
          <ItemSelect
            placeholder="Selecione o chefe"
            type={EItemSearchTypes.USER}
          />
        </Form.Item>

        <Form.Item name="viceAdmin" label="Vice Chefe">
          {/* @ts-ignore */}
          <ItemSelect
            placeholder="Selecione o vice chefe"
            type={EItemSearchTypes.USER}
          />
        </Form.Item>

        <Form.Item name="secretary" label="Secretário">
          {/* @ts-ignore */}
          <ItemSelect
            placeholder="Selecione o secretário"
            type={EItemSearchTypes.USER}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateDepartamentModal;
