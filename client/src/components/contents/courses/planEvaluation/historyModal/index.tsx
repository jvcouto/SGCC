import {
  Avatar,
  Button,
  Comment,
  Descriptions,
  Divider,
  message,
  Modal,
  Popconfirm,
  Space,
} from "antd";
import React, { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { isNil, maxBy } from "lodash";
import dayjs from "dayjs";
import { ITeachingPlan } from "../../../../../types/apiResponses/teachingPlan";
import { ISubjectApprovalHistory } from "../../../../../types/apiResponses/subject";
import api from "../../../../../services/request.service";
import RejectComment from "./historyModal.style";

export interface ISubjectOfferList {
  id: number;
  subjectName: string;
  class: string;
  optionalSubject: boolean;
  semester: number;
  places: number;
  closed: boolean;
  teachers: Array<{
    name: string;
    email: string;
  }>;
  teachingPlan: ITeachingPlan;
  approvalHistory: ISubjectApprovalHistory[];
}

interface HistoryModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  teachingPlan: ITeachingPlan;
  approvalHistory: ISubjectApprovalHistory[];
  subjectName: string;
  offerId: number;
  setSelectedOffer: React.Dispatch<React.SetStateAction<ISubjectOfferList>>;
}

function HistoryModal(props: HistoryModalProps) {
  const {
    isModalOpen,
    setIsModalOpen,
    teachingPlan,
    approvalHistory,
    subjectName,
    offerId,
    setSelectedOffer,
  } = props;

  const [comment, setComment] = useState<string>(null);

  // not to be used
  const handleReject = () => {};

  const handleApprove = () => {
    api
      .post(`api/subjectOffer/${offerId}/approvalHistory`, { approve: true })
      .then(() => {
        message.success("Operação realizada com sucesso!");
      })
      .catch((error) => {
        const { code } = error.response.data;
        switch (code) {
          default:
            message.error("Algo deu errado!");
            break;
        }
      })
      .finally(() => {
        setIsModalOpen(false);
        setSelectedOffer(null);
      });
  };

  const handleRejectConfirm = () => {
    if (!comment) message.error("Insira um comentário!");
    api
      .post(`api/subjectOffer/${offerId}/approvalHistory`, {
        approve: false,
        comment,
      })
      .then(() => {
        message.success("Operação realizada com sucesso!");
      })
      .catch((error) => {
        const { code } = error.response.data;
        switch (code) {
          default:
            message.error("Algo deu errado!");
            break;
        }
      })
      .finally(() => {
        setIsModalOpen(false);
        setSelectedOffer(null);
      });
  };

  const handleRejectCancel = () => {
    setComment(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <Modal
      title={subjectName}
      open={isModalOpen}
      onOk={() => () => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="back" onClick={() => setIsModalOpen(false)}>
          Retornar
        </Button>,
      ]}
      width={1000}
    >
      <Divider orientation="left">Plano de Ensino</Divider>

      <Descriptions layout="vertical" bordered column={1}>
        <Descriptions.Item label="Conteúdo">
          {teachingPlan?.content}
        </Descriptions.Item>
        <Descriptions.Item label="Métodologia">
          {teachingPlan?.methodology}
        </Descriptions.Item>
        <Descriptions.Item label="Critério de avaliação">
          {teachingPlan?.ratingCriteria}
        </Descriptions.Item>
        <Descriptions.Item label="Horário de Atendimento">
          {teachingPlan?.serviceHours}
        </Descriptions.Item>
        <Descriptions.Item label="Substitutiva">
          {teachingPlan?.substitute}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Comentários</Divider>

      <div>
        {!isNil(maxBy(approvalHistory, "createdAt")?.approve) &&
          !maxBy(approvalHistory, "createdAt")?.approve && (
            <RejectComment>
              <Comment
                style={{ backgroundColor: "transparent" }}
                // author={maxBy(approvalHistory, "createdAt")?.evaluator.name}
                author="Colegiado"
                avatar={
                  <Avatar
                    src="https://joeschmoe.io/api/v1/random"
                    alt={maxBy(approvalHistory, "createdAt")?.evaluator.name}
                  />
                }
                content={<p>{maxBy(approvalHistory, "createdAt")?.comment}</p>}
                // datetime={
                //   <span>
                //     {dayjs(
                //       maxBy(approvalHistory, "createdAt")?.createdAt
                //     ).format("DD/MM/YYYY - HH:mm:ss")}
                //   </span>
                // }
              />
            </RejectComment>
          )}
      </div>

      <Divider orientation="left">Ações</Divider>

      <Space direction="vertical" size={3} style={{ width: "100%" }}>
        <Popconfirm
          title={
            <div style={{ width: "30rem" }}>
              <p>Comentário de rejeição</p>
              <TextArea
                rows={3}
                value={comment}
                onChange={handleChange}
                placeholder="Insira um comentário..."
              />
            </div>
          }
          onConfirm={handleRejectConfirm}
          onCancel={handleRejectCancel}
          okText="Rejeitar"
          cancelText="Cancelar"
        >
          <Button type="primary" block danger onClick={handleReject}>
            Rejeitar
          </Button>
        </Popconfirm>

        <Button type="primary" block onClick={handleApprove}>
          Aprovar
        </Button>
      </Space>
    </Modal>
  );
}

export default HistoryModal;
