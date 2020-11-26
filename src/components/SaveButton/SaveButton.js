import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkForChangesToSave } from "../../redux/selectors/checkForChangesToSave";
import { updateChar, lastSave } from "../../redux/slices/currentUser";

export const SaveButton = (props) => {
  const currentObj = useSelector(checkForChangesToSave);
  const { current_user, lastCharacterSave } = useSelector(
    (state) => state.currentUser
  );
  const { user_id } = current_user;

  const isDifferent =
    JSON.stringify(lastCharacterSave) !== JSON.stringify(currentObj);

  const dispatch = useDispatch();

  return (
    <div className="SaveButton-container">
      <button
        className={isDifferent ? "save-button" : "save-button-disabled"}
        disabled={!isDifferent}
        onClick={() => {
          dispatch(
            updateChar({
              user_id: user_id,
              character_id: currentObj.character_id,
              update_char: currentObj,
            })
          );
          dispatch(lastSave(currentObj));
        }}
      >
        {!isDifferent ? "saved" : "save"}
      </button>
      {isDifferent ? (
        <span className="not-saved">Character has unsaved changes</span>
      ) : (
        <span className="is-saved">Character is up-to-date</span>
      )}
    </div>
  );
};
