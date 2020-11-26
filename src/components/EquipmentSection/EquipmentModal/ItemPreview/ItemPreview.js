import React from "react";
import { useDispatch } from "react-redux";
import { equipItem, removeItem } from "../../../../redux/slices/equipmentSlice";

export const ItemPreview = (props) => {
  const { selected_item, slot } = props;
  const dispatch = useDispatch();

  const itemDisplay = () => {
    if (selected_item) {
      const { item_type, item_properties, property_strings } = selected_item;
      if (item_type === "weapon") {
        const {
          damage,
          durability,
          strength_requirement,
          dexterity_requirement,
          level_requirement,
        } = item_properties;
        return (
          <>
            <span>
              Damage: {damage.min}-{damage.max}
            </span>
            {durability > 0 ? <span>Durability: {durability}</span> : null}
            {dexterity_requirement > 0 ? (
              <span>Required Dexterity: {dexterity_requirement}</span>
            ) : null}
            {strength_requirement > 0 ? (
              <span>Required Strength: {strength_requirement}</span>
            ) : null}
            {level_requirement > 0 ? (
              <span>Required Level: {level_requirement}</span>
            ) : null}
            {property_strings.map((obj) => (
              <span className="item-property-strings" key={obj.string}>
                {obj.string}
              </span>
            ))}
          </>
        );
      } else if (item_type === "armor") {
        const {
          defense,
          durability,
          strength_requirement,
          level_requirement,
        } = item_properties;
        return (
          <>
            <span>
              Defense: {defense.min}-{defense.max}
            </span>
            {durability > 0 ? <span>Durability: {durability}</span> : null}
            {strength_requirement > 0 ? (
              <span>Required Strength: {strength_requirement}</span>
            ) : null}
            {level_requirement > 0 ? (
              <span>Required Level: {level_requirement}</span>
            ) : null}
            {property_strings.map((obj) => (
              <span className="item-property-strings" key={obj.string}>
                {obj.string}
              </span>
            ))}
          </>
        );
      } else if (item_type === "ring" || item_type === "amulet") {
        const { level_requirement } = item_properties;
        return (
          <>
            {level_requirement > 0 ? (
              <span>Required Level: {level_requirement}</span>
            ) : null}
            {property_strings.map((obj) => (
              <span className="item-property-strings" key={obj.string}>
                {obj.string}
              </span>
            ))}
          </>
        );
      } else {
        return null;
      }
    }
  };

  return (
    <div className="ItemPreview">
      <div className="button-container">
        {selected_item ? (
          <button
            onClick={() =>
              dispatch(equipItem({ item: selected_item, slot: slot }))
            }
          >
            equip
          </button>
        ) : null}
      </div>
      {selected_item ? (
        <span className={`rarity-${selected_item.item_properties.rarity_type}`}>
          {selected_item.item_name}
        </span>
      ) : null}
      {itemDisplay()}
      <div className="button-container">
        <button onClick={() => dispatch(removeItem({ slot: slot }))}>
          remove equipped
        </button>
      </div>
    </div>
  );
};
