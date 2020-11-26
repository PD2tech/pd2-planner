import React from "react";
import { useDispatch } from "react-redux";
import { resetSkills } from "../../../redux/slices/skillsSlice";

export const SkillTreeInputDisplay = (props) => {
  const { availableSkillpoints } = props;
  const dispatch = useDispatch();
  return (
    <div className="SkillTreeInputDisplay-container">
      <h5>Skill Points: {availableSkillpoints}</h5>
      <button className="remove-button" onClick={() => dispatch(resetSkills())}>
        Reset
      </button>
    </div>
  );
};
