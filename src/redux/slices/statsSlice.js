import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
  name: "characters",
  initialState: {
    current_character: null,
  },
  reducers: {
    clearStatsOnLogout(state, action) {
      state.current_character = null;
    },
    selectCharStats(state, action) {
      const {
        stats,
        character_name,
        character_class,
        character_sprite,
        character_id,
      } = action.payload;
      state.current_character = {
        character_id,
        character_name,
        character_class,
        character_sprite,
        ...stats,
      };
    },
    updateLevel(state, action) {
      let newLevel = parseInt(action.payload) - 1;
      if (newLevel < 1) {
        newLevel = 0;
      } else if (newLevel > 98) {
        newLevel = 98;
      }
      const newAttributePoints = newLevel * 5;
      const newSkillPoints = 1 * newLevel;
      // updates current_character
      state.current_character.level_mods.increased_level = newLevel;
      state.current_character.level_mods.attribute_points = newAttributePoints;
      state.current_character.level_mods.skill_points = newSkillPoints;
    },
    updateAttribute(state, action) {
      const key = `${action.payload.attr}_allocated`;
      let { val } = action.payload;
      if (val < 0) {
        val = 0;
      }
      // updates current_character
      state.current_character.level_mods[key] = parseInt(val);
    },
    setDifficulty(state, action) {
      const val = parseInt(action.payload);
      // updates current_character
      state.current_character.difficulty_quests.difficulty = val;
    },
    setSkillQuestCompletion(state, action) {
      const { difficulty, quest, checked, val } = action.payload;
      let newVal = val;
      if (checked === false) {
        newVal = 0;
      }
      // updates current_character
      state.current_character.difficulty_quests.skill_quests[difficulty][
        quest
      ] = parseInt(newVal);
    },
    setStatQuestCompletion(state, action) {
      const { difficulty, quest, checked, val } = action.payload;
      let newVal = val;
      if (checked === false) {
        newVal = 0;
      }
      // updates current_character
      state.current_character.difficulty_quests.stat_quests[difficulty][
        quest
      ] = parseInt(newVal);
    },
    setAllQuestsCheck(state, action) {
      const checked = action.payload;
      let newSkillQuests = {};
      let newStatQuests = {};
      if (checked) {
        newSkillQuests = {
          norm: {
            den: 1,
            rada: 1,
            izzy: 2,
          },
          nm: {
            den: 1,
            rada: 1,
            izzy: 2,
          },
          hell: {
            den: 1,
            rada: 1,
            izzy: 2,
          },
        };
        newStatQuests = {
          norm: {
            anya: 10,
            bird: 20,
            esen: 5,
          },
          nm: {
            anya: 10,
            bird: 20,
            esen: 5,
          },
          hell: {
            anya: 10,
            bird: 20,
            esen: 5,
          },
        };
      } else {
        newSkillQuests = {
          norm: {
            den: 0,
            rada: 0,
            izzy: 0,
          },
          nm: {
            den: 0,
            rada: 0,
            izzy: 0,
          },
          hell: {
            den: 0,
            rada: 0,
            izzy: 0,
          },
        };
        newStatQuests = {
          norm: {
            anya: 0,
            bird: 0,
            esen: 0,
          },
          nm: {
            anya: 0,
            bird: 0,
            esen: 0,
          },
          hell: {
            anya: 0,
            bird: 0,
            esen: 0,
          },
        };
      }
      // updates current_character
      state.current_character.difficulty_quests.skill_quests = newSkillQuests;
      state.current_character.difficulty_quests.stat_quests = newStatQuests;
    },
  },
});

export const {
  selectCharStats,
  setDifficulty,
  setSkillQuestCompletion,
  setStatQuestCompletion,
  setAllQuestsCheck,
  updateLevel,
  updateAttribute,
  clearStatsOnLogout,
} = statsSlice.actions;
export default statsSlice.reducer;
