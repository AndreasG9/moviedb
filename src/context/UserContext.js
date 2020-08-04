// import React, { useState, createContext } from "react"; 
import { useContext, createContext } from "react"; 


// TESTING 
/*

// export const UserContext = createContext(null); 
// export const DispatchUserContext = createContext(null); 

export const UserProvider = (({ children }) => {

  const [state, set_state] = useState({
    signed_in: true,
    session_id: "123", 
    username: "username123"
  });

  return (
    <UserContext.Provider value={state}>
      <DispatchUserContext.Provider value={set_state}>
        {children}
      </DispatchUserContext.Provider>
    </UserContext.Provider>
  )
}); 
*/ 

// session saved to state, able to be used throughout app (session info)
export const UserContext = createContext(null);

export function useUserContext(){
  return useContext(UserContext); 
}


