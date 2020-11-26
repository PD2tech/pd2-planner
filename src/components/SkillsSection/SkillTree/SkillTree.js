import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  increaseSkill,
  decreaseSkill,
} from "../../../redux/slices/skillsSlice";
import { SkillPreview } from "../SkillPreview/SkillPreview";

export const SkillTree = (props) => {
  const [skillForPreview, setSkillForPreview] = useState(null);
  const dispatch = useDispatch();

  const { tree, availableSkillpoints } = props;
  const { skills, tree_name, tree_id, skill_points_allocated } = tree;

  return (
    <div className="SkillTree-container">
      <h4>
        {tree_name} {skill_points_allocated}
      </h4>
      <div className="SkillTree-content">
        {skills.map((s) => (
          <div
            className={`skill-icon item-${s.row}-${s.col}`}
            key={s.skill_name}
          >
            <span className="skill-level">{s.skill_level}</span>
            {skillForPreview && skillForPreview.skill_name === s.skill_name ? (
              <SkillPreview skillForPreview={skillForPreview} />
            ) : null}
            <button
              onClick={() => {
                if (availableSkillpoints <= 0 || s.skill_level >= 20) {
                  return;
                } else {
                  return dispatch(
                    increaseSkill({
                      tree_id: tree_id,
                      skill_name: s.skill_name,
                    })
                  );
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                if (s.skill_level > 0) {
                  return dispatch(
                    decreaseSkill({
                      tree_id: tree_id,
                      skill_name: s.skill_name,
                    })
                  );
                } else {
                  return;
                }
              }}
              onMouseEnter={() => setSkillForPreview(s)}
              onMouseLeave={() => setSkillForPreview(null)}
            >
              <img src={s.skill_icon} alt={s.skill_name} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
