import { createSlice } from "@reduxjs/toolkit";
import { allCharClasses } from "./utility/charactersUtil";

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    current_character: {},
  },
  reducers: {
    clearSkillsOnLogout(state, action) {
      state.current_character = null;
    },
    selectCharSkills(state, action) {
      state.current_character = action.payload;
    },
    // Hard reset for skills state
    resetSkills(state, action) {
      const { character_class } = state.current_character;
      const charClass = allCharClasses.find(
        (s) => s.character_class === character_class
      );
      const { skills } = charClass;
      state.current_character = skills;
    },
    // This is the most complex operation that needs to interact with multiple other facets of all skills
    // related state properties. Will need revisions.
    increaseSkill(state, action) {
      const { skill_trees } = state.current_character;
      const { tree_id, skill_name } = action.payload;
      // finds the tree and skill that needs to be updated

      // ***
      const skillTreeToUpdate = skill_trees.find(
        (tree) => tree.tree_id === tree_id
      );

      const skillToUpdate = skillTreeToUpdate.skills.find(
        (s) => s.skill_name === skill_name
      );

      // filters out the tree and skill that aren't updated.

      // ***
      const filteredTrees = skill_trees.filter(
        (tree) => tree.tree_id !== tree_id
      );

      const filteredSkills = skillTreeToUpdate.skills.filter(
        (s) => s.skill_name !== skill_name
      );
      // the new skill objected to be added back in
      const newSkillValue = {
        ...skillToUpdate,
        skill_level: skillToUpdate.skill_level + 1,
      };

      const newTreeValue = {
        ...skillTreeToUpdate,
        skill_points_allocated: skillTreeToUpdate.skill_points_allocated + 1,
        skills: [...filteredSkills, newSkillValue],
      };

      // Need to create a better way to do this.
      // Maps the known_skills and returns an array of key values
      // then checks to see if that array of key values doesn't contain a matching
      // string for the skill name. If it does not, it pushes the skill object into the known_skills array
      // If it does exist, it replaces the previous skill object with an updated skill object.
      const knownSkillsKeys = state.current_character.known_skills.map(
        (s) => s.skill_name
      );
      if (!knownSkillsKeys.includes(skill_name)) {
        state.current_character.known_skills.push({
          ...newSkillValue,
          tree_id: tree_id,
        });
      } else {
        const filterKnownSkills = state.current_character.known_skills.filter(
          (s) => s.skill_name !== skill_name
        );
        state.current_character.known_skills = [
          ...filterKnownSkills,
          { ...newSkillValue, tree_id: tree_id },
        ];
      }
      // Ultimately the skill object is updated within the entire tree data as well as known_skills array.
      // This is the result that can likely be refactored with better design so that the skill_trees are only referenced, but not
      // actually altered or the reverse is the skill_tree is altered but there is a better way to separate the known skills
      // to be used for selecting active skills and seeing their properties combined with equipment effects

      // ***
      state.current_character.skill_trees = [
        ...filteredTrees,
        newTreeValue,
      ].sort((a, b) => a.tree_id - b.tree_id);
      const newSkillPointsAllocated =
        state.current_character.skill_points_allocated + 1;
      // current
      state.current_character.skill_points_allocated = newSkillPointsAllocated;
    },
    decreaseSkill(state, action) {
      const { skill_trees } = state.current_character;
      const { tree_id, skill_name } = action.payload;
      // finds the tree and skill that needs to be updated
      const skillTreeToUpdate = skill_trees.find(
        (tree) => tree.tree_id === tree_id
      );
      const skillToUpdate = skillTreeToUpdate.skills.find(
        (s) => s.skill_name === skill_name
      );
      // filters out the tree and skill that aren't updated.
      const filteredTrees = skill_trees.filter(
        (tree) => tree.tree_id !== tree_id
      );
      const filteredSkills = skillTreeToUpdate.skills.filter(
        (s) => s.skill_name !== skill_name
      );
      // the new skill objected to be added back in
      const newSkillValue = {
        ...skillToUpdate,
        skill_level: skillToUpdate.skill_level - 1,
      };

      // the new tree object to be added back in
      const newTreeValue = {
        ...skillTreeToUpdate,
        skill_points_allocated: skillTreeToUpdate.skill_points_allocated - 1,
        skills: [...filteredSkills, newSkillValue],
      };
      // Need to create a better way to do this.
      // Maps the known_skills and returns an array of key values
      // then checks to see if that array of key values doesn't contain a matching
      // string for the skill name. If it does not, it pushes the skill object into the known_skills array
      // If it does exist, it replaces the previous skill object with an updated skill object.
      const knownSkillsKeys = state.current_character.known_skills.map(
        (s) => s.skill_name
      );

      if (
        knownSkillsKeys.includes(skill_name) &&
        newSkillValue.skill_level <= 0
      ) {
        const filterKnownSkills = state.current_character.known_skills.filter(
          (s) => s.skill_name !== skill_name
        );
        state.current_character.known_skills = [...filterKnownSkills];
      } else if (
        knownSkillsKeys.includes(skill_name) &&
        newSkillValue.skill_level > 0
      ) {
        const filterKnownSkills = state.current_character.known_skills.filter(
          (s) => s.skill_name !== skill_name
        );
        state.current_character.known_skills = [
          ...filterKnownSkills,
          { ...newSkillValue, tree_id: tree_id },
        ];
      }
      // Ultimately the skill object is updated within the entire tree data as well as known_skills array.
      // This is the result that can likely be refactored with better design so that the skill_trees are only referenced, but not
      // actually altered or the reverse is the skill_tree is altered but there is a better way to separate the known skills
      // to be used for selecting active skills and seeing their properties combined with equipment effects
      state.current_character.skill_trees = [
        ...filteredTrees,
        newTreeValue,
      ].sort((a, b) => a.tree_id - b.tree_id);
      const newSkillPointsAllocated =
        state.current_character.skill_points_allocated - 1;
      // current
      state.current_character.skill_points_allocated = newSkillPointsAllocated;
    },
    // Sets a skill as "active" within the Character Sheet where a memoized selector will calculate the skill properties
    // combined with equipment properties like damage, additional skill levels from equipment, etc...
    setActiveSkill(state, action) {
      const { active_skills } = state.current_character;
      const { skill_slot, skill } = action.payload;
      if (skill_slot === "skill_1") {
        active_skills.skill_1 = skill;
      } else {
        active_skills.skill_2 = skill;
      }
    },
  },
});

export const {
  resetSkills,
  increaseSkill,
  setActiveSkill,
  selectCharSkills,
  decreaseSkill,
  clearSkillsOnLogout,
} = skillsSlice.actions;
export default skillsSlice.reducer;
