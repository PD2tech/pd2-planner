import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSkillQuestCompletion,
  setStatQuestCompletion,
  setAllQuestsCheck,
} from "../../../redux/slices/statsSlice";
import { skill_quests_data, stats_quests_data } from "./quest_data";

export const QuestControl = (props) => {
  const dispatch = useDispatch();
  const { skill_quests, stat_quests } = useSelector(
    (state) => state.stats.current_character.difficulty_quests
  );

  return (
    <div className="QuestControl-container">
      <h4>Quests</h4>
      <div className="QuestControl-content">
        <span className="CheckAll">
          <label id="check-all">Check All</label>
          <input
            type="checkbox"
            id="check-all"
            onChange={(e) => {
              dispatch(setAllQuestsCheck(e.target.checked));
            }}
          />
        </span>
        <div className="QuestControl-row">
          <div className="DifficultyQuests-container">
            <span className="Difficulty-label">Normal</span>
            <div className="Quests-container">
              {skill_quests_data.norm.map((q) => (
                <span key={q.id}>
                  <label id={q.id}>{q.label}</label>
                  <input
                    type="checkbox"
                    id={q.id}
                    value={q.value}
                    checked={skill_quests.norm[q.quest] !== 0}
                    onChange={(e) => {
                      dispatch(
                        setSkillQuestCompletion({
                          difficulty: q.difficulty,
                          quest: q.quest,
                          checked: e.target.checked,
                          val: e.target.value,
                        })
                      );
                    }}
                  />
                </span>
              ))}
            </div>
            <div className="Quests-container">
              {stats_quests_data.norm.map((q) => (
                <span key={q.id}>
                  <label id={q.id}>{q.label}</label>
                  <input
                    type="checkbox"
                    id={q.id}
                    value={q.value}
                    checked={stat_quests.norm[q.quest] !== 0}
                    onChange={(e) =>
                      dispatch(
                        setStatQuestCompletion({
                          difficulty: q.difficulty,
                          quest: q.quest,
                          checked: e.target.checked,
                          val: e.target.value,
                        })
                      )
                    }
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="DifficultyQuests-container">
            <span className="Difficulty-label">Nightmare</span>
            <div className="Quests-container">
              {skill_quests_data.nightmare.map((q) => (
                <span key={q.id}>
                  <label id={q.id}>{q.label}</label>
                  <input
                    type="checkbox"
                    id={q.id}
                    value={q.value}
                    checked={skill_quests.nm[q.quest] !== 0}
                    onChange={(e) =>
                      dispatch(
                        setSkillQuestCompletion({
                          difficulty: q.difficulty,
                          quest: q.quest,
                          checked: e.target.checked,
                          val: e.target.value,
                        })
                      )
                    }
                  />
                </span>
              ))}
            </div>
            <div className="Quests-container">
              {stats_quests_data.nightmare.map((q) => (
                <span key={q.id}>
                  <label id={q.id}>{q.label}</label>
                  <input
                    type="checkbox"
                    id={q.id}
                    value={q.value}
                    checked={stat_quests.nm[q.quest] !== 0}
                    onChange={(e) =>
                      dispatch(
                        setStatQuestCompletion({
                          difficulty: q.difficulty,
                          quest: q.quest,
                          checked: e.target.checked,
                          val: e.target.value,
                        })
                      )
                    }
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="DifficultyQuests-container">
            <span className="Difficulty-label">Hell</span>
            <div className="Quests-container">
              {skill_quests_data.hell.map((q) => (
                <span key={q.id}>
                  <label id={q.id}>{q.label}</label>
                  <input
                    type="checkbox"
                    id={q.id}
                    value={q.value}
                    checked={skill_quests.hell[q.quest] !== 0}
                    onChange={(e) =>
                      dispatch(
                        setSkillQuestCompletion({
                          difficulty: q.difficulty,
                          quest: q.quest,
                          checked: e.target.checked,
                          val: e.target.value,
                        })
                      )
                    }
                  />
                </span>
              ))}
            </div>
            <div className="Quests-container">
              {stats_quests_data.hell.map((q) => (
                <span key={q.id}>
                  <label id={q.id}>{q.label}</label>
                  <input
                    type="checkbox"
                    id={q.id}
                    value={q.value}
                    checked={stat_quests.hell[q.quest] !== 0}
                    onChange={(e) =>
                      dispatch(
                        setStatQuestCompletion({
                          difficulty: q.difficulty,
                          quest: q.quest,
                          checked: e.target.checked,
                          val: e.target.value,
                        })
                      )
                    }
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
