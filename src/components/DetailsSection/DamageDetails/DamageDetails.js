import React from "react";

export const DamageDetails = (props) => {
  const { weapon_1, weapon_2 } = props;
  // Differentiates between showing damage in UI based on which hand had a weapon, if both hands have a weapon
  // or if a 2 handed weapon is equipped
  const damageDisplay = () => {
    if (weapon_1 && weapon_2 === null) {
      return (
        <li>
          <span className="li-key">Damage</span>
          <span className="li-val">{`${weapon_1.min}-${weapon_1.max}`}</span>
        </li>
      );
    } else if (weapon_2 && weapon_1 === null) {
      return (
        <li>
          <span className="li-key">Damage</span>
          <span className="li-val">{`${weapon_2.min}-${weapon_2.max}`}</span>
        </li>
      );
    } else if (weapon_1 && weapon_2) {
      return (
        <>
          <li>
            <span className="li-key">Damage</span>
            <span className="li-val">{`${weapon_1.min}-${weapon_1.max}`}</span>
          </li>

          <li>
            <span className="li-key">Damage</span>
            <span className="li-val">{`${weapon_2.min}-${weapon_2.max}`}</span>
          </li>
        </>
      );
    } else {
      return (
        <li>
          <span className="li-key">Damage</span>
          <span className="li-val">1-2</span>
        </li>
      );
    }
  };
  return (
    <div className="DamageDetails-container">
      <ul>{damageDisplay()}</ul>
    </div>
  );
};
