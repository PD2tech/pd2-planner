import React from "react";
import { useDispatch } from "react-redux";
import { removeAll } from "../../../redux/slices/equipmentSlice";

export const CharacterEquipment = (props) => {
  const { openEquipmentModal, handleItemImage } = props;
  const dispatch = useDispatch();
  return (
    <>
      <div className="CharacterEquipment-character-1">
        <button
          onClick={() => openEquipmentModal(0, 0)}
          className="equipment-1"
        >
          {handleItemImage(0)}
        </button>
        <button
          onClick={() => openEquipmentModal(1, 1)}
          className="equipment-2"
        >
          {handleItemImage(1)}
        </button>
      </div>

      <div className="CharacterEquipment-character-2">
        <button
          onClick={() => openEquipmentModal(2, 2)}
          className="equipment-3"
        >
          {handleItemImage(2)}
        </button>
        <button
          onClick={() => openEquipmentModal(3, 3)}
          className="equipment-4"
        >
          {handleItemImage(3)}
        </button>
        <button
          onClick={() => openEquipmentModal(4, 2)}
          className="equipment-3"
        >
          {handleItemImage(4)}
        </button>
      </div>

      <div className="CharacterEquipment-character-3">
        <button
          onClick={() => openEquipmentModal(5, 4)}
          className="equipment-1"
        >
          {handleItemImage(5)}
        </button>
        <button
          onClick={() => openEquipmentModal(6, 5)}
          className="equipment-2"
        >
          {handleItemImage(6)}
        </button>
        <button
          onClick={() => openEquipmentModal(7, 6)}
          className="equipment-5"
        >
          {handleItemImage(7)}
        </button>
        <button
          onClick={() => openEquipmentModal(8, 5)}
          className="equipment-2"
        >
          {handleItemImage(8)}
        </button>
        <button
          onClick={() => openEquipmentModal(9, 7)}
          className="equipment-1"
        >
          {handleItemImage(9)}
        </button>
      </div>
      <button className="remove-button" onClick={() => dispatch(removeAll())}>
        Remove All
      </button>
    </>
  );
};
