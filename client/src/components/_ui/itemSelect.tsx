import { Select } from "antd";
import React, { useState } from "react";
import IUser from "../../types/apiResponses/users";
import api from "../../services/request.service";

export enum EItemSearchTypes {
  DEPARTAMENT = "departaments",
  SUBJECT = "subjects",
  USER = "user",
}

interface ISelect {
  placeholder: string;
  onChange: (e: any) => void;
  type: EItemSearchTypes;
  multiple?: boolean;
}

function ItemSelect(props: ISelect) {
  const { placeholder, onChange, type, multiple } = props;
  const [items, setItems] = useState<IUser[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>();

  const handleItemChange = (newValue: string) => {
    setSelectedItem(newValue);
    onChange(newValue);
  };

  const handleItemSearch = (newValue: string) => {
    if (newValue) {
      api.get(`/api/${type}/?name=${newValue}`).then((response) => {
        const newItems = response.data.data;
        setItems(newItems);
      });
    } else {
      setItems([]);
    }
  };

  return (
    <Select
      placeholder={placeholder}
      showSearch
      allowClear
      mode={multiple ? "multiple" : undefined}
      value={selectedItem}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleItemSearch}
      onChange={handleItemChange}
      notFoundContent="Nenhum item encontrado"
      options={(items || []).map((item) => ({
        value: item.id,
        label: item.name,
      }))}
    />
  );
}

ItemSelect.defaultProps = {
  multiple: false,
};

export default ItemSelect;
