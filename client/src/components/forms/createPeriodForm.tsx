import React from "react";
import { Form, FormInstance, Input, Modal, message } from "antd";
import { Dayjs } from "dayjs";
import DatePicker from "../_ui/datePicker";

const { RangePicker } = DatePicker;

export interface PeriodFormValues {
  code: string;
  duration: Dayjs[];
}
interface CreatePeriodModalProps {
  open: boolean;
  onCreate: (values: PeriodFormValues, form: FormInstance<any>) => void;
  onCancel: () => void;
}

function CreatePeriodModal({
  open,
  onCreate,
  onCancel,
}: CreatePeriodModalProps) {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Criar um novo período"
      okText="Criar"
      cancelText="Cancelar"
      onCancel={onCancel}
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
      <Form form={form} layout="vertical" name="createPeriodForm">
        <Form.Item
          name="code"
          label="Código"
          rules={[
            {
              required: true,
              message: "Por favor insira o código do periodo!",
            },
          ]}
        >
          <Input placeholder="Insira um código" />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duração"
          rules={[
            {
              required: true,
              message: "Por favor insira a duração do periodo!",
            },
          ]}
        >
          <RangePicker placeholder={["Inicio", "Término"]} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreatePeriodModal;
