import { createContext, useCallback, useMemo, useState } from "react";
import api from "../../lib/axiosClient.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => ({
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
  }));

  const saveSession = useCallback((session, username) => {
    localStorage.setItem("token", session.token);
    localStorage.setItem("userId", session.userId);
    localStorage.setItem("username", username);
    setUser({ token: session.token, userId: String(session.userId), username });
  }, []);

  const logout = useCallback(async () => {
    if (!user.token) {
      throw new Error("Bạn chưa đăng nhập.");
    }
    await api.post("/api/users/auth/logout", { token: user.token });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("cartId");
    setUser({ token: null, userId: null, username: null });
  }, [user.token]);

  const value = useMemo(() => ({ ...user, saveSession, logout }), [user, saveSession, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
