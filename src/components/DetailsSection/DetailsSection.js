import React from "react";
import { useSelector } from "react-redux";
import { getCalculatedStats } from "../../redux/selectors/getCalculatedStats";

import { ActiveSkills } from "./ActiveSkills/ActiveSkills";
import { DamageDetails } from "./DamageDetails/DamageDetails";

export const DetailsSection = () => {
  const {
    // basic_stats,
    // advanced_stats,
    weapon_1,
    weapon_2,
  } = useSelector(getCalculatedStats);
  return (
    <div className="DetailsSection-container">
      <ActiveSkills />
      <DamageDetails weapon_1={weapon_1} weapon_2={weapon_2} />
    </div>
  );
};
