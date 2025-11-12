import { createContext, useContext, useState, useEffect } from "react";
import { login, logout, getCurrentUser } from "../services/apiAuth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await getCurrentUser();
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Error fetching current user:", err);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) fetchCurrentUser();
  }, [currentUser]);

  const loginUser = async (email, password) => {
    const res = await login(email, password);
    setCurrentUser(res.data);
    return res;
  };

  const logoutUser = async () => {
    await logout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, loading, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
