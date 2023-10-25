import React, { useState } from "react";
import { Checkbox, Modal, message } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface AddRequiredSubjectModalProps {
  open: boolean;
  setEnableConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddRequiredSubjets: (
    addRequired: boolean,
    addOptional: boolean
  ) => Promise<void>;
}

function AddRequiredSubjectModal(props: AddRequiredSubjectModalProps) {
  const [addRequired, setAddRequired] = useState(false);
  const [addOptional, setAddOptional] = useState(false);

  const { open, setEnableConfirmModal, handleAddRequiredSubjets } = props;

  const handleOk = async () => {
    if (!addRequired && !addOptional) {
      message.error("Selecione quais diciplinas ofertar");
      return;
    }
    await handleAddRequiredSubjets(addRequired, addOptional);
    setEnableConfirmModal(false);
  };

  const handleCancel = () => {
    setEnableConfirmModal(false);
  };

  const handleRequiredChange = (e: CheckboxChangeEvent) => {
    setAddRequired(e.target.checked);
  };

  const handleOptionalChange = (e: CheckboxChangeEvent) => {
    setAddOptional(e.target.checked);
  };

  return (
    <Modal
      title="Confirmar ação"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Confirmar"
      cancelText="Cancelar"
    >
      <h3>Selecione as disciplina para ofertar:</h3>
      <br />
      <Checkbox onChange={handleRequiredChange}>Obrigatórias</Checkbox>
      <br />
      <Checkbox onChange={handleOptionalChange}>Opcionais</Checkbox>
    </Modal>
  );
}

export default AddRequiredSubjectModal;
