// taken from a forum post somewhere
// *****
// Final weapon Damage =
// (((Normal Weapon Damage x 1.5) (only if ethereal)
// x (1 + Enhanced Damage on Weapon / 100)
// + Bonuses to Minimum/Maximum Damage of all gear
// x (1 +Strength*weapon multiplier/100 +Dexterity*weapon multiplier/100 +Off-Weapon Enhanced Damage(be sure its not a bug jewel!)/100 +Skill Damage Bonus%/100)
// x 2 (only if a critical or deadly strike is scored)
// + Elemental Damage (mercenarie will double any elemental damage when scored a critical, players not)
// x (1 - Skill Damage Penalty / 100)
// *****

// still will need to account for flat damage from skills, % of damage converted to an element by skills and any increased % elemental skill damage
// and poison damage that needs to be calculated separately for DoTs

export const calculatedWeaponDamage = (
  weapon,
  attributeBonus,
  reducedItemModsObj,
  skill,
  increased_level
) => {
  if (weapon && weapon.item_type === "weapon") {
    const { item_mods, item_properties } = weapon;
    const { damage, damage_bonus, quality_modifier } = item_properties;
    // These values are from the previous calculations for strength and dexterity utilizing
    // all sources of strength and dexterity
    const { strength, dexterity } = attributeBonus;

    // get base min-max damage range from weapon item_properties.
    let { min, max } = damage;

    // if the weapon is ethereal
    if (quality_modifier.ethereal === true) {
      min = min * 1.5;
      max = max * 1.5;
    }

    // if damage_bonus has strength and/or dex values, get variables for values.
    let strength_bonus = 0;
    let dexterity_bonus = 0;

    if (damage_bonus.hasOwnProperty("strength_bonus")) {
      strength_bonus = damage_bonus["strength_bonus"];
    }
    if (damage_bonus.hasOwnProperty("dexterity_bonus")) {
      dexterity_bonus = damage_bonus["dexterity_bonus"];
    }

    let added_min_damage = 0;
    let added_max_damage = 0;
    // added flat damage to both min and max
    let added_damage = 0;
    let enhanced_damage = 0;
    // added enhanced per level only applied to max calcs
    let enhanced_max_per_level = 0;
    // added flat damage per level only applied to max calcs
    let added_max_per_level = 0;
    // elemental
    let min_fire_damage = 0;
    let max_fire_damage = 0;
    let min_cold_damage = 0;
    let max_cold_damage = 0;
    let min_lightning_damage = 0;
    let max_lightning_damage = 0;

    // if item_mods has enhanced damage, added min and/or max to weapon, get variables for values.
    if (Object.keys(item_mods).length > 0) {
      if (item_mods.hasOwnProperty("item_damage_percent")) {
        enhanced_damage = item_mods["item_damage_percent"].max;
      }
      if (item_mods.hasOwnProperty("damage_min")) {
        added_min_damage += item_mods["damage_min"].max;
      }
      if (item_mods.hasOwnProperty("damage_max")) {
        added_max_damage += item_mods["damage_max"].max;
      }
      if (item_mods.hasOwnProperty("damage_flat")) {
        added_damage = item_mods["damage_flat"].max;
      }
      if (item_mods.hasOwnProperty("item_maxdamage_percent_perlevel")) {
        enhanced_max_per_level =
          item_mods["item_maxdamage_percent_perlevel"].max;
      }
      if (item_mods.hasOwnProperty("item_maxdamage_perlevel")) {
        added_max_per_level = item_mods["item_maxdamage_perlevel"].max;
      }
      // if item_mods has elemental damage. Assumes that elemental damage always has a min-max range
      // (I think it does? I'll have to double check, but I don't think anything adds a flat elemental damage value.)
      if (item_mods.hasOwnProperty("fire_damage")) {
        min_fire_damage = item_mods["fire_damage"].min;
        max_fire_damage = item_mods["fire_damage"].max;
      }
      if (item_mods.hasOwnProperty("cold_damage")) {
        min_cold_damage = item_mods["cold_damage"].min;
        max_cold_damage = item_mods["cold_damage"].max;
      }
      if (item_mods.hasOwnProperty("lightning_damage")) {
        min_lightning_damage = item_mods["lightning_damage"].min;
        max_lightning_damage = item_mods["lightning_damage"].max;
      }
    }
    // combines the base elemental damages into one value for now. Likely has to be refined
    // for more cases I haven't thought of yet that may half to do sub calculations for each element

    // ** Does not include poison damage or additional elemental damage from off-weapon sources
    // like charms, rings, armor, skills, etc... **
    let min_elemental_damage =
      min_fire_damage + min_cold_damage + min_lightning_damage;

    let max_elemental_damage =
      max_fire_damage + max_cold_damage + max_lightning_damage;

    // poison damage will need separate sub calculations because of over DoTs

    // if reducedItemObj has enhanced_damage_off, adds flat min_damage and/or max_damage, get variables for values.
    // These would be values added from non-weapon items like charms, armor, rings, etc...
    // name-spacing isn't clear just yet of whether it should be called enhanced_damage_off or just use
    // enhanced_damage with the differentiation being the source of reducedItemModsObj (char_mods on items) vs. item_mods
    let enhanced_damage_off = 0;
    if (reducedItemModsObj.hasOwnProperty("item_damage_percent")) {
      enhanced_damage_off = item_mods["item_damage_percent"].max;
    }
    if (reducedItemModsObj.hasOwnProperty("damage_min")) {
      added_min_damage += item_mods["damage_min"].max;
    }
    if (reducedItemModsObj.hasOwnProperty("damage_max")) {
      added_max_damage += item_mods["damage_max"].max;
    }

    // if a skill is active that affects damage, get variable for value
    // Currently doesn't include flat damage added from skills either so that needs to be
    // added in the appropriate place of the final formula.
    let enhanced_damage_skill = 0;
    let skill_modifier = 0;
    if (skill && skill.hasOwnProperty("enhanced_damage_skill")) {
      enhanced_damage_skill = item_mods["enhanced_damage_skill"];
    }
    if (skill && skill.hasOwnProperty("skill_modifier")) {
      skill_modifier = item_mods["skill_modifier"];
    }

    // breaks up the main formula into smaller chunks

    // damage bonus based on stength and dexterity and the type of weapon / bonuses

    const total_bonuses =
      (strength * strength_bonus) / 100 +
      (dexterity * dexterity_bonus) / 100 +
      enhanced_damage_off / 100 +
      enhanced_damage_skill / 100;

    // skill modifier value
    const total_skill_modifier = 1 - skill_modifier / 100;

    // Minimum Damage = (Weapon Minimum Damage + (+x To Minimum Damage)) * (1 + StatsBonus + (+x% Enhanced Damage) / 100) * Modifier
    // Maximum Damage = (Weapon Maximum Damage + (+x To Maximum Damage)) * (1 + StatsBonus + (+x% Enhanced Damage) / 100) * Modifier

    // min damage result from previous calculations to be used in final formula
    const total_min =
      min * (1 + enhanced_damage / 100) + added_min_damage + added_damage;
    // max damage result from previous calculations to be used in final formula
    const total_max =
      max *
        (1 +
          (enhanced_damage + enhanced_max_per_level * increased_level) / 100) +
      added_max_damage +
      added_damage +
      added_max_per_level * increased_level;

    // actual final value output for min damage result that will be displayed in character sheet
    const total_min_result =
      (total_min + (total_min * total_bonuses) / 100 + min_elemental_damage) *
      total_skill_modifier;
    // actual final value output for max damage result that will be displayed in character sheet
    const total_max_result =
      (total_max + (total_max * total_bonuses) / 100 + max_elemental_damage) *
      total_skill_modifier;

    // helper to compensate for decimal values
    const fixNumber = (n) => {
      return Number.parseFloat(n).toFixed(2);
    };

    // resulting object. returns null if no weapon is equiped or if it's a shield
    return {
      min: fixNumber(total_min_result),
      max: fixNumber(total_max_result),
    };
  } else {
    return null;
  }
};
