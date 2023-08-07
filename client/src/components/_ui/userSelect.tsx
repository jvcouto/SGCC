import { Select } from "antd";
import React, { useState } from "react";
import IUser from "../../types/apiResponses/users";
import api from "../../services/request.service";

interface IPersonSearchProps {
  placeholder: string;
  onChange: (e: any) => void;
}

function PersonSelect(props: IPersonSearchProps) {
  const { placeholder, onChange } = props;
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>();

  const handleUserChange = (newValue: string) => {
    setSelectedUser(newValue);
    onChange(newValue);
  };

  const handleUserSearch = (newValue: string) => {
    if (newValue) {
      api.get(`/api/user?name=${newValue}`).then((response) => {
        const newUsers = response.data.data;
        setUsers(newUsers);
      });
    } else {
      setUsers([]);
    }
  };

  return (
    <Select
      placeholder={placeholder}
      showSearch
      allowClear
      value={selectedUser}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleUserSearch}
      onChange={handleUserChange}
      notFoundContent="Nenhum item encontrado"
      options={(users || []).map((user) => ({
        value: user.id,
        label: user.name,
      }))}
    />
  );
}

export default PersonSelect;
