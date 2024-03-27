import { Button, Col, Form, Row, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { ContentAddButtonWrapper } from "../../../content.style";
import { ITeachingPlan } from "../../../../../types/apiResponses/teachingPlan";
import api from "../../../../../services/request.service";

interface ITeachingPlanFormProps {
  setTeachingPlan: React.Dispatch<React.SetStateAction<ITeachingPlan>>;
  subjectOfferId: number;
}

export interface ITeachingtFormValues {
  content: string;
  methodology: string;
  ratingCriteria: string;
  serviceHours: string;
  substitute: string;
}

function TeachingPlanForm(props: ITeachingPlanFormProps) {
  const { setTeachingPlan, subjectOfferId } = props;
  const [enableForm, setEnableForm] = useState(false);
  const [form] = Form.useForm();

  const handleFormFinish = (values: ITeachingtFormValues) => {
    const newTeachingPlanValue = {
      content: values.content,
      methodology: values.methodology,
      ratingCriteria: values.ratingCriteria,
      serviceHours: values.serviceHours,
      substitute: values.substitute,
      subjectOffer: {
        id: subjectOfferId,
      },
    };
    api
      .post(`/api/teachingPlan`, newTeachingPlanValue)
      .then((response) => {
        message.success("Plano adicionado!");
        const { data: newTeachingPlan }: { data: ITeachingPlan } =
          response.data;
        setTeachingPlan(newTeachingPlan);

        form.resetFields();
      })
      .catch(() => {
        message.error("Algo deu errado, tente novamente!");
      });
  };

  return (
    <>
      <ContentAddButtonWrapper>
        <Button onClick={() => setEnableForm(!enableForm)} type="link">
          Adicionar
        </Button>
      </ContentAddButtonWrapper>
      {enableForm && (
        <Form
          form={form}
          layout="vertical"
          name="subjectForm"
          onFinish={handleFormFinish}
          style={{ width: "100%" }}
        >
          <Row gutter={16}>
            <Col span={14} offset={4}>
              <Form.Item
                name="content"
                label="Conteúdo"
                rules={[
                  {
                    type: "string",
                    min: 0,
                    max: 600,
                    message: "Maximo de caracteres atingido (600)",
                  },
                  {
                    required: true,
                    message: "Informe o conteúdo!",
                  },
                ]}
              >
                <TextArea rows={2} maxLength={600} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={14} offset={4}>
              <Form.Item
                name="methodology"
                label="Métodologia"
                rules={[
                  {
                    type: "string",
                    min: 0,
                    max: 600,
                    message: "Maximo de caracteres atingido (600)",
                  },
                  {
                    required: true,
                    message: "Informe a métodologia!",
                  },
                ]}
              >
                <TextArea rows={2} maxLength={600} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={14} offset={4}>
              <Form.Item
                name="ratingCriteria"
                label="Critério de avaliação"
                rules={[
                  {
                    type: "string",
                    min: 0,
                    max: 600,
                    message: "Maximo de caracteres atingido (600)",
                  },
                  {
                    required: true,
                    message: "Informe o critério de avaliação!",
                  },
                ]}
              >
                <TextArea rows={2} maxLength={600} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={14} offset={4}>
              <Form.Item
                name="serviceHours"
                label="Horário de Atendimento"
                rules={[
                  {
                    type: "string",
                    min: 0,
                    max: 600,
                    message: "Maximo de caracteres atingido (600)",
                  },
                  {
                    required: true,
                    message: "Informe o horário de atendimento!",
                  },
                ]}
              >
                <TextArea rows={2} maxLength={600} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={14} offset={4}>
              <Form.Item
                name="substitute"
                label="Substitutiva"
                rules={[
                  {
                    type: "string",
                    min: 0,
                    max: 600,
                    message: "Maximo de caracteres atingido (600)",
                  },
                  {
                    required: true,
                    message: "Informe a Substitutiva!",
                  },
                ]}
              >
                <TextArea rows={2} maxLength={600} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              span={18}
              style={{ textAlign: "right", paddingBottom: "2rem" }}
            >
              <Button
                type="primary"
                danger
                style={{ margin: "0 8px" }}
                onClick={() => {
                  form.resetFields();
                  setEnableForm(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                Adicionar
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}

export default TeachingPlanForm;
