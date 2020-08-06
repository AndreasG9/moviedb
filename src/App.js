import React, { useState } from 'react';
import './App.css';
import Routes from "./Routes";
import { UserContext } from "./context/UserContext.js";

function App() {

  // TEMP TEMP keep state page refresh, keep session id until signed out TEMP TEMP 
  let init_id = localStorage.getItem("session_id");
  init_id = init_id == null ? false : true; 

  let init_acc = localStorage.getItem("account"); 
  init_acc = init_acc == null ? {details: [], favorites: [], ratings: [], watchlist: [], lists: [],} : JSON.parse(init_acc); 

  const [auth, set_auth] = useState(init_id); 
  const [account, set_account] = useState(init_acc); 
  
  
  return (
    <div>
      <UserContext.Provider value={{auth, set_auth, account, set_account}}>
        <Routes className="App"></Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;