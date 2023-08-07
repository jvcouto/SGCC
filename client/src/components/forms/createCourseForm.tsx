import {
  Divider,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
  Tooltip,
  message,
} from "antd";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import DayShift from "../../utils/constants/dayShift";
import api from "../../services/request.service";
import IUser from "../../types/apiResponses/users";

export interface ICreateCourseFormValues {
  name: string;
  duration: number;
  shift: string;
  admin: string;
  secretary: string;
  viceAdmin: string;
}

interface ICreateCourseFormModalProps {
  open: boolean;
  onCreate: (values: ICreateCourseFormValues, form: FormInstance<any>) => void;
  onCancel: () => void;
}

const SEMESTER_OPTIONS = [
  {
    value: 4,
    label: "4 Semestres",
  },
  {
    value: 6,
    label: "6 Semestres",
  },
  {
    value: 8,
    label: "8 Semestres",
  },
  {
    value: 10,
    label: "10 Semestres",
  },
  {
    value: 12,
    label: "12 Semestres",
  },
];

function CreateCourseModal({
  open,
  onCreate,
  onCancel,
}: ICreateCourseFormModalProps) {
  const [form] = Form.useForm();
  const intl = useIntl();

  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>();

  const handleUserSearch = (newValue: string) => {
    if (newValue) {
      api.get(`/api/user?name=${newValue}`).then((response) => {
        const newUsers = response.data.data;
        setUsers(newUsers);
      });
    } else {
      setUsers([]);
    }
  };

  const handleUserChange = (newValue: string) => {
    setSelectedUser(newValue);
  };

  return (
    <Modal
      open={open}
      title="Criar novo curso"
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
            message.error(intl.formatMessage({ id: "error.genericFormError" }));
          });
      }}
    >
      <Form form={form} layout="vertical" name="createCourseForm">
        <Form.Item
          name="name"
          label="Nome"
          rules={[
            {
              required: true,
              message: "Insira o nome do curso!",
            },
          ]}
        >
          <Input placeholder="Insira um nome" />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duração"
          rules={[
            {
              required: true,
              message: "Insira a duração do curso!",
            },
          ]}
        >
          <Select placeholder="Insira um valor" options={SEMESTER_OPTIONS} />
        </Form.Item>
        <Form.Item
          name="shift"
          label="Turno"
          rules={[
            {
              required: true,
              message: "Insira o turno do curso!",
            },
          ]}
        >
          <Select
            placeholder="Insira um turno"
            options={Object.keys(DayShift).map((e) => ({
              value: DayShift[e],
              label: intl.formatMessage({ id: `shift.${DayShift[e]}` }),
            }))}
          />
        </Form.Item>

        <Tooltip placement="top" title="Selecione uma opção">
          <Divider>Administradores</Divider>
        </Tooltip>

        <Form.Item name="admin" label="Coordenador">
          <Select
            placeholder="Selecione o coordenador"
            showSearch
            allowClear
            value={selectedUser}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleUserSearch}
            onChange={handleUserChange}
            notFoundContent="Nenhum item encontrado"
            options={(users || []).map((user) => ({
              value: user.id,
              label: user.name,
            }))}
          />
        </Form.Item>

        <Form.Item name="viceAdmin" label="Vice Coordenador">
          <Select
            placeholder="Selecione o vice coordenador"
            showSearch
            allowClear
            value={selectedUser}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleUserSearch}
            onChange={handleUserChange}
            notFoundContent="Nenhum item encontrado"
            options={(users || []).map((user) => ({
              value: user.id,
              label: user.name,
            }))}
          />
        </Form.Item>

        <Form.Item name="secretary" label="Secretário">
          <Select
            placeholder="Insira o secretário"
            showSearch
            allowClear
            value={selectedUser}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleUserSearch}
            onChange={handleUserChange}
            notFoundContent="Nenhum item encontrado"
            options={(users || []).map((user) => ({
              value: user.id,
              label: user.name,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateCourseModal;
