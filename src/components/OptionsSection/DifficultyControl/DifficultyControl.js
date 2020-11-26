import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDifficulty } from "../../../redux/slices/statsSlice";

export const DifficultyControl = (props) => {
  const { difficulty } = useSelector(
    (state) => state.stats.current_character.difficulty_quests
  );
  const dispatch = useDispatch();

  return (
    <div className="DifficultyControl-container">
      <h4>Difficulty</h4>
      <div className="DifficultyControl-content">
        <div className="DifficultyControl-row">
          <label htmlFor="normal">Normal</label>
          <input
            type="radio"
            onChange={(e) => dispatch(setDifficulty(e.target.value))}
            id="normal"
            name="difficulty"
            value={1}
            checked={difficulty === 1 ? true : false}
          />
        </div>
        <div className="DifficultyControl-row">
          <label htmlFor="nightmare">Nightmare</label>
          <input
            type="radio"
            onChange={(e) => dispatch(setDifficulty(e.target.value))}
            id="nightmare"
            name="difficulty"
            value={2}
            checked={difficulty === 2 ? true : false}
          />
        </div>
        <div className="DifficultyControl-row">
          <label htmlFor="hell">Hell</label>
          <input
            type="radio"
            onChange={(e) => dispatch(setDifficulty(e.target.value))}
            id="hell"
            name="difficulty"
            value={3}
            checked={difficulty === 3 ? true : false}
          />
        </div>
      </div>
    </div>
  );
};
