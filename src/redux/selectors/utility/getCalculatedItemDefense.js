export const getCalculatedItemDefense = (equipment, increased_level) => {
  // maps through all equipment and returns an array of all equipment with item_type = "armor"
  const allArmor = equipment.map((item) =>
    item && item.item_type === "armor" ? item : null
  );

  let calcedArmorArr = [];

  for (let i = 0; i < allArmor.length; i++) {
    if (allArmor[i]) {
      // get base min and max defense of armor
      const min = allArmor[i].item_properties.defense.min;
      const max = allArmor[i].item_properties.defense.max;
      // assign non-constants to use base defense
      let newMin = min;
      let newMax = max;
      // if ethereal, add the 50% increased def
      if (allArmor[i].item_properties.quality_modifier.ethereal === true) {
        newMin = min * 1.5;
        newMax = max * 1.5;
      }
      // if item_mods has enhanced defense property and that property has a min max range
      // then calculate based on max roll
      if (Object.keys(allArmor[i].item_mods).length > 0) {
        if (allArmor[i].item_mods.hasOwnProperty("item_armor_percent")) {
          const edMaxRoll = allArmor[i].item_mods["item_armor_percent"].max;
          newMin = newMin * (1 + edMaxRoll / 100);
          newMax = newMax * (1 + edMaxRoll / 100);
        }
        // if item_mods has additional defense property and that property has a min max range
        // then calculate based on max roll
        if (allArmor[i].item_mods.hasOwnProperty("armorclass")) {
          const defMaxRoll = allArmor[i].item_mods["armorclass"].max;
          newMin += defMaxRoll;
          newMax += defMaxRoll;
        }
        // if item_mods has additional defense per level property
        if (allArmor[i].item_mods.hasOwnProperty("item_armor_perlevel")) {
          const defPerLvl = allArmor[i].item_mods["item_armor_perlevel"].max;
          const totalDefPerLvl = defPerLvl * increased_level;
          newMin += totalDefPerLvl;
          newMax += totalDefPerLvl;
        }

        calcedArmorArr.push({ min: newMin, max: newMax });
      }
    }
  }
  // reduce final values of all armor after applying item property specific bonuses above
  const result = calcedArmorArr.reduce((acc, cur) => {
    for (let prop in cur) {
      if (acc.hasOwnProperty(prop)) {
        acc[prop] += cur[prop];
      } else {
        acc[prop] = cur[prop];
      }
    }
    return acc;
  }, {});

  return result;
};
