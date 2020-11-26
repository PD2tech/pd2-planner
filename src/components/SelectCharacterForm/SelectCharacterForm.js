import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { deleteChar, currentCharacter } from "../../redux/slices/currentUser";
import { selectCharStats } from "../../redux/slices/statsSlice";
import { selectCharSkills } from "../../redux/slices/skillsSlice";
import { selectCharEquipment } from "../../redux/slices/equipmentSlice";

export const SelectCharacterForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.currentUser);
  const { current_user } = useSelector((state) => state.currentUser);
  let character_list;
  let user_id;
  let current_character_id;
  if (current_user) {
    character_list = current_user.character_list;
    user_id = current_user.user_id;
    current_character_id = current_user.current_character_id;
  }

  const handleDeleteChar = async (id) => {
    const selectedCharacter = character_list.find((c) => c.character_id === id);
    const { character_id, character_name } = selectedCharacter;
    if (window.confirm(`Do you really want to delete ${character_name}`)) {
      try {
        await dispatch(
          deleteChar({
            user_id: user_id,
            character_id: character_id,
            character_name: character_name,
          })
        );
        if (character_id === current_character_id) {
          await dispatch(currentCharacter(null));
          await dispatch(selectCharSkills(null));
          await dispatch(selectCharEquipment(null));
          await dispatch(selectCharStats(null));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  const handleSelectChar = async (character_id) => {
    try {
      await dispatch(currentCharacter(character_id));
      if (location.pathname !== "/planner") {
        history.push("/planner");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="CharacterSelection-container">
      {character_list ? (
        character_list.map((c) => (
          <div className="CharacterProfile-container" key={c.character_id}>
            <div className="CharacterProfile-left">
              <h3>{c.character_name}</h3>
              <div className="CharacterProfile-sprite">
                <img
                  src={c.character_sprite}
                  alt={`${c.character_class} sprite`}
                />
              </div>
            </div>
            <div className="CharacterProfile-right">
              <h3>
                Level {c.stats.level_mods.increased_level + 1}{" "}
                {c.character_class}
              </h3>
              {c.skills.skill_trees.map((tree) => (
                <span key={`${c.character_name}-${tree.tree_name}`}>
                  {tree.tree_name} {tree.skill_points_allocated}
                </span>
              ))}

              <div className="CharacterProfile-buttons">
                <button
                  className="planner-site-form-submit-button"
                  onClick={() => handleSelectChar(c.character_id)}
                >
                  edit
                </button>
                {isLoggedIn ? (
                  <button
                    className={
                      c.character_id === ""
                        ? "remove-button-disabled"
                        : "remove-button"
                    }
                    type="button"
                    disabled={c.character_id === "" ? true : false}
                    onClick={() => handleDeleteChar(c.character_id)}
                  >
                    delete
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))
      ) : (
        <h3>No Characters</h3>
      )}
    </div>
  );
};
