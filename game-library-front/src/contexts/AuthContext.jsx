import {createContext, useContext, useState, useMemo} from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
   const [loggedIn, setLoggedIn] = useState(false);
   const value = useMemo(() => {
	  return { loggedIn, setLoggedIn };
   }, [loggedIn]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}