import { createSlice } from "@reduxjs/toolkit";

const USERS_KEY = "pizzeria_users";
const CURRENT_USER_KEY = "pizzeria_user";

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const getStoredUsers = () => readJson(USERS_KEY, []);
const initialUser = readJson(CURRENT_USER_KEY, null);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
    isAuthenticated: !!initialUser,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(action.payload));
    },
    registerUser: (state, action) => {
      const users = getStoredUsers();
      const exists = users.some(
        (user) =>
          user.username.toLowerCase() === action.payload.username.toLowerCase() ||
          user.email.toLowerCase() === action.payload.email.toLowerCase()
      );

      if (!exists) {
        users.push(action.payload);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }

      const currentUser = {
        username: action.payload.username,
        email: action.payload.email,
      };

      state.user = currentUser;
      state.isAuthenticated = true;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem(CURRENT_USER_KEY);
    },
  },
});

export const { loginUser, registerUser, logoutUser } = authSlice.actions;
export { getStoredUsers };
export default authSlice.reducer;
