import React from "react";
import { Route, Switch } from "react-router-dom";
import { PlannerEditorPage, PlannerHomePage } from "../containers_index";

export const App = () => {
  return (
    <div className="App">
      <div className="App-content">
        <Switch>
          <Route exact path="/planner" component={PlannerEditorPage} />
          <Route exact path="/" component={PlannerHomePage} />
        </Switch>
      </div>
    </div>
  );
};
