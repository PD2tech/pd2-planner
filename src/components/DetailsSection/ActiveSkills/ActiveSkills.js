import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveSkill } from "../../../redux/slices/skillsSlice";
import { ActiveSkillDisplay } from "./ActiveSkillDisplay/ActiveSkillDisplay";
import { ActiveSkillInput } from "./ActiveSkillInput/ActiveSkillInput";

export const ActiveSkills = (props) => {
  const [select1, setSelect1] = useState("Skill 1");
  const [select2, setSelect2] = useState("Skill 2");

  const dispatch = useDispatch();
  const { known_skills, active_skills } = useSelector(
    (state) => state.skills.current_character
  );
  const { skill_1, skill_2 } = active_skills;

  const onChange1 = (e) => {
    const skillName = e.target.value;
    const activeSkill = known_skills.find((s) => s.skill_name === skillName);
    setSelect1(e.target.value);
    dispatch(setActiveSkill({ skill_slot: "skill_1", skill: activeSkill }));
  };
  const onChange2 = (e) => {
    const skillName = e.target.value;
    const activeSkill = known_skills.find((s) => s.skill_name === skillName);
    setSelect2(e.target.value);
    dispatch(setActiveSkill({ skill_slot: "skill_2", skill: activeSkill }));
  };

  return (
    <div className="ActiveSkills-container">
      <ActiveSkillInput
        known_skills={known_skills}
        onChange={onChange1}
        this_select_value={select1}
        other_select_value={select2}
        option_key="Skill 1"
      />
      <ActiveSkillDisplay active_skill={skill_1} />
      <ActiveSkillInput
        known_skills={known_skills}
        onChange={onChange2}
        this_select_value={select2}
        other_select_value={select1}
        option_key="Skill 2"
      />
      <ActiveSkillDisplay active_skill={skill_2} />
    </div>
  );
};
