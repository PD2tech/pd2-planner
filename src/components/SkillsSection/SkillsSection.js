import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCalculatedSkillPoints } from "../../redux/selectors/getCalculatedSkill";

import { SkillTree } from "./SkillTree/SkillTree";
import { SkillTreeInputDisplay } from "./SkillTreeInputDisplay/SkillTreeInputDisplay";

export const SkillsSection = (props) => {
  const [mobileSkillTree, setMobileSkillTree] = useState(0);

  const availableSkillpoints = useSelector(getCalculatedSkillPoints);
  const { skill_trees } = useSelector(
    (state) => state.skills.current_character
  );

  const displaySkillTreeMobile = () => {
    if (mobileSkillTree === 0) {
      return (
        <SkillTree
          tree={skill_trees[0]}
          availableSkillpoints={availableSkillpoints}
        />
      );
    } else if (mobileSkillTree === 1) {
      return (
        <SkillTree
          tree={skill_trees[1]}
          availableSkillpoints={availableSkillpoints}
        />
      );
    } else {
      return (
        <SkillTree
          tree={skill_trees[2]}
          availableSkillpoints={availableSkillpoints}
        />
      );
    }
  };

  return (
    <div className="SkillsSection-container">
      <div className="SkillsSection-row-1">
        <h4>Skills</h4>
      </div>
      <SkillTreeInputDisplay availableSkillpoints={availableSkillpoints} />
      <div className="SkillsSection-row-2">
        {skill_trees.map((tree) => (
          <SkillTree
            tree={tree}
            availableSkillpoints={availableSkillpoints}
            key={tree.tree_name}
          />
        ))}
      </div>
      <div className="SkillsSection-col-mobile">
        <div className="SkillsSection-buttons-mobile">
          <button onClick={() => setMobileSkillTree(0)}>
            {skill_trees[0].tree_name}
          </button>
          <button onClick={() => setMobileSkillTree(1)}>
            {skill_trees[1].tree_name}
          </button>
          <button onClick={() => setMobileSkillTree(2)}>
            {skill_trees[2].tree_name}
          </button>
        </div>
        {displaySkillTreeMobile()}
      </div>
    </div>
  );
};
