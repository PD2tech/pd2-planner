import React, { useState } from "react";

export const BasicStats = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { basic_stats } = props;
  // These are desctructured from the basic_stats property in
  // the calculated/derived object returned from getCalculatedStats selector
  const {
    strength,
    dexterity,
    vitality,
    energy,
    life,
    mana,
    fire_resist,
    cold_resist,
    lightning_resist,
    poison_resist,
    stamina,
    attack_rating,
    defense,
  } = basic_stats;

  return (
    <div className="BasicStats-container">
      <div className="BasicStats-row-1">
        <h4>Basic Stats</h4>
        <button
          className="show-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
              <path fill="#ffffff" d="M7,15L12,10L17,15H7Z" />
            </svg>
          ) : (
            <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
              <path fill="#ffffff" d="M7,10L12,15L17,10H7Z" />
            </svg>
          )}
        </button>
      </div>
      {isCollapsed ? null : (
        <>
          <div className="BasicStats-row-2">
            <div className="planner-block-list">
              <h5>Attributes</h5>
              <ul>
                <li>
                  <span className="li-key">Strength</span>
                  <span className="li-val">{strength}</span>
                </li>
                <li>
                  <span className="li-key">Dexterity</span>
                  <span className="li-val">{dexterity}</span>
                </li>
                <li>
                  <span className="li-key">Vitality</span>
                  <span className="li-val">{vitality}</span>
                </li>
                <li>
                  <span className="li-key">Energy</span>
                  <span className="li-val">{energy}</span>
                </li>
              </ul>
            </div>

            <div className="planner-block-list">
              <h5>Stats</h5>
              <ul>
                <li>
                  <span className="li-key">Life</span>
                  <span className="li-val">{life}</span>
                </li>
                <li>
                  <span className="li-key">Mana</span>
                  <span className="li-val">{mana}</span>
                </li>
                <li>
                  <span className="li-key">Attack rating</span>
                  <span className="li-val">{attack_rating}</span>
                </li>
                <li>
                  <span className="li-key">Defense</span>
                  <span className="li-val">{defense}</span>
                </li>
                <li>
                  <span className="li-key">Stamina</span>
                  <span className="li-val">{stamina}</span>
                </li>
              </ul>
            </div>

            <div className="planner-block-list">
              <h5>Resistances</h5>
              <ul>
                <li>
                  <span className="li-key">Fire Resist</span>
                  <span className="li-val">{fire_resist} %</span>
                </li>
                <li>
                  <span className="li-key">Cold Resist</span>
                  <span className="li-val">{cold_resist} %</span>
                </li>
                <li>
                  <span className="li-key">Lightning Resist</span>
                  <span className="li-val">{lightning_resist} %</span>
                </li>
                <li>
                  <span className="li-key">Poison Resist</span>
                  <span className="li-val">{poison_resist} %</span>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
