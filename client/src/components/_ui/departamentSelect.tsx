import { Select } from "antd";
import React, { useState } from "react";
import IUser from "../../types/apiResponses/users";
import api from "../../services/request.service";

interface IDepartamentSelect {
  placeholder: string;
  onChange: (e: any) => void;
}

function DepartamentSelect(props: IDepartamentSelect) {
  const { placeholder, onChange } = props;
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedDepartament, setSelectedDepartament] = useState<string>();

  const handleDepartamentChange = (newValue: string) => {
    setSelectedDepartament(newValue);
    onChange(newValue);
  };

  const handleDepartamentSearch = (newValue: string) => {
    if (newValue) {
      api.get(`/api/departaments?name=${newValue}`).then((response) => {
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
      value={selectedDepartament}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleDepartamentSearch}
      onChange={handleDepartamentChange}
      notFoundContent="Nenhum item encontrado"
      options={(users || []).map((user) => ({
        value: user.id,
        label: user.name,
      }))}
    />
  );
}

export default DepartamentSelect;
