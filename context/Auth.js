import React, { useState, createContext } from "react";

export const AuthUserContext = createContext({});

const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;
