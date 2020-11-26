import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  allHelms,
  allArmors,
  allBoots,
  allBelts,
  allHands,
  allGloves,
  allAmulets,
  allRings,
} from "../../json/items/itemExport";
import runewordList from "../../json/items/runewords/all_runewords.json";
import { runeword_bases } from "../../json/items/itemExport";

import {
  runewordsFilteredBySlot,
  getUseableBases,
} from "./util/runewordsBySlot";

import { EquipmentModal } from "./EquipmentModal/EquipmentModal";
import { CharacterEquipment } from "./CharacterEquipment/CharacterEquipment";
import { CharmInventory } from "./CharmInvetory/CharmInventory";

export const EquipmentSection = (props) => {
  const [equipmentList, setEquipmentList] = useState({
    all_equipment: [
      allHelms,
      allAmulets,
      allHands,
      allArmors,
      allGloves,
      allRings,
      allBelts,
      allBoots,
    ],
    selected_list: null,
    selected_item: null,
    filtered_list: null,
    filter_value: "",
  });
  const [runewordsState, setRunewordsState] = useState({
    runewords: [],
    item_bases: [],
    selected_runeword: null,
    selected_base: null,
    filtered_runeword_list: [],
    useable_bases_list: [],
    filtered_bases_list: [],
    filter_runeword_value: "",
    filter_bases_value: "",
  });
  const [equipmentModal, setEquipmentModal] = useState({
    isOpen: false,
    equipSlot: null,
  });

  const { equipped } = useSelector(
    (state) => state.equipment.current_character
  );

  const openEquipmentModal = (slot, idx) => {
    const { all_equipment } = equipmentList;
    setEquipmentModal({
      isOpen: true,
      equipSlot: slot,
    });
    const runewordListBySlot = runewordsFilteredBySlot(slot, runewordList);
    setRunewordsState((prevState) => ({
      ...prevState,
      runewords: runewordListBySlot,
      filtered_runeword_list: runewordListBySlot,
    }));
    // handles dealing with two handed weapons
    if (slot === 2 && equipped[4] && equipped[4].two_hand === true) {
      setEquipmentList((prevState) => ({
        ...prevState,
        selected_item: equipped[4],
        selected_list: all_equipment[idx],
        filtered_list: all_equipment[idx],
      }));
    } else if (slot === 4 && equipped[2] && equipped[2].two_hand === true) {
      setEquipmentList((prevState) => ({
        ...prevState,
        selected_item: equipped[2],
        selected_list: all_equipment[idx],
        filtered_list: all_equipment[idx],
      }));
    }
    // handles setting selected to current item if one is equipped
    else if (equipped[slot]) {
      setEquipmentList((prevState) => ({
        ...prevState,
        selected_item: equipped[slot],
        selected_list: all_equipment[idx],
        filtered_list: all_equipment[idx],
      }));
    } else {
      setEquipmentList((prevState) => ({
        ...prevState,
        selected_item: equipped[slot],
        selected_list: all_equipment[idx],
        filtered_list: all_equipment[idx],
      }));
    }
  };

  const closeEquipmentModal = () => {
    setEquipmentModal({
      isOpen: false,
      equipSlot: null,
    });
    setEquipmentList((prevState) => ({
      ...prevState,
      selected_item: null,
    }));
    setRunewordsState({
      runewords: [],
      item_bases: [],
      selected_runeword: null,
      selected_base: null,
      filtered_runeword_list: [],
      useable_bases_list: [],
      filtered_bases_list: [],
      filter_runeword_value: "",
      filter_bases_value: "",
    });
  };

  // Uni and Sets
  const filterListOnChange = (string) => {
    const { selected_list } = equipmentList;
    const result = selected_list.filter((item) =>
      item.item_name.toLowerCase().includes(string.toLowerCase())
    );
    setEquipmentList((prevState) => ({ ...prevState, filtered_list: result }));
  };

  const filterInputOnChange = (string) => {
    setEquipmentList((prevState) => ({ ...prevState, filter_value: string }));
  };

  const selectItemFromListOnClick = (itemObj) => {
    setEquipmentList((prevState) => ({
      ...prevState,
      selected_item: itemObj,
    }));
  };

  // Runewords
  const filterRunewordListOnChange = (string) => {
    const { runewords } = runewordsState;
    const result = runewords.filter((item) =>
      item.item_name.toLowerCase().includes(string.toLowerCase())
    );
    setRunewordsState((prevState) => ({
      ...prevState,
      filtered_runeword_list: result,
    }));
  };

  const filterRunewordInputOnChange = (string) => {
    setRunewordsState((prevState) => ({
      ...prevState,
      filter_runeword_value: string,
    }));
  };

  const filterBaseListOnChange = (string) => {
    const { useable_bases_list } = runewordsState;
    const result = useable_bases_list.filter((item) =>
      item.item_name.toLowerCase().includes(string.toLowerCase())
    );
    setRunewordsState((prevState) => ({
      ...prevState,
      filtered_bases_list: result,
    }));
  };

  const filterBaseInputOnChange = (string) => {
    setRunewordsState((prevState) => ({
      ...prevState,
      filter_bases_value: string,
    }));
  };

  const selectBaseFromListOnClick = (itemObj) => {
    setRunewordsState((prevState) => ({
      ...prevState,
      selected_base: itemObj,
    }));
  };

  const selectRuneFromListOnClick = (runeword) => {
    const useable_bases_list = getUseableBases(
      runeword,
      runeword_bases,
      equipmentModal.equipSlot
    );
    setRunewordsState((prevState) => ({
      ...prevState,
      selected_runeword: runeword,
      selected_base: null,
      useable_bases_list: useable_bases_list,
      filtered_bases_list: useable_bases_list,
    }));
  };

  // Display
  const handleItemImage = (slot) => {
    // handles dealing with two handed weapons
    if (slot === 2 && equipped[4] && equipped[4].two_hand === true) {
      return (
        <img
          src={equipped[4].item_image}
          alt={equipped[4].item_name}
          style={{ opacity: "0.5" }}
        />
      );
    } else if (slot === 4 && equipped[2] && equipped[2].two_hand === true) {
      return (
        <img
          src={equipped[2].item_image}
          alt={equipped[2].item_name}
          style={{ opacity: "0.5" }}
        />
      );
    } else if (equipped[slot]) {
      return (
        <img src={equipped[slot].item_image} alt={equipped[slot].item_name} />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="EquipmentSection-container">
      <div className="EquipmentSection-row-1">
        <h4>Equipment</h4>
      </div>
      <div className="EquipmentSection-row-2">
        <div className="EquipmentSection-character">
          {equipmentModal.isOpen ? (
            <EquipmentModal
              filtered_list={equipmentList.filtered_list}
              filter_value={equipmentList.filter_value}
              selected_item={equipmentList.selected_item}
              slot={equipmentModal.equipSlot}
              closeEquipmentModal={closeEquipmentModal}
              selectItemFromListOnClick={selectItemFromListOnClick}
              filterListOnChange={filterListOnChange}
              filterInputOnChange={filterInputOnChange}
              // runewords
              runewordsState={runewordsState}
              filterRunewordListOnChange={filterRunewordListOnChange}
              filterRunewordInputOnChange={filterRunewordInputOnChange}
              filterBaseListOnChange={filterBaseListOnChange}
              filterBaseInputOnChange={filterBaseInputOnChange}
              selectBaseFromListOnClick={selectBaseFromListOnClick}
              selectRuneFromListOnClick={selectRuneFromListOnClick}
            />
          ) : null}
          <CharacterEquipment
            openEquipmentModal={openEquipmentModal}
            handleItemImage={handleItemImage}
          />
        </div>
        <CharmInventory />
      </div>
    </div>
  );
};
