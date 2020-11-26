import helms from "./uniques/uniques_all_helms.json";
import hands from "./uniques/unique_all_hands.json";
import armors from "./uniques/unique_armors.json";
import belts from "./uniques/unique_belts.json";
import boots from "./uniques/unique_boots.json";
import gloves from "./uniques/unique_gloves.json";
import rings from "./uniques/unique_rings.json";
import amulets from "./uniques/unique_amulets.json";
import item_bases from "./itembases/allBases.json";
import all_uniques from "./uniques/all_uniques.json";

export const allHelms = helms;
export const allArmors = armors;
export const allBelts = belts;
export const allBoots = boots;
export const allGloves = gloves;
export const allRings = rings;
export const allAmulets = amulets;
export const allHands = hands;

export const allUniques = [...all_uniques];

export const runeword_bases = item_bases.filter((item) =>
  item.item_properties.hasOwnProperty("sockets")
);
