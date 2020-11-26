import { createSelector } from "@reduxjs/toolkit";
import {
  calculateLife,
  calculateMana,
  calculateStamina,
  calculateAttackRating,
  calculateDefense,
  calculateStrength,
  calculateDexterity,
  calculateVitality,
  calculateEnergy,
  calculateFireResist,
  calculateColdResist,
  calculateLightningResist,
  calculatePoisonResist,
} from "./utility/basicStatsHelpers";
import { calculateAdvancedStats } from "./utility/advancedStatsHelper";
import { calculatedWeaponDamage } from "./utility/getCalculatedWeaponDmg";
import { getCalculatedItemDefense } from "./utility/getCalculatedItemDefense";
import { getReducedItemModsObj } from "./utility/getReducedItemModObj";

const currentCharacterStats = (state) => state.stats.current_character;
const currentEquipedItems = (state) =>
  state.equipment.current_character.equipped;
const currentActiveSkills = (state) =>
  state.skills.current_character.active_skills;

// Selector that utilizes level_mods property of a character and the base stats/attributes of a class
// to calculate the addition of level_mods to the base stats/attributes

export const getCalculatedStats = createSelector(
  [currentCharacterStats, currentEquipedItems, currentActiveSkills],
  (character, equipment, skills) => {
    const { base_stats, level_mods, difficulty_quests } = character;
    const {
      life,
      mana,
      stamina,
      attack_rating,
      defense,
      strength,
      dexterity,
      vitality,
      energy,
      character_level,
    } = base_stats;
    const {
      strength_allocated,
      dexterity_allocated,
      vitality_allocated,
      energy_allocated,
      increased_level,
    } = level_mods;
    const { difficulty, stat_quests } = difficulty_quests;
    const { norm, nm, hell } = stat_quests;
    const res_from_quests = norm.anya + nm.anya + hell.anya;
    const life_from_quests = norm.bird + nm.bird + hell.bird;

    // reduces/combines all mods that need to apply to the character stat calculations.
    // Exclused/filters out mods like Enhanced Damage or Enhanced Armor if the item is a weapon or armor
    // to differentiate between local and global mods in formulas
    const reducedItemModsObj = getReducedItemModsObj(equipment);

    // Returned value from all types of armor after applying item specific properties to their base defense values
    // like enhanced defense or flat defense
    const armorValue = getCalculatedItemDefense(equipment, increased_level);

    // Returned value of strength that includes base strength, allocated attribute points into strength,
    // and strength added from items. Used in the basic_stats property of returned object and weapon damage calcs
    const strengthVal = calculateStrength(
      strength,
      strength_allocated,
      reducedItemModsObj,
      increased_level
    );

    // Returned value of dexterity that includes base dexterity, allocated attribute points into dexterity,
    // and dexterity added from items. Used in the basic_stats property of returned object and weapon damage calcs
    // and final defense value calc.
    const dexterityVal = calculateDexterity(
      dexterity,
      dexterity_allocated,
      reducedItemModsObj,
      increased_level
    );

    const vitalityVal = calculateVitality(
      vitality,
      vitality_allocated,
      reducedItemModsObj,
      increased_level
    );

    const energyVal = calculateEnergy(
      energy,
      energy_allocated,
      reducedItemModsObj
    );

    // Returned property used in final resulting object that has total values for things like
    // absorbtion, FHR, IAS, FCR, MF, etc...
    const advanced_stats = calculateAdvancedStats(
      reducedItemModsObj,
      increased_level
    );

    // Left and equipment slot
    const leftHandWeapon = equipment[2];
    // Right hand equipment slot
    const rightHandWeapon = equipment[4];

    // skills currently don't really do anything.
    // will be based on active skills in skill slice
    const skill1 = skills;
    const skill2 = skills;

    const weapon_1_damage = calculatedWeaponDamage(
      leftHandWeapon,
      { strength: strengthVal, dexterity: dexterityVal },
      reducedItemModsObj,
      skill1,
      increased_level
    );

    const weapon_2_damage = calculatedWeaponDamage(
      rightHandWeapon,
      { strength: strengthVal, dexterity: dexterityVal },
      reducedItemModsObj,
      skill2,
      increased_level
    );

    const lifeVal =
      calculateLife(
        increased_level,
        vitality_allocated,
        life,
        reducedItemModsObj
      ) + life_from_quests;

    const manaVal = calculateMana(
      increased_level,
      energy_allocated,
      mana,
      reducedItemModsObj
    );

    const stamVal = calculateStamina(
      increased_level,
      vitality_allocated,
      stamina,
      reducedItemModsObj
    );

    const arVal = calculateAttackRating(
      attack_rating,
      dexterity_allocated,
      reducedItemModsObj,
      increased_level
    );

    const defVal = calculateDefense(
      defense,
      dexterity_allocated,
      reducedItemModsObj,
      armorValue,
      increased_level
    ).toFixed(2);

    const fireVal =
      calculateFireResist(difficulty, reducedItemModsObj) + res_from_quests;
    const coldVal =
      calculateColdResist(difficulty, reducedItemModsObj) + res_from_quests;
    const lightVal =
      calculateLightningResist(
        difficulty,
        reducedItemModsObj,
        increased_level
      ) + res_from_quests;
    const poisonVal =
      calculatePoisonResist(difficulty, reducedItemModsObj) + res_from_quests;

    // the returned object from the memoized selector that is utilized in the actual CharacterSheet component
    return {
      basic_stats: {
        level: character_level + increased_level,
        strength: strengthVal,
        dexterity: dexterityVal,
        vitality: vitalityVal,
        energy: energyVal,
        life: lifeVal,
        mana: manaVal,
        stamina: stamVal,
        attack_rating: arVal,
        defense: defVal,
        fire_resist: fireVal,
        cold_resist: coldVal,
        lightning_resist: lightVal,
        poison_resist: poisonVal,
      },
      advanced_stats: advanced_stats,
      weapon_1: weapon_1_damage,
      weapon_2: weapon_2_damage,
    };
  }
);
