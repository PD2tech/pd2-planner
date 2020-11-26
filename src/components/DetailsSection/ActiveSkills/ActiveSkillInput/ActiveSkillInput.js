import React from "react";

export const ActiveSkillInput = (props) => {
  const {
    onChange,
    known_skills,
    this_select_value,
    other_select_value,
    option_key,
  } = props;
  return (
    <div className="ActiveSkillInput-container">
      <select value={this_select_value} onChange={onChange} disabled={true}>
        <option value={option_key} disabled>
          {option_key}
        </option>
        {known_skills.map((s) => (
          <option
            value={s.skill_name}
            disabled={other_select_value === s.skill_name ? true : false}
            key={`${s.skill_name}-${option_key}`}
          >
            {s.skill_name}
          </option>
        ))}
      </select>
    </div>
  );
};
