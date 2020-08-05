import React, { useState } from 'react';
import './App.css';
import Routes from "./Routes";
import { UserContext } from "./context/UserContext.js";

function App() {

  // keep state page refresh, keep session id until signed out 
  let init = localStorage.getItem("session_id");
  const active = init == null ? false : true;  
  // init = localStorage.getItem("account"); 
  // const active2 = init == null ? {details: [],fav_movies: [],rated_movies: [],watchlist: [],lists: [],} : init; 

  // console.log(active2); 

  const [auth, set_auth] = useState(true); // testing  
  const [account, set_account] = useState({
    details: [],
    fav_movies: [],
    rated_movies: [],
    watchlist: [],
    lists: [],
  });
  
  
  return (
    <div>
      <UserContext.Provider value={{auth, set_auth, account, set_account}}>
        <Routes className="App"></Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
