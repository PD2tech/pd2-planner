import React from "react";

export const Runewords = (props) => {
  const {
    runewordsState,
    filterRunewordListOnChange,
    filterRunewordInputOnChange,
    filterBaseListOnChange,
    filterBaseInputOnChange,
    selectBaseFromListOnClick,
    selectRuneFromListOnClick,
  } = props;
  const {
    filtered_runeword_list,
    filtered_bases_list,
    filter_runeword_value,
    filter_bases_value,
  } = runewordsState;

  return (
    <div className="Runewords-container">
      <div className="Runewords-row">
        <div className="Runewords-col">
          <input
            type="text"
            placeholder="filter runewords by name"
            value={filter_runeword_value}
            onChange={(e) => {
              filterRunewordInputOnChange(e.target.value);
              filterRunewordListOnChange(e.target.value);
            }}
          />
          <ul>
            {filtered_runeword_list.map((i) => (
              <li
                className="rarity-1"
                key={i.item_name}
                onClick={() => selectRuneFromListOnClick(i)}
              >
                {i.item_name}
              </li>
            ))}
          </ul>
        </div>
        <div className="Runewords-col">
          <input
            type="text"
            placeholder="filter bases by name"
            value={filter_bases_value}
            onChange={(e) => {
              filterBaseInputOnChange(e.target.value);
              filterBaseListOnChange(e.target.value);
            }}
          />
          <ul>
            {filtered_bases_list.map((i) => (
              <li
                className="rarity-1"
                key={i.item_name}
                onClick={() => selectBaseFromListOnClick(i)}
              >
                {i.item_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
