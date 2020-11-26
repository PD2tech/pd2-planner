import React from "react";

export const SkillPreview = (props) => {
  const { skillForPreview } = props;

  const displaySkillInfo = (skillForPreview) => {
    // Loops through skillForPreview object and displays property keys and values related to preview information.
    // Will likely be refactored or changed as data shapes provides for API may change as well.
    if (skillForPreview) {
      return (
        <>
          <div className="SkillPreview-current">
            <span>current level</span>
            <span>
              {skillForPreview.skill_name} {skillForPreview.skill_level}
            </span>
            {skillForPreview.skill_properties
              ? Object.entries(skillForPreview.skill_properties).map(
                  ([key, val]) => {
                    let idx = skillForPreview.skill_level - 1;
                    if (idx < 0) {
                      return null;
                    } else {
                      if (key === "damage") {
                        return Object.entries(val).map(([subKey, subVal]) => {
                          if (subKey === "type") {
                            return null;
                          } else {
                            return (
                              <span key={subKey}>
                                {subKey} {subVal[idx]}
                              </span>
                            );
                          }
                        });
                      } else {
                        return (
                          <span key={key}>
                            {key} {val[idx]}
                          </span>
                        );
                      }
                    }
                  }
                )
              : null}
          </div>
          <div className="SkillPreview-next">
            <span>next level</span>
            {skillForPreview.skill_properties
              ? Object.entries(skillForPreview.skill_properties).map(
                  ([key, val]) => {
                    if (key === "damage") {
                      return Object.entries(val).map(([subKey, subVal]) => {
                        if (subKey === "type") {
                          return null;
                        } else {
                          return (
                            <span key={subKey}>
                              {subKey} {subVal[skillForPreview.skill_level]}
                            </span>
                          );
                        }
                      });
                    } else {
                      return (
                        <span key={key}>
                          {key} {val[skillForPreview.skill_level]}
                        </span>
                      );
                    }
                  }
                )
              : null}
          </div>
        </>
      );
    } else {
      return null;
    }
  };
  return (
    <div className="SkillPreview-container">
      <div className="SkillPreview-content">
        {displaySkillInfo(skillForPreview)}
      </div>
    </div>
  );
};
