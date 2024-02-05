import React, { useEffect, useState } from "react";

import { Avatar, Empty, List, Modal } from "antd";
import IUser from "../../../../../types/apiResponses/users";
import api from "../../../../../services/request.service";

interface IOfferTeachersModalProps {
  offerId: number;
  open: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function OfferTeachersModal(props: IOfferTeachersModalProps) {
  const { open, setIsModalOpen, offerId } = props;
  const [teachers, setTeachers] = useState<IUser[]>();

  useEffect(() => {
    if (!offerId) return;
    api.get(`/api/subjectOffer/${offerId}/teachers`).then((response) => {
      const offerTeachers = response.data.data;
      setTeachers(offerTeachers);
    });
  }, [offerId]);

  return (
    <Modal
      title="Professores"
      open={open}
      footer={null}
      onCancel={() => setIsModalOpen(false)}
    >
      <List
        itemLayout="horizontal"
        dataSource={teachers}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Não há professores"
            />
          ),
        }}
        renderItem={(collegeMember) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="" />}
              title={collegeMember.name}
              description={collegeMember.email}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
}

export default OfferTeachersModal;
