import React, { useRef, useEffect } from "react";

export const EquipmentList = (props) => {
  const {
    selectItemFromListOnClick,
    filtered_list,
    filterListOnChange,
    filterInputOnChange,
    filter_value,
  } = props;

  const filterInput = useRef(null);
  useEffect(() => {
    const filterRef = filterInput.current;
    filterRef.focus();
  }, []);

  return (
    <div className="EquipmentList">
      <input
        type="text"
        ref={filterInput}
        placeholder="filter items by name"
        value={filter_value}
        onChange={(e) => {
          filterInputOnChange(e.target.value);
          filterListOnChange(e.target.value);
        }}
      />
      <ul>
        {filtered_list.map((i) => (
          <li
            className={`rarity-${i.item_properties.rarity_type}`}
            key={i.item_name}
            onClick={() => selectItemFromListOnClick(i)}
          >
            {i.item_name}
          </li>
        ))}
      </ul>
    </div>
  );
};
