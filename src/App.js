import React, { useState } from 'react';
import './App.css';
import Routes from "./Routes";
import { UserContext } from "./context/UserContext.js";

function App() {

  const [auth, set_auth] = useState(true); // testing  
  
  return (
    <div>
      <UserContext.Provider value={{auth, set_auth}}>
        <Routes className="App"></Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
