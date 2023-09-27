import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";

import { FormInstance } from "antd/es/form/Form";
import { ContentAddButtonWrapper } from "../../../content.style";
import ISubject from "../../../../../types/apiResponses/subject";

interface ISubjectOfferFormProps {
  onSubmit: (values: any, form: FormInstance<any>) => Promise<void>;
  courseSubjects: ISubject[];
}

export interface ISubjectOfferFormValues {
  subject: id;
  class: string;
}

function SubjectOfferForm(props: ISubjectOfferFormProps) {
  const { onSubmit, courseSubjects } = props;

  const [enableForm, seEnableForm] = useState(false);

  const [form] = Form.useForm();

  const handleFinish = async (values: ISubjectOfferFormValues) => {
    await onSubmit(values, form);
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
        name="SubjectOffer"
        onFinish={handleFinish}
        onReset={() => {
          seEnableForm(false);
        }}
        autoComplete="off"
        initialValues={[]}
        style={{ width: "50%" }}
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
            options={courseSubjects.map((e) => ({
              value: e.id,
              label: e.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="class"
          label="Turma"
          rules={[
            {
              required: true,
              message: "Informe uma turma!",
            },
          ]}
        >
          <Input placeholder="Turma" />
        </Form.Item>
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
      <Button onClick={() => seEnableForm(!enableForm)} type="primary">
        Adicionar obrigatórias
      </Button>
      <Button onClick={() => seEnableForm(!enableForm)} type="primary">
        Adicionar
      </Button>
    </ContentAddButtonWrapper>
  );
}

export default SubjectOfferForm;
