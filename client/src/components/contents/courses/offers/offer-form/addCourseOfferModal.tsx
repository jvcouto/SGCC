import React from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import ISubject from "../../../../../types/apiResponses/subject";

interface IAddCourseOfferModalProps {
  onSubmit: (values: any, form: FormInstance<any>) => Promise<void>;
  courseSubjects: ISubject[];
  enableForm: boolean;
  seEnableForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISubjectOfferFormValues {
  subject: number;
  class: string;
  places: number;
}

function AddCourseOfferModal(props: IAddCourseOfferModalProps) {
  const { onSubmit, courseSubjects, enableForm, seEnableForm } = props;

  const [form] = Form.useForm();

  const handleSubjectChange = (selectedSubject: number) => {
    form.setFieldValue(
      "places",
      courseSubjects.find((e) => e.id === selectedSubject).places
    );
  };

  const handleFinish = async (values: ISubjectOfferFormValues) => {
    await onSubmit(values, form);
    form.resetFields();
    seEnableForm(false);
  };

  return (
    <Modal
      title="Adicionar oferta"
      open={enableForm}
      okText="Confirmar"
      cancelText="Cancelar"
      footer={null}
      onCancel={() => seEnableForm(false)}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Form
          form={form}
          name="SubjectOffer"
          onFinish={handleFinish}
          onReset={() => {
            seEnableForm(false);
            form.resetFields();
          }}
          autoComplete="off"
          style={{ width: "100%" }}
        >
          <Form.Item
            name="subject"
            label="Disciplina"
            rules={[
              {
                required: true,
                message: "Selecione uma disciplina!",
              },
            ]}
          >
            <Select
              placeholder="Disciplina"
              onChange={handleSubjectChange}
              options={courseSubjects.map((e) => ({
                value: e.id,
                label: e.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="class"
            label="Turma"
            initialValue="Única"
            rules={[
              {
                required: true,
                message: "Informe uma turma!",
              },
            ]}
          >
            <Input placeholder="Turma" defaultValue="Única" />
          </Form.Item>
          <Form.Item
            name="places"
            label="Vagas"
            rules={[
              {
                required: true,
                message: "Informe a quantidade de vagas!",
              },
              {
                type: "number",
                min: 0,
                max: 99,
                message: "Valor fora da faixa permitida! (0-99)",
              },
            ]}
          >
            <InputNumber placeholder="Vagas" />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: " 1rem",
            }}
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
    </Modal>
  );
}

export default AddCourseOfferModal;
