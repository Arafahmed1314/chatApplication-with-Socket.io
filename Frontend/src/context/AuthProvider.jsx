import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const initialState = Cookies.get("user") || localStorage.getItem("user");
  const [authUser, setAuthUser] = useState(
    initialState ? JSON.parse(initialState) : null
  );
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
