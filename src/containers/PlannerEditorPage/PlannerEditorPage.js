import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectCharStats } from "../../redux/slices/statsSlice";
import { selectCharSkills } from "../../redux/slices/skillsSlice";
import { selectCharEquipment } from "../../redux/slices/equipmentSlice";
import { lastSave } from "../../redux/slices/currentUser";
import {
  SaveButton,
  StatsSection,
  EquipmentSection,
  SkillsSection,
  OptionsSection,
  DetailsSection,
} from "../../components/components_index";
import zod from "../../assets/images/zod-icon.png";

export const PlannerEditorPage = (props) => {
  const [activeSection, setActiveSection] = useState(1);
  const dispatch = useDispatch();
  const { current_user, lastCharacterSave, isLoggedIn } = useSelector(
    (state) => state.currentUser
  );

  const current_character_id = current_user
    ? current_user.current_character_id
    : null;
  const character_list = current_user ? current_user.character_list : null;

  const charStats = useSelector((state) => state.stats.current_character);
  const charSkills = useSelector((state) => state.skills.current_character);
  const charEquip = useSelector((state) => state.equipment.current_character);

  const history = useHistory();

  useEffect(() => {
    if (current_character_id) {
      const selectedCharacter = character_list.find(
        (c) => c.character_id === current_character_id
      );
      const {
        equipment,
        skills,
        stats,
        character_id,
        character_name,
        character_class,
        character_sprite,
      } = selectedCharacter;
      dispatch(lastSave(selectedCharacter));
      dispatch(
        selectCharStats({
          stats: stats,
          character_id,
          character_name,
          character_class,
          character_sprite,
        })
      );
      dispatch(selectCharSkills(skills));
      dispatch(selectCharEquipment(equipment));
    } else {
      history.push("/planner");
    }
  }, [character_list, current_character_id, dispatch, history]);

  const displaySection = () => {
    if (activeSection === 1) {
      return <OptionsSection />;
    } else if (activeSection === 2) {
      return <EquipmentSection />;
    } else if (activeSection === 3) {
      return <SkillsSection />;
    } else {
      return <DetailsSection />;
    }
  };
  return (
    <>
      {charStats && charEquip && charSkills ? (
        <div className="PlannerEditorPage-container">
          <div className="PlannerEditorPage-col">
            <div className="PlannerEditorPage-controls-row">
              <div className="planner-character-info">
                <span>{charStats.character_name}</span>
                <span>{charStats.character_class}</span>
                <span>Level {charStats.level_mods.increased_level + 1}</span>
              </div>
              {isLoggedIn &&
              charStats &&
              charEquip &&
              charSkills &&
              lastCharacterSave ? (
                <SaveButton />
              ) : null}
            </div>
            <div className="PlannerEditorPage-controls-row">
              <button
                className="icon-button"
                onClick={() => setActiveSection(1)}
              >
                <img src={zod} alt="planner-options-icon" />
                <span>Options</span>
              </button>
              <button
                className="icon-button"
                onClick={() => setActiveSection(2)}
              >
                <img src={zod} alt="planner-equipment-icon" />
                <span>Equipment</span>
              </button>
              <button
                className="icon-button"
                onClick={() => setActiveSection(3)}
              >
                <img src={zod} alt="planner-skills-icon" />
                <span>Skills</span>
              </button>
              <button
                className="icon-button"
                onClick={() => setActiveSection(4)}
              >
                <img src={zod} alt="planner-details-icon" />
                <span>Details</span>
              </button>
            </div>
          </div>
          <StatsSection />
          {displaySection()}
        </div>
      ) : null}
    </>
  );
};
