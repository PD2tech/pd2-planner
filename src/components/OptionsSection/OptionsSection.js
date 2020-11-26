import React from "react";
import { QuestControl } from "./QuestControl/QuestControl";
import { DifficultyControl } from "./DifficultyControl/DifficultyControl";
import { LevelAttributeControl } from "./LevelAttributeControl/LevelAttributeControl";

export const OptionsSection = (props) => {
  return (
    <div className="OptionsSection-container">
      <div className="OptionsSection-row-1">
        <h4>Character Options</h4>
      </div>

      <div className="OptionsSection-content">
        <LevelAttributeControl />
        <DifficultyControl />
        <QuestControl />
      </div>
    </div>
  );
};
