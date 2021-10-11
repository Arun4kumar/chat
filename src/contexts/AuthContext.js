import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      // setLoading(false);
      // if (user) history.push("/chats");
      setLoading(false);
      if (user) history.push("/chats");
    });
  }, [user, history]);

  const errorChange = (error) => {
    setError(error);
  };
  const value = {
    user,
    error,
    alertError: errorChange,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
