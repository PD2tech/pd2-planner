import { createSelector } from "@reduxjs/toolkit";

const currentCharacterStats = (state) => state.stats.current_character;
const currentEquipedItems = (state) => state.equipment.current_character;
const currentActiveSkills = (state) => state.skills.current_character;

export const checkForChangesToSave = createSelector(
  [currentCharacterStats, currentEquipedItems, currentActiveSkills],
  (character, equipment, skills) => {
    const {
      character_id,
      character_name,
      character_class,
      character_sprite,
      base_stats,
      level_mods,
      difficulty_quests,
    } = character;

    const characterObj = {
      character_id,
      character_name,
      character_class,
      character_sprite,
      stats: {
        base_stats,
        level_mods,
        difficulty_quests,
      },
      skills,
      equipment,
    };

    return characterObj;
  }
);
