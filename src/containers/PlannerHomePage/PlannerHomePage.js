import React from "react";
import {
  NewCharacterForm,
  SelectCharacterForm,
} from "../../components/components_index";

export const PlannerHomePage = (props) => {
  return (
    <div className="PlannerHomePage-container">
      <NewCharacterForm />
      <SelectCharacterForm />
    </div>
  );
};
