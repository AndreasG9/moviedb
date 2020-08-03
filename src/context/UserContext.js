import React, { useState, createContext } from "react"; 

export const UserContext = createContext(null); 
export const DispatchUserContext = createContext(null); 


// TESTING 
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