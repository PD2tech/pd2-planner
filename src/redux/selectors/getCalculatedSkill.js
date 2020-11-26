import { createSelector } from "@reduxjs/toolkit";

const curCharStats = (state) => state.stats.current_character;
const curCharSkills = (state) => state.skills.current_character;

export const getCalculatedSkillPoints = createSelector(
  [curCharStats, curCharSkills],
  (character, skills) => {
    const { level_mods, difficulty_quests } = character;
    const { skill_points } = level_mods;
    const { skill_points_allocated } = skills;
    const { skill_quests } = difficulty_quests;
    const { norm, nm, hell } = skill_quests;
    const norm_skill_points = Object.values(norm);
    const nm_skill_points = Object.values(nm);
    const hell_skill_points = Object.values(hell);
    const all_quest_points = [
      ...norm_skill_points,
      ...nm_skill_points,
      ...hell_skill_points,
    ].reduce((a, b) => a + b);

    return skill_points + all_quest_points - skill_points_allocated;
  }
);
