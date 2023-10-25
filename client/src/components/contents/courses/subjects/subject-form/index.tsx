import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Tooltip,
} from "antd";
import { FormInstance } from "antd/es/form/Form";
import { ContentAddButtonWrapper } from "../../../content.style";
import DepartamentSelect from "../../../../_ui/departamentSelect";
import ICourse from "../../../../../types/apiResponses/course";

export interface ISubjectFormValues {
  name: string;
  departament: number;
  optional: boolean;
  workload: number;
  praticallWorkload: number;
  theoreticalWorkload: number;
  semester: number;
  shortName: string;
  places: number;
}
interface ICollegeFormProps {
  onSubmit: (
    values: ISubjectFormValues,
    form: FormInstance<any>
  ) => Promise<void>;
  selectedCourse: ICourse;
}

function SubjectForm(props: ICollegeFormProps) {
  const { onSubmit, selectedCourse } = props;

  const [enableForm, setEnableForm] = useState(false);
  const [form] = Form.useForm();

  const arrayFromCourseDuration = Array(selectedCourse.duration).fill(1);
  const semesterDropDownItems = arrayFromCourseDuration.map((e, index) => ({
    label: `${index + 1}`,
    value: index + 1,
  }));

  semesterDropDownItems.push({
    label: "OP",
    value: 99,
  });

  const handleFinish = async (values: ISubjectFormValues) => {
    await onSubmit(values, form);
    setEnableForm(false);
  };

  const handleWorkLoadChange = () => {
    form.setFieldValue(
      "workload",
      form.getFieldValue("theoreticalWorkload") +
        form.getFieldValue("praticallWorkload")
    );
  };

  return enableForm ? (
    <Form
      form={form}
      layout="vertical"
      name="subjectForm"
      onFinish={handleFinish}
    >
      <Row gutter={24}>
        <Col span={8} offset={4}>
          <Form.Item
            name="name"
            label="Nome"
            rules={[
              {
                required: true,
                message: "Informe o nome da disciplina!",
              },
            ]}
          >
            <Input placeholder="Nome" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="shortName"
            label="Nome breve"
            rules={[
              {
                required: true,
                message: "Informe o nome breve da disciplina!",
              },
            ]}
          >
            <Input placeholder="Nome breve" />
          </Form.Item>
        </Col>
        <Col span={8} offset={4}>
          <Form.Item
            name="departament"
            label="Departamento"
            rules={[
              {
                required: true,
                message: "Informe o departamento!",
              },
            ]}
          >
            {/* @ts-ignore */}
            <DepartamentSelect placeholder="Selecione um departamento" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            name="semester"
            label="Semestre"
            rules={[
              {
                required: true,
                message: "Informe o semestre!",
              },
            ]}
          >
            <Select placeholder="Semestre" options={semesterDropDownItems} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Opcional" name="optional" initialValue={false}>
            <Switch />
          </Form.Item>
        </Col>
        <Col span={4} offset={4}>
          <Form.Item
            name="places"
            label="Vagas"
            rules={[
              {
                required: true,
                message: "Informe a quantidade de vagas da disciplina!",
              },
              {
                type: "number",
                min: 0,
                max: 99,
                message: "Valor fora da faixa permitida! (0-99)",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            name="theoreticalWorkload"
            label="Carga Horária Teórica"
            initialValue={0}
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
                message: "Valor fora da faixa permitida! (0-99)",
              },
            ]}
          >
            <InputNumber onChange={handleWorkLoadChange} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            name="praticallWorkload"
            label="Carga Horária Prática"
            initialValue={0}
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
                message: "Valor fora da faixa permitida! (0-99)",
              },
            ]}
          >
            <InputNumber onChange={handleWorkLoadChange} />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            name="workload"
            initialValue={0}
            label={
              <Tooltip placement="rightTop" title="Teórica + Prática">
                CH Total
              </Tooltip>
            }
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
                message: "Valor fora da faixa permitida! (0-99)",
              },
              {
                required: true,
                message: "Informe a carga horária!",
              },
            ]}
          >
            <InputNumber disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={20} style={{ textAlign: "right", paddingBottom: "2rem" }}>
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
  ) : (
    <ContentAddButtonWrapper>
      <Button onClick={() => setEnableForm(!enableForm)} type="link">
        Adicionar
      </Button>
    </ContentAddButtonWrapper>
  );
}

export default SubjectForm;
