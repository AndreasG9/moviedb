import React from "react";

function Header(  ){

  return(
    <div style={header_div_style}>
      <h1 style={header_style}>FILMS</h1>
    </div>

    // TODO 
    /*
    Buttons: SIGN IN, CREATE ACCOUNT, FILMS, LISTS 
    ... 
    */
  );
}

const header_div_style = {
  width: "100%",
  height: "10%",
  color: "#ffff",
  fontSize: "1.2rem",
  background: "#1a1a1a"
}

const header_style = {
  marginLeft: "10%"
}


export default Header; 