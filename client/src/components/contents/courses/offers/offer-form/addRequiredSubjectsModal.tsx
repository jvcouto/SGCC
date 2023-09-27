import React from "react";
import { Modal } from "antd";

interface AddRequiredSubjectModalProps {
  open: boolean;
  setEnableConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddRequiredSubjets: () => Promise<void>;
}

function AddRequiredSubjectModal(props: AddRequiredSubjectModalProps) {
  const { open, setEnableConfirmModal, handleAddRequiredSubjets } = props;

  const handleOk = async () => {
    await handleAddRequiredSubjets();
    setEnableConfirmModal(false);
  };

  const handleCancel = () => {
    setEnableConfirmModal(false);
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
      <p>Confirmar a oferta das disciplinas obrigatórias?</p>
    </Modal>
  );
}

export default AddRequiredSubjectModal;
