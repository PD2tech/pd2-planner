// Produces an object with the final results of all equipment properties that affect character based stats
// i.e. strength, attack rating, fire resistance, off-weapon or armor properties that may affect things like
// defense, but aren't value strictly added to the item's values themselves.
// Also accounts for properties that have min-max rolls and always adds the max roll value for now.
// i.e. A helm with "strength: 2" and a belt with "strength: 2" will return an object with "strength: 4".
export const getReducedItemModsObj = (equipment) => {
  return equipment
    .map((item) => {
      if (item && item.item_type === "armor") {
        return Object.entries(item.item_mods).reduce((acc, [key, val]) => {
          if (
            key !== "armorclass" &&
            key !== "item_armor_percent" &&
            key !== "item_armor_perlevel"
          ) {
            acc[key] = val;
          }

          return acc;
        }, {});
      } else if (item && item.item_type === "weapon") {
        return Object.entries(item.item_mods)
          .filter(
            ([key, val]) =>
              key !== "item_damage_percent" &&
              key !== "damage_min" &&
              key !== "damage_max" &&
              key !== "damage_flat" &&
              key !== "item_maxdamage_perlevel" &&
              key !== "item_maxdamage_percent_perlevel"
          )
          .reduce((acc, [key, val]) => {
            acc[key] = val;
            return acc;
          }, {});
      } else if (item) {
        return item.item_mods;
      } else {
        return null;
      }
    })
    .reduce((acc, cur) => {
      for (let prop in cur) {
        if (acc.hasOwnProperty(prop) && Object.values(cur[prop]).length > 1) {
          acc[prop] += cur[prop].max;
        } else if (
          !acc.hasOwnProperty(prop) &&
          Object.values(cur[prop]).length > 1
        ) {
          acc[prop] = cur[prop].max;
        } else if (acc.hasOwnProperty(prop)) {
          acc[prop] += cur[prop];
        } else {
          acc[prop] = cur[prop];
        }
      }
      return acc;
    }, {});
};
