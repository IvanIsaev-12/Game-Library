import {createContext, useContext, useState, useMemo} from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
   const [loggedIn, setLoggedIn] = useState(false);
   const value = useMemo(() => {
	  let user = {};
	  return { loggedIn, setLoggedIn, user };
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