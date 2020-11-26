import amazon from "../../../json/classes/amazon.json";
import assassin from "../../../json/classes/assassin.json";
import barbarian from "../../../json/classes/barbarian.json";
import druid from "../../../json/classes/druid.json";
import necromancer from "../../../json/classes/necromancer.json";
import paladin from "../../../json/classes/paladin.json";
import sorceress from "../../../json/classes/sorceress.json";

export const allCharClasses = [
  amazon,
  assassin,
  barbarian,
  druid,
  necromancer,
  paladin,
  sorceress,
];

// Currently, any additional modifications from leveling are separate state objects from
// the object and properties of a brand new character. The increased to level and attributes +
// their affect on stats is calculated through a memoized selector.
// This makes it easy to "reset" a character just by setting the level_mods properties back to 0
// instead of affecting the original character object.
export const level_mods = {
  increased_level: 0,
  skill_points: 0,
  attribute_points: 0,
  strength_allocated: 0,
  dexterity_allocated: 0,
  vitality_allocated: 0,
  energy_allocated: 0,
};

export const difficulty_quests = {
  difficulty: 1,
  skill_quests: {
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
  },
  stat_quests: {
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
  },
};
