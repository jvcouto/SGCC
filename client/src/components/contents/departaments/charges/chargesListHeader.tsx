import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Tooltip } from "antd";
import React from "react";

import { ChargesListHeaderWrapper } from "./chargeList.style";
import { useAuth } from "../../../../contexts/authContext";
import USER_ROLES from "../../../../utils/constants/userRoles";
import IUser from "../../../../types/apiResponses/users";

interface IChargeListHeaderProps {
  subjectName: string;
  subjectOfferTeachers: IUser[];
  subjectOfferId: number;
  handleRequest: (id: number) => void;
}
function ChargeListHeader(props: IChargeListHeaderProps) {
  const { subjectName, subjectOfferTeachers, subjectOfferId, handleRequest } =
    props;

  const { user } = useAuth();

  const shouldRenderRequestButton = user.roles.includes(USER_ROLES.TEACHER);

  return (
    <ChargesListHeaderWrapper>
      <div>
        <span>{subjectName}</span>
      </div>

      <div>
        <Avatar.Group maxCount={3} maxPopoverTrigger="hover" size="large">
          {subjectOfferTeachers.map((teacher) => (
            <Tooltip title={teacher.name} placement="top">
              <Avatar icon={<UserOutlined />} />
            </Tooltip>
          ))}
        </Avatar.Group>
        {shouldRenderRequestButton && (
          <Button
            style={{ marginLeft: "1rem" }}
            type="primary"
            shape="circle"
            icon={<PlusCircleOutlined />}
            size="large"
            onClick={() => handleRequest(subjectOfferId)}
          />
        )}
      </div>
    </ChargesListHeaderWrapper>
  );
}

export default ChargeListHeader;
