import React from "react";
import { useDispatch } from "react-redux";
import { equipItem, removeItem } from "../../../redux/slices/equipmentSlice";

export const RunewordPreview = (props) => {
  const { selected_runeword, selected_base, slot } = props;
  const dispatch = useDispatch();

  const displayRuneword = () => {
    const {
      item_name,
      level_requirement,
      rune_string,
      property_strings,
    } = selected_runeword;
    return (
      <>
        <span className="rarity-3">{item_name}</span>
        <span>{rune_string}</span>
        <span>Required Level: {level_requirement}</span>
        {property_strings.map((obj) => (
          <span className="item-property-strings" key={obj.string}>
            {obj.string}
          </span>
        ))}
      </>
    );
  };

  const createRuneword = () => {
    const hasTwoHand =
      selected_base.item_type === "weapon" && selected_base.two_hand
        ? { two_hand: true }
        : null;

    const runewordItem = {
      item_name: selected_runeword.item_name,
      rune_string: selected_runeword.rune_string,
      item_type: selected_base.item_type,
      item_image: selected_base.item_image,
      ...hasTwoHand,
      item_properties: {
        ...selected_base.item_properties,
        level_requirement:
          selected_runeword.level_requirement >
          selected_base.item_properties.level_requirement
            ? selected_runeword.level_requirement
            : selected_base.item_properties.level_requirement,
      },
      item_mods: selected_runeword.item_mods,
      property_strings: selected_runeword.property_strings,
    };
    return runewordItem;
  };

  const displayCompleteRuneword = () => {
    const runewordItem = createRuneword();

    const { item_type, item_properties, property_strings } = runewordItem;
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
          <span className="rarity-3">{runewordItem.item_name}</span>
          <span>{runewordItem.item_properties.item_base}</span>
          <span>{runewordItem.rune_string}</span>
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
          <span className="rarity-3">{runewordItem.item_name}</span>
          <span>{runewordItem.item_properties.item_base}</span>
          <span>{runewordItem.rune_string}</span>
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
    }
  };

  return (
    <div className="RunewordPreview-container">
      <div className="button-container">
        {selected_runeword && selected_base ? (
          <button
            onClick={() => {
              const runewordItem = createRuneword();
              dispatch(equipItem({ item: runewordItem, slot: slot }));
            }}
          >
            equip
          </button>
        ) : null}
      </div>

      {selected_runeword && selected_base
        ? displayCompleteRuneword()
        : selected_runeword && !selected_base
        ? displayRuneword()
        : null}

      <div className="button-container">
        <button onClick={() => dispatch(removeItem({ slot: slot }))}>
          remove equipped
        </button>
      </div>
    </div>
  );
};
