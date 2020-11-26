import React from "react";
import { useSelector } from "react-redux";
import { getCalculatedStats } from "../../redux/selectors/getCalculatedStats";

import { BasicStats } from "./BasicStats/BasicStats";
import { AdvancedStats } from "./AdvancedStats/AdvancedStats";

export const StatsSection = (props) => {
  const { basic_stats, advanced_stats } = useSelector(getCalculatedStats);

  return (
    <div className="StatsSection-container">
      <BasicStats basic_stats={basic_stats} />
      <AdvancedStats advanced_stats={advanced_stats} />
    </div>
  );
};
