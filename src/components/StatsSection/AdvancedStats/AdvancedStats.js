import React, { useState } from "react";

export const AdvancedStats = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { advanced_stats } = props;
  const displayObjs = [
    { key: "magic_damage_reduction", string: "Reduced Magic Damage" },
    { key: "damageresist", string: "Phyiscal Damage Reduction" },
    { key: "item_absorbfire", string: "Fire Absorb" },
    { key: "item_absorbcold", string: "Cold Absorb" },
    { key: "item_absorbmagic", string: "Magic Absorb" },
    { key: "item_absorblight", string: "Lightning Absorb" },
    { key: "item_fastercastrate", string: "Faster Cast Rate" },
    { key: "item_fasterblockrate", string: "Faster Block Rate" },
    { key: "item_fastergethitrate", string: "Faster Hit Recovery" },
    { key: "item_fastermovevelocity", string: "Faster Run/Walk" },
    { key: "item_fasterattackrate", string: "Inc. Attack Speed" },
    { key: "item_pierce", string: "Chance To Pierce" },
    { key: "item_crushingblow", string: "Crushing Blow" },
    { key: "item_deadlystrike", string: "Deadly Strike" },
    { key: "item_openwounds", string: "Open Wounds" },
    { key: "lifedrainmindam", string: "Life Leech" },
    { key: "manadrainmindam", string: "Mana Leech" },
    { key: "passive_fire_mastery", string: "Fire Damage" },
    { key: "passive_cold_mastery", string: "Cold Damage" },
    { key: "passive_ltng_mastery", string: "Lightning Damage" },
    { key: "passive_pois_mastery", string: "Poison Damage" },
    { key: "passive_fire_pierce", string: "Fire Pierce" },
    { key: "passive_cold_pierce", string: "Cold Pierce" },
    { key: "passive_ltng_pierce", string: "Lightning Pierce" },
    { key: "passive_pois_pierce", string: "Poison Pierce" },
    { key: "item_magicbonus", string: "Magic Find" },
    { key: "item_goldbonus", string: "Gold Find" },
  ];

  return (
    <div className="AdvancedStats-container">
      <div className="AdvancedStats-row-1">
        <h4>Advanced Stats</h4>
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
        <div className="AdvancedStats-row-2">
          <div className="planner-block-list">
            <h5>Key</h5>
            <ul>
              {Object.entries(advanced_stats)
                .slice(0, 9)
                .map(([key, val]) => {
                  const displayObj = displayObjs.find((obj) => obj.key === key);
                  return (
                    <li key={key}>
                      <span className="li-key">{displayObj.string}</span>
                      <span className="li-val">{val} %</span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="planner-block-list">
            <h5>Defensive</h5>
            <ul>
              {Object.entries(advanced_stats)
                .slice(9, 15)
                .map(([key, val]) => {
                  const displayObj = displayObjs.find((obj) => obj.key === key);
                  return (
                    <li key={key}>
                      <span className="li-key">{displayObj.string}</span>
                      <span className="li-val">{val} %</span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="planner-block-list">
            <h5>Elemental</h5>
            <ul>
              {Object.entries(advanced_stats)
                .slice(15, 23)
                .map(([key, val]) => {
                  const displayObj = displayObjs.find((obj) => obj.key === key);
                  return (
                    <li key={key}>
                      <span className="li-key">{displayObj.string}</span>
                      <span className="li-val">{val} %</span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="planner-block-list">
            <h5>Misc.</h5>
            <ul>
              {Object.entries(advanced_stats)
                .slice(23)
                .map(([key, val]) => {
                  const displayObj = displayObjs.find((obj) => obj.key === key);
                  return (
                    <li key={key}>
                      <span className="li-key">{displayObj.string}</span>
                      <span className="li-val">{val} %</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
