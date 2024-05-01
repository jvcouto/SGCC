import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";

import { FormInstance } from "antd/es/form/Form";
import { ContentAddButtonWrapper } from "../../../content.style";
import ISubject from "../../../../../types/apiResponses/subject";
import AddRequiredSubjectModal from "./addRequiredSubjectsModal";
import AddCourseOfferModal from "./addCourseOfferModal";

interface ISubjectOfferFormProps {
  onSubmit: (values: any, form: FormInstance<any>) => Promise<void>;
  courseSubjects: ISubject[];
  handleAddRequiredSubjets: (
    addRequired: boolean,
    addOptional: boolean
  ) => Promise<void>;
}

function SubjectOfferForm(props: ISubjectOfferFormProps) {
  const { onSubmit, courseSubjects, handleAddRequiredSubjets } = props;

  const [enableForm, seEnableForm] = useState(false);

  const [enableConfirmModal, setEnableConfirmModal] = useState(false);

  return (
    <>
      <AddRequiredSubjectModal
        open={enableConfirmModal}
        setEnableConfirmModal={setEnableConfirmModal}
        handleAddRequiredSubjets={handleAddRequiredSubjets}
      />

      <AddCourseOfferModal
        enableForm={enableForm}
        seEnableForm={seEnableForm}
        onSubmit={onSubmit}
        courseSubjects={courseSubjects}
      />

      <ContentAddButtonWrapper>
        <Button onClick={() => setEnableConfirmModal(true)} type="primary">
          Ofertar todas disciplinas
        </Button>
        <Button onClick={() => seEnableForm(!enableForm)} type="primary">
          Ofertar disciplina
        </Button>
      </ContentAddButtonWrapper>
    </>
  );
}

export default SubjectOfferForm;
