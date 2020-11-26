import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.scss";
import { App } from "./containers/containers_index";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/store";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
// import axios from "axios";

const renderApp = async () => {
  let preloadedState = {
    currentUser: {
      current_user: null,
      isLoggedIn: false,
      login: { isLoading: false, error: null },
      register: { isLoading: false, error: null },
      character: { isLoading: false, error: null },
    },
    stats: { current_character: null },
    skills: { current_character: null },
    equipment: { current_character: null, selected_slot: null },
  };
  // const user = await axios
  //   .get(`${process.env.REACT_APP_API}/logged-in`, { withCredentials: true })
  //   .then((res) => res.data.user)
  //   .catch((error) => console.log(error.response.data));
  const user = null;

  if (user) {
    preloadedState = {
      currentUser: {
        current_user: user,
        isLoggedIn: true,
        login: { isLoading: false, error: null },
        register: { isLoading: false, error: null },
        character: { isLoading: false, error: null },
      },
      stats: { current_character: null },
      skills: { current_character: null },
      equipment: { current_character: null, selected_slot: null },
    };
  }
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
  });
  return ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

renderApp();
