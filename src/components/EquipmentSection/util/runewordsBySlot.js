export const runewordsFilteredBySlot = (slot, runewordList) => {
  let result = [];
  if (slot === 2 || slot === 4) {
    result = runewordList.filter(
      (rw) =>
        rw.base_types.includes("weapon") ||
        rw.base_types.includes("melee") ||
        rw.base_types.includes("sword") ||
        rw.base_types.includes("axe") ||
        rw.base_types.includes("mace") ||
        rw.base_types.includes("hammer") ||
        rw.base_types.includes("scepter") ||
        rw.base_types.includes("staff") ||
        rw.base_types.includes("polearm") ||
        rw.base_types.includes("spear") ||
        rw.base_types.includes("claw") ||
        rw.base_types.includes("wand") ||
        rw.base_types.includes("orb") ||
        rw.base_types.includes("dagger") ||
        rw.base_types.includes("club") ||
        rw.base_types.includes("bow") ||
        rw.base_types.includes("crossbow") ||
        rw.base_types.includes("shield")
    );
  } else if (slot === 0) {
    result = runewordList.filter((rw) => rw.base_types.includes("helm"));
  } else if (slot === 3) {
    result = runewordList.filter((rw) => rw.base_types.includes("body armor"));
  }
  return result;
};

export const getUseableBases = (runeword, runeword_bases, slot) => {
  const useable_bases_list = runeword_bases.filter((item) => {
    const { base_types, socket_requirement } = runeword;
    const { item_type } = item;
    const sockets = item.item_properties.sockets.max;
    const sub_type = item.item_properties.sub_type;
    if (
      base_types.includes("weapon") &&
      sockets >= socket_requirement &&
      item_type === "weapon"
    ) {
      return item;
    } else if (
      base_types.includes("weapon") &&
      sockets >= socket_requirement &&
      item_type === "weapon"
    ) {
      return item;
    } else if (base_types.includes("melee")) {
      if (sockets >= socket_requirement && sub_type === "sword") {
        return item;
      } else if (sockets >= socket_requirement && sub_type === "axe") {
        return item;
      } else if (sockets >= socket_requirement && sub_type === "mace") {
        return item;
      } else if (sockets >= socket_requirement && sub_type === "hammer") {
        return item;
      } else if (sockets >= socket_requirement && sub_type === "scepter") {
        return item;
      } else if (sockets >= socket_requirement && sub_type === "staff") {
        return item;
      } else if (sockets >= socket_requirement && sub_type === "polearm") {
        return item;
      } else if (sockets >= socket_requirement && sub_type === "spear") {
        return item;
      } else if (sockets >= socket_requirement && sub_type === "claw") {
        return item;
      } else if (sockets >= socket_requirement && sub_type === "wand") {
        return item;
      } else if (sockets >= socket_requirement && sub_type === "orb") {
        return item;
      } else if (sockets >= socket_requirement && sub_type === "dagger") {
        return item;
      } else if (sockets >= socket_requirement && sub_type === "club") {
        return item;
      }
    } else if (
      slot === 2 &&
      base_types.includes("shield") &&
      sockets >= socket_requirement &&
      sub_type === "shield"
    ) {
      return item;
    } else if (
      slot === 4 &&
      base_types.includes("shield") &&
      sockets >= socket_requirement &&
      sub_type === "shield"
    ) {
      return item;
    } else if (
      base_types.includes("club") &&
      sockets >= socket_requirement &&
      sub_type === "club"
    ) {
      return item;
    } else if (
      base_types.includes("hammer") &&
      sockets >= socket_requirement &&
      sub_type === "hammer"
    ) {
      return item;
    } else if (
      base_types.includes("mace") &&
      sockets >= socket_requirement &&
      sub_type === "mace"
    ) {
      return item;
    } else if (
      base_types.includes("scepter") &&
      sockets >= socket_requirement &&
      sub_type === "scepter"
    ) {
      return item;
    } else if (
      base_types.includes("sword") &&
      sockets >= socket_requirement &&
      sub_type === "sword"
    ) {
      return item;
    } else if (
      base_types.includes("axe") &&
      sockets >= socket_requirement &&
      sub_type === "axe"
    ) {
      return item;
    } else if (
      base_types.includes("staff") &&
      sockets >= socket_requirement &&
      sub_type === "staff"
    ) {
      return item;
    } else if (
      base_types.includes("body armor") &&
      sockets >= socket_requirement &&
      sub_type === "body armor"
    ) {
      return item;
    } else if (
      slot === 0 &&
      base_types.includes("helm") &&
      sockets >= socket_requirement &&
      sub_type === "helm"
    ) {
      return item;
    } else if (
      base_types.includes("bow") &&
      sockets >= socket_requirement &&
      sub_type === "bow"
    ) {
      return item;
    } else if (
      base_types.includes("crossbow") &&
      sockets >= socket_requirement &&
      sub_type === "crossbow"
    ) {
      return item;
    } else if (
      base_types.includes("wand") &&
      sockets >= socket_requirement &&
      sub_type === "wand"
    ) {
      return item;
    } else if (
      base_types.includes("polearm") &&
      sockets >= socket_requirement &&
      sub_type === "polearm"
    ) {
      return item;
    } else if (
      base_types.includes("pally shield") &&
      sockets >= socket_requirement &&
      sub_type === "shield" &&
      item.item_properties.class_specific === "Paladin"
    ) {
      return item;
    } else if (
      base_types.includes("claw") &&
      sockets >= socket_requirement &&
      sub_type === "claw"
    ) {
      return item;
    }
    return null;
  });
  return useable_bases_list;
};
