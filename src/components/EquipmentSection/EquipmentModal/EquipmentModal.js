import React, { useState } from "react";

import { EquipmentList } from "./EquipmentList/EquipmentList";
import { ItemPreview } from "./ItemPreview/ItemPreview";
import { Runewords } from "../Runewords/Runewords";
import { RunewordPreview } from "../RunewordPreview/RunewordPreview";

export const EquipmentModal = (props) => {
  const [selectionType, setSelectionType] = useState(0);
  const {
    closeEquipmentModal,
    selectItemFromListOnClick,
    filtered_list,
    filterListOnChange,
    filterInputOnChange,
    filter_value,
    selected_item,
    slot,
    runewordsState,
    filterRunewordListOnChange,
    filterRunewordInputOnChange,
    filterBaseListOnChange,
    filterBaseInputOnChange,
    selectBaseFromListOnClick,
    selectRuneFromListOnClick,
  } = props;

  const displaySelectionType = () => {
    if (selectionType === 0) {
      return (
        <>
          <EquipmentList
            selectItemFromListOnClick={selectItemFromListOnClick}
            filtered_list={filtered_list}
            filterListOnChange={filterListOnChange}
            filterInputOnChange={filterInputOnChange}
            filter_value={filter_value}
          />
          <ItemPreview selected_item={selected_item} slot={slot} />
        </>
      );
    } else if (selectionType === 1) {
      return (
        <>
          <Runewords
            slot={slot}
            runewordsState={runewordsState}
            filterRunewordListOnChange={filterRunewordListOnChange}
            filterRunewordInputOnChange={filterRunewordInputOnChange}
            filterBaseListOnChange={filterBaseListOnChange}
            filterBaseInputOnChange={filterBaseInputOnChange}
            selectBaseFromListOnClick={selectBaseFromListOnClick}
            selectRuneFromListOnClick={selectRuneFromListOnClick}
          />

          <RunewordPreview
            selected_runeword={runewordsState.selected_runeword}
            selected_base={runewordsState.selected_base}
            slot={slot}
          />
        </>
      );
    }
  };

  return (
    <div className="EquipmentModal-container">
      <div className="EquipmentModal-content">
        <div className="EquipmentModal-col">
          <button onClick={() => setSelectionType(0)}>Unique/Set</button>
          {slot === 0 || slot === 2 || slot === 3 || slot === 4 ? (
            <button onClick={() => setSelectionType(1)}>Runewords</button>
          ) : null}
          <div className="EquipmentModal-row">{displaySelectionType()}</div>
          <button
            className="remove-button"
            onClick={() => closeEquipmentModal()}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};
