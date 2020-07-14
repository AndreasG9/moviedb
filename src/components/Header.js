import React from "react";

// TESTING, context when first visit page

function Header(  ){

  return(
    <div style={header_div_style}>
      <h1 style={header_style}>FILMS</h1>

      <nav>
        <button style={sign_in_style} className="hover focus">SIGN IN</button>
        <button style={sign_in_style} className="hover focus">CREATE ACCOUNT</button>
      </nav>
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
  height: "6%",
  // border: "5px solid white",
  // color: "#ffff",
  backgroundColor: "#1a1a1a",
  fontSize: "1.3rem",
  display: "flex",
  alignItems: "center"
}

const header_style = {
  marginLeft: "15%",
  color: "#fffff4",
}

const sign_in_style = {
  marginLeft: "600px",
  border: "none",
  background: "none",
  color: "#a5a5a5",
  marginTop: "auto",
  fontFamily: "Roboto",
  fontSize: "1.0rem"
}


const nav_button = {
  // border: "none",
  // background: "none",
  // color: "#a5a5a5",
  // marginTop: "auto",
  // fontFamily: "Roboto",
  // fontSize: "1.0rem"
}



export default Header; 