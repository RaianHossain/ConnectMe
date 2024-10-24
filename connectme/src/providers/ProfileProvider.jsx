import React, { useReducer } from "react";
import { ProfileContext } from "../context";
import { initialState, profileReducer } from "../reducers/profileReducer";

function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;
