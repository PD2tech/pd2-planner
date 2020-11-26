import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLevel, updateAttribute } from "../../../redux/slices/statsSlice";

export const LevelAttributeControl = (props) => {
  const { current_character } = useSelector((state) => state.stats);
  const { level_mods, difficulty_quests } = current_character;
  const {
    attribute_points,
    increased_level,
    strength_allocated,
    dexterity_allocated,
    vitality_allocated,
    energy_allocated,
  } = level_mods;
  const { stat_quests } = difficulty_quests;
  const total_attribute_points =
    stat_quests.norm.esen +
    stat_quests.nm.esen +
    stat_quests.hell.esen +
    attribute_points;

  const dispatch = useDispatch();
  const current_level = 1 + increased_level;
  const total_allocated =
    strength_allocated +
    dexterity_allocated +
    vitality_allocated +
    energy_allocated;
  const total_remaining = total_attribute_points - total_allocated;
  const handleAttributeDispatch = (attr, val) => {
    if (total_remaining <= 0 && val < level_mods[`${attr}_allocated`]) {
      return dispatch(updateAttribute({ attr: attr, val: val }));
    } else if (total_remaining - val <= 0) {
      return dispatch(
        updateAttribute({
          attr: attr,
          val: level_mods[`${attr}_allocated`] + total_remaining,
        })
      );
    } else if (total_remaining <= 0) {
      return null;
    } else {
      return dispatch(updateAttribute({ attr: attr, val: val }));
    }
  };
  return (
    <div className="LevelAttributeControl-container">
      <h4>Level/Attributes</h4>
      <div className="LevelAttribute-content">
        <div className="LevelAttribute-col">
          <span>
            <label htmlFor="Level">Level</label>
            <input
              type="number"
              id="Level"
              min={1}
              max={99}
              value={current_level}
              onChange={(e) => dispatch(updateLevel(e.target.value || 1))}
            />
          </span>
          <span className="PointsRemaining">
            Points Remaining: <span>{total_remaining}</span>
          </span>
          <span>
            <label htmlFor="Strength">Strength</label>
            <input
              type="number"
              id="Strength"
              min={0}
              max={505}
              value={strength_allocated}
              onChange={(e) =>
                handleAttributeDispatch("strength", e.target.value || 0)
              }
            />
          </span>
          <span>
            <label htmlFor="Dexterity">Dexterity</label>
            <input
              type="number"
              id="Dexterity"
              min={0}
              max={505}
              value={dexterity_allocated}
              onChange={(e) =>
                handleAttributeDispatch("dexterity", e.target.value || 0)
              }
            />
          </span>
          <span>
            <label htmlFor="Vitality">Vitality</label>
            <input
              type="number"
              id="Vitality"
              min={0}
              max={505}
              value={vitality_allocated}
              onChange={(e) =>
                handleAttributeDispatch("vitality", e.target.value || 0)
              }
            />
          </span>
          <span>
            <label htmlFor="Energy">Energy</label>
            <input
              type="number"
              id="Energy"
              min={0}
              max={505}
              value={energy_allocated}
              onChange={(e) =>
                handleAttributeDispatch("energy", e.target.value || 0)
              }
            />
          </span>
        </div>
      </div>
    </div>
  );
};
