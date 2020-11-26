// Does not include bonuses from skills currently.
// Produces the final results for the basic_stats property of object
// returned by getCalculatedStats selector. The difference between flat values
// or min and max values is taken care of beforehand in and returned in the
// reducedItemModsObj
export const calculateLife = (
  increased_level,
  vitality_allocated,
  life,
  reducedItemModsObj
) => {
  let life_from_items = 0;
  let life_per_level_item = 0;
  let vitality_from_items = 0;
  let vitality_per_level_item = 0;
  // life added from all items
  if (reducedItemModsObj.hasOwnProperty("maxhp")) {
    life_from_items = reducedItemModsObj["maxhp"];
  }

  if (reducedItemModsObj.hasOwnProperty("item_hp_perlevel")) {
    life_per_level_item = reducedItemModsObj["item_hp_perlevel"];
  }
  // vitality added from all items
  if (reducedItemModsObj.hasOwnProperty("vitality")) {
    vitality_from_items = reducedItemModsObj["vitality"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_vitality_perlevel")) {
    vitality_per_level_item = reducedItemModsObj["item_vitality_perlevel"];
  }
  const { base_amount, per_level, per_vitality } = life;
  return (
    base_amount +
    life_from_items +
    per_level * increased_level +
    life_per_level_item * increased_level +
    per_vitality *
      (vitality_allocated +
        vitality_from_items +
        increased_level * vitality_per_level_item)
  );
};

export const calculateMana = (
  increased_level,
  energy_allocated,
  mana,
  reducedItemModsObj
) => {
  let mana_from_items = 0;
  let mana_per_level_item = 0;
  let energy_from_items = 0;
  const { base_amount, per_level, per_energy } = mana;
  // mana added from all items
  if (reducedItemModsObj.hasOwnProperty("maxmana")) {
    mana_from_items = reducedItemModsObj["maxmana"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_mana_perlevel")) {
    mana_per_level_item = reducedItemModsObj["item_mana_perlevel"];
  }
  // energy added from all items
  if (reducedItemModsObj.hasOwnProperty("energy")) {
    energy_from_items = reducedItemModsObj["energy"];
  }
  return (
    base_amount +
    mana_from_items +
    per_level * increased_level +
    mana_per_level_item * increased_level +
    per_energy * (energy_allocated + energy_from_items)
  );
};

export const calculateStamina = (
  increased_level,
  vitality_allocated,
  stamina,
  reducedItemModsObj
) => {
  let vitality_from_items = 0;
  const { base_amount, per_level, per_vitality } = stamina;
  // vitality added from all items
  if (reducedItemModsObj.hasOwnProperty("vitality")) {
    vitality_from_items = reducedItemModsObj["vitality"];
  }
  return (
    base_amount +
    per_level * increased_level +
    per_vitality * (vitality_allocated + vitality_from_items)
  );
};

export const calculateAttackRating = (
  attack_rating,
  dexterity_allocated,
  reducedItemModsObj,
  increased_level
) => {
  let ar_from_items = 0;
  let ar_per_level_item = 0;
  let dexterity_per_level_item = 0;
  let dexterity_from_items = 0;
  // attack rating added from all items
  if (reducedItemModsObj.hasOwnProperty("tohit")) {
    ar_from_items = reducedItemModsObj["tohit"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_tohit_perlevel")) {
    ar_per_level_item = reducedItemModsObj["item_tohit_perlevel"];
  }
  // dexterity added from all items
  if (reducedItemModsObj.hasOwnProperty("dexterity")) {
    dexterity_from_items = reducedItemModsObj["dexterity"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_dexterity_perlevel")) {
    dexterity_per_level_item = reducedItemModsObj["item_dexterity_perlevel"];
  }
  return (
    attack_rating +
    ar_from_items +
    ar_per_level_item * increased_level +
    (dexterity_allocated +
      dexterity_from_items +
      dexterity_per_level_item * increased_level) *
      5
  );
};

// Second defense calculation after getCalculatedItemDefense applys all item specific bonuses
// this one adds the base character defense, dexterity from base stats, allocated attribute points, as well as
// any dexterity added from equipment or defense added from off-armor sources.
// Produces the actual final result used in the character sheet.
export const calculateDefense = (
  defense,
  dexterity_allocated,
  reducedItemModsObj,
  armorValue,
  increased_level
) => {
  let defense_from_items = 0;
  let dexterity_from_items = 0;
  let dexterity_per_level_item = 0;
  let defense_from_armor = 0;
  // defense on reducedItemModsObj is flat defense added from off armor sources like rings, etc...
  if (reducedItemModsObj.hasOwnProperty("armorclass")) {
    defense_from_items = reducedItemModsObj["armorclass"];
  }
  // dexterity added from all items
  if (reducedItemModsObj.hasOwnProperty("dexterity")) {
    dexterity_from_items = reducedItemModsObj["dexterity"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_dexterity_perlevel")) {
    dexterity_per_level_item = reducedItemModsObj["item_dexterity_perlevel"];
  }
  // always calculates based on max roll. defense_from_armor is reduced defense min-max of all equiped armor
  if (armorValue && armorValue.max) {
    defense_from_armor = armorValue.max;
  }
  const total_dex =
    dexterity_allocated +
    dexterity_from_items +
    dexterity_per_level_item * increased_level;
  return (
    defense +
    defense_from_armor +
    defense_from_items +
    Math.floor(total_dex / 3 > 0 ? total_dex / 3 : 0)
  );
};

export const calculateStrength = (
  strength,
  strength_allocated,
  reducedItemModsObj,
  increased_level
) => {
  let strength_from_items = 0;
  let strength_per_level_item = 0;
  // strength added from all items
  if (reducedItemModsObj.hasOwnProperty("strength")) {
    strength_from_items = reducedItemModsObj["strength"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_strength_perlevel")) {
    strength_per_level_item = reducedItemModsObj["item_strength_perlevel"];
  }
  return (
    strength +
    strength_allocated +
    strength_from_items +
    strength_per_level_item * increased_level
  );
};

export const calculateDexterity = (
  dexterity,
  dexterity_allocated,
  reducedItemModsObj,
  increased_level
) => {
  let dexterity_from_items = 0;
  let dexterity_per_level_item = 0;
  // dexterity added from all items
  if (reducedItemModsObj.hasOwnProperty("dexterity")) {
    dexterity_from_items = reducedItemModsObj["dexterity"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_dexterity_perlevel")) {
    dexterity_per_level_item = reducedItemModsObj["item_dexterity_perlevel"];
  }
  return (
    dexterity +
    dexterity_allocated +
    dexterity_from_items +
    dexterity_per_level_item * increased_level
  );
};

export const calculateVitality = (
  vitality,
  vitality_allocated,
  reducedItemModsObj,
  increased_level
) => {
  let vitality_from_items = 0;
  let vitality_per_level_item = 0;
  // vitality added from all items
  if (reducedItemModsObj.hasOwnProperty("vitality")) {
    vitality_from_items = reducedItemModsObj["vitality"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_vitality_perlevel")) {
    vitality_per_level_item = reducedItemModsObj["item_vitality_perlevel"];
  }
  return (
    vitality +
    vitality_allocated +
    vitality_from_items +
    vitality_per_level_item * increased_level
  );
};

export const calculateEnergy = (
  energy,
  energy_allocated,
  reducedItemModsObj
) => {
  let energy_from_items = 0;
  // energy added from all items
  if (reducedItemModsObj.hasOwnProperty("energy")) {
    energy_from_items = reducedItemModsObj["energy"];
  }
  return energy + energy_allocated + energy_from_items;
};
// basic elemental resistances that need to include difficulty settings
export const calculateFireResist = (difficulty, reducedItemModsObj) => {
  let fire_resist_from_items = 0;
  let all_resist_from_items = 0;
  let res_penality = 0;
  if (difficulty === 2) {
    res_penality = -40;
  } else if (difficulty === 3) {
    res_penality = -100;
  }
  if (reducedItemModsObj.hasOwnProperty("fireresist")) {
    fire_resist_from_items = reducedItemModsObj["fireresist"];
  }
  if (reducedItemModsObj.hasOwnProperty("all_resist")) {
    all_resist_from_items = reducedItemModsObj["all_resist"];
  }
  return fire_resist_from_items + all_resist_from_items + res_penality;
};

export const calculateColdResist = (difficulty, reducedItemModsObj) => {
  let cold_resist_from_items = 0;
  let all_resist_from_items = 0;
  let res_penality = 0;
  if (difficulty === 2) {
    res_penality = -40;
  } else if (difficulty === 3) {
    res_penality = -100;
  }
  if (reducedItemModsObj.hasOwnProperty("coldresist")) {
    cold_resist_from_items = reducedItemModsObj["coldresist"];
  }
  if (reducedItemModsObj.hasOwnProperty("all_resist")) {
    all_resist_from_items = reducedItemModsObj["all_resist"];
  }
  return cold_resist_from_items + all_resist_from_items + res_penality;
};

export const calculateLightningResist = (
  difficulty,
  reducedItemModsObj,
  increased_level
) => {
  let lightning_resist_from_items = 0;
  let all_resist_from_items = 0;
  let lightning_resist_per_level_items = 0;
  let res_penality = 0;
  if (difficulty === 2) {
    res_penality = -40;
  } else if (difficulty === 3) {
    res_penality = -100;
  }
  if (reducedItemModsObj.hasOwnProperty("lightresist")) {
    lightning_resist_from_items = reducedItemModsObj["lightresist"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_resist_ltng_perlevel")) {
    lightning_resist_per_level_items =
      reducedItemModsObj["item_resist_ltng_perlevel"];
  }
  if (reducedItemModsObj.hasOwnProperty("all_resist")) {
    all_resist_from_items = reducedItemModsObj["all_resist"];
  }
  return (
    lightning_resist_from_items +
    all_resist_from_items +
    lightning_resist_per_level_items * increased_level +
    res_penality
  );
};

export const calculatePoisonResist = (difficulty, reducedItemModsObj) => {
  let poison_resist_from_items = 0;
  let all_resist_from_items = 0;
  let res_penality = 0;
  if (difficulty === 2) {
    res_penality = -40;
  } else if (difficulty === 3) {
    res_penality = -100;
  }
  if (reducedItemModsObj.hasOwnProperty("poisonresist")) {
    poison_resist_from_items = reducedItemModsObj["poisonresist"];
  }
  if (reducedItemModsObj.hasOwnProperty("all_resist")) {
    all_resist_from_items = reducedItemModsObj["all_resist"];
  }
  return poison_resist_from_items + all_resist_from_items + res_penality;
};
