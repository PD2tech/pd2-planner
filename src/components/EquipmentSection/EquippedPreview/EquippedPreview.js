import React from "react";

export const EquippedPreview = (props) => {
  const { item } = props;

  const itemDisplay = () => {
    if (item) {
      const { item_type, item_properties, property_strings } = item;
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
    <div className="EquippedPreview-container">
      <div className="ItemPreview">
        <span className={`rarity-${item.item_properties.rarity_type}`}>
          {item.item_name}
        </span>
        {itemDisplay()}
      </div>
    </div>
  );
};
