import React from "react";

export const ActiveSkillDisplay = (props) => {
  const { active_skill } = props;
  // will need a memoized selector to calculate the actual object that needs to be used for display
  // this selector will return an object that accounts for things like equipment bonuses
  const displayActiveSkill = (activeSkill) => {
    // Loops through activeSkill object and displays property keys and values related to preview information.
    // Will likely be refactored or changed as data shapes provides for API may change as well.
    if (activeSkill !== null && activeSkill !== undefined) {
      return (
        <div className="ActiveSkillDisplay-content">
          <span>
            {activeSkill.skill_name} {activeSkill.skill_level}
          </span>
          {Object.entries(activeSkill.skill_properties).map(([key, val]) => {
            if (key === "damage") {
              return Object.entries(val).map(([subKey, subVal]) => {
                if (subKey === "type") {
                  return null;
                } else {
                  return (
                    <span key={subKey}>
                      {subKey} {subVal[activeSkill.skill_level - 1]}
                    </span>
                  );
                }
              });
            } else {
              return (
                <span key={key}>
                  {key} {val[activeSkill.skill_level - 1]}
                </span>
              );
            }
          })}
        </div>
      );
    } else {
      return <div className="ActiveSkillDisplay-content">Select a skill</div>;
    }
  };
  return (
    <div className="ActiveSkillDisplay-container">
      {displayActiveSkill(active_skill)}
    </div>
  );
};
