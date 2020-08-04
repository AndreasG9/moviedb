import { useContext, createContext } from "react"; 


// session saved to state, able to be used throughout app (session info)
// value will be auth, and account(object will array values, ex. hold account detail, account rated movies, account watchlist, ....)
export const UserContext = createContext(null);

export function useUserContext(){
  return useContext(UserContext); 
}