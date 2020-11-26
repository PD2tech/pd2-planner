import { createSlice } from "@reduxjs/toolkit";

// equiped[0] = helm
// equiped[1] = amulet
// equiped[2] = left hand
// equiped[3] = armor
// equiped[4] = right hand
// equiped[5] = gloves
// equiped[6] = left ring
// equiped[7] = belt
// equiped[8] = right ring
// equiped[9] = boots

const equipmentSlice = createSlice({
  name: "equipment",
  initialState: {
    current_character: {},
    selected_slot: null,
  },
  reducers: {
    clearEquipOnLogout(state, action) {
      state.current_character = null;
      state.selected_slot = null;
    },
    selectCharEquipment(state, action) {
      state.current_character = action.payload;
    },
    equipItem(state, action) {
      const { slot, item } = action.payload;
      if (slot === 2 && item.two_hand === true) {
        state.current_character.equipped[2] = item;
        state.current_character.equipped[4] = null;
      } else if (slot === 4 && item.two_hand === true) {
        state.current_character.equipped[4] = item;
        state.current_character.equipped[2] = null;
      } else if (
        slot === 2 &&
        state.current_character.equipped[4] &&
        state.current_character.equipped[4].two_hand === true
      ) {
        state.current_character.equipped[2] = item;
        state.current_character.equipped[4] = null;
      } else if (
        slot === 4 &&
        state.current_character.equipped[2] &&
        state.current_character.equipped[2].two_hand === true
      ) {
        state.current_character.equipped[4] = item;
        state.current_character.equipped[2] = null;
      } else {
        state.current_character.equipped[slot] = item;
      }
    },
    removeItem(state, action) {
      const { slot } = action.payload;
      if (
        slot === 2 &&
        state.current_character.equipped[4] &&
        state.current_character.equipped[4].two_hand === true
      ) {
        // updates current_character
        state.current_character.equipped[2] = null;
        state.current_character.equipped[4] = null;
      } else if (
        slot === 4 &&
        state.current_character.equipped[2] &&
        state.current_character.equipped[2].two_hand === true
      ) {
        // updates current_character
        state.current_character.equipped[2] = null;
        state.current_character.equipped[4] = null;
      } else {
        state.current_character.equipped[slot] = null;
      }
    },
    removeAll(state, action) {
      for (let i = 0; i < 10; i++) {
        state.current_character.equipped[i] = null;
      }
    },
    selectSlot(state, action) {
      const idx = action.payload;
      state.selected_slot = idx;
    },
  },
});

export const {
  equipItem,
  removeItem,
  removeAll,
  selectSlot,
  selectCharEquipment,
  clearEquipOnLogout,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
