const arrOfAllAdvancedStats = [
  "item_fastercastrate",
  "item_fasterblockrate",
  "item_fastergethitrate",
  "item_fastermovevelocity",
  "item_fasterattackrate",
  "item_pierce",
  "item_crushingblow",
  "item_deadlystrike",
  "item_openwounds",
  "magic_damage_reduction",
  "damageresist",
  "item_absorbfire",
  "item_absorbcold",
  "item_absorbmagic",
  "item_absorblight",
  "passive_fire_mastery",
  "passive_cold_mastery",
  "passive_ltng_mastery",
  "passive_pois_mastery",
  "passive_fire_pierce",
  "passive_cold_pierce",
  "passive_ltng_pierce",
  "passive_pois_pierce",
  "lifedrainmindam",
  "manadrainmindam",
  "item_magicbonus",
  "item_goldbonus",
];

export const calculateAdvancedStats = (reducedItemModsObj, increased_level) => {
  const advanced_stats = {};
  for (let i = 0; i < arrOfAllAdvancedStats.length; i++) {
    if (reducedItemModsObj.hasOwnProperty(arrOfAllAdvancedStats[i])) {
      let key = arrOfAllAdvancedStats[i];
      Object.assign(advanced_stats, {
        [arrOfAllAdvancedStats[i]]: reducedItemModsObj[key],
      });
    } else {
      Object.assign(advanced_stats, { [arrOfAllAdvancedStats[i]]: 0 });
    }
  }

  if (reducedItemModsObj.hasOwnProperty("item_deadlystrike_perlevel")) {
    advanced_stats.item_deadlystrike +=
      increased_level * reducedItemModsObj["item_deadlystrike_perlevel"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_find_gold_perlevel")) {
    advanced_stats.item_goldbonus +=
      increased_level * reducedItemModsObj["item_find_gold_perlevel"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_find_magic_perlevel")) {
    advanced_stats.item_magicbonus +=
      increased_level * reducedItemModsObj["item_find_magic_perlevel"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_absorb_cold_perlevel")) {
    advanced_stats.item_absorbcold +=
      increased_level * reducedItemModsObj["item_absorb_cold_perlevel"];
  }
  if (reducedItemModsObj.hasOwnProperty("item_absorb_fire_perlevel")) {
    advanced_stats.item_absorbfire +=
      increased_level * reducedItemModsObj["item_absorb_fire_perlevel"];
  }
  return advanced_stats;
};
