import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  (loginObj, { rejectWithValue }) => {
    return axios
      .post(`${process.env.REACT_APP_API}/login`, loginObj, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.response.data.message));
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  (nothing, { rejectWithValue }) => {
    return axios
      .delete(`${process.env.REACT_APP_API}/logout`, { withCredentials: true })
      .then((res) => res.data.user)
      .catch((error) => rejectWithValue(error.response.data.message));
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  (userObj, { rejectWithValue }) => {
    return axios
      .post(`${process.env.REACT_APP_API}/register`, userObj, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.response.data.message));
  }
);

export const createNewChar = createAsyncThunk(
  "user/createNewChar",
  (dataObj, { rejectWithValue }) => {
    const { user_id, new_char } = dataObj;
    return axios
      .post(
        `${process.env.REACT_APP_API}/users/${user_id}/characters/new`,
        new_char,
        { withCredentials: true }
      )
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.response.data.message));
  }
);

export const updateChar = createAsyncThunk(
  "user/updateChar",
  (dataObj, { rejectWithValue }) => {
    const { user_id, character_id, update_char } = dataObj;
    return axios
      .put(
        `${process.env.REACT_APP_API}/users/${user_id}/characters/${character_id}/update`,
        update_char,
        { withCredentials: true }
      )
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.response.data.message));
  }
);

export const deleteChar = createAsyncThunk(
  "user/deleteChar",
  (dataObj, { rejectWithValue }) => {
    const { user_id, character_id, character_name } = dataObj;
    return axios
      .delete(
        `${process.env.REACT_APP_API}/users/${user_id}/characters/${character_id}/delete`,
        { withCredentials: true }
      )
      .then((res) => {
        window.alert(`Successfully delete ${character_name}`);
        return res.data;
      })
      .catch((error) => rejectWithValue(error.response.data.message));
  }
);

const currentUserSlice = createSlice({
  name: "user",
  initialState: {
    current_user: null,
    isLoggedIn: false,
    lastCharacterSave: null,
    login: {
      isLoading: false,
      error: null,
    },
    register: {
      isLoading: false,
      error: null,
    },
    character: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    currentCharacter(state, action) {
      state.current_user = {
        ...state.current_user,
        current_character_id: action.payload,
      };
    },
    guestCreateChar(state, action) {
      if (state.current_user && state.current_user.character_list.length > 0) {
        state.current_user.character_list.push(action.payload);
      } else {
        state.current_user = {
          character_list: [action.payload],
        };
      }
    },
    lastSave(state, action) {
      state.lastCharacterSave = action.payload;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.login.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.current_user = action.payload;
      state.isLoggedIn = true;
      state.login.isLoading = false;
      state.login.error = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.current_user = null;
      state.isLoggedIn = false;
      state.login.isLoading = false;
      state.login.error = action.payload;
    },
    [logoutUser.pending]: (state, action) => {
      state.login.isLoading = true;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.current_user = action.payload;
      state.isLoggedIn = false;
      state.login.isLoading = false;
      state.login.error = null;
    },
    [logoutUser.rejected]: (state, action) => {
      state.login.isLoading = action.payload;
      state.login.error = null;
    },
    [registerUser.pending]: (state, action) => {
      state.register.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.current_user = action.payload;
      state.isLoggedIn = true;
      state.register.isLoading = false;
      state.register.error = null;
    },
    [registerUser.rejected]: (state, action) => {
      state.current_user = null;
      state.isLoggedIn = false;
      state.register.isLoading = false;
      state.register.error = action.payload;
    },
    [createNewChar.pending]: (state, action) => {
      state.character.isLoading = true;
    },
    [createNewChar.fulfilled]: (state, action) => {
      state.current_user = action.payload;
      state.character.isLoading = false;
      state.character.error = null;
    },
    [createNewChar.rejected]: (state, action) => {
      state.character.isLoading = false;
      state.character.error = action.payload;
    },
    [updateChar.pending]: (state, action) => {
      state.character.isLoading = true;
    },
    [updateChar.fulfilled]: (state, action) => {
      state.current_user = action.payload;
      state.character.isLoading = false;
      state.character.error = null;
    },
    [updateChar.rejected]: (state, action) => {
      state.character.isLoading = false;
      state.character.error = action.payload;
    },
    [deleteChar.pending]: (state, action) => {
      state.character.isLoading = true;
    },
    [deleteChar.fulfilled]: (state, action) => {
      state.current_user = action.payload;
      state.character.isLoading = false;
      state.character.error = null;
    },
    [deleteChar.rejected]: (state, action) => {
      state.character.isLoading = false;
      state.character.error = action.payload;
    },
    // [curChar.pending]: (state, action) => {
    //   state.character.isLoading = true;
    // },
    // [curChar.fulfilled]: (state, action) => {
    //   state.current_user = action.payload;
    //   state.character.isLoading = false;
    //   state.character.error = null;
    // },
    // [curChar.rejected]: (state, action) => {
    //   state.character.isLoading = false;
    //   state.character.error = action.payload;
    // },
  },
});

export const {
  currentCharacter,
  lastSave,
  guestCreateChar,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
