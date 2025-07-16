import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
   const [loggedIn, setLoggedIn] = useState(false);
   const user = {}

	return (
		<AuthContext.Provider value={{ loggedIn, setLoggedIn, user }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}