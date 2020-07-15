import React from "react";

// TESTING, context when first visit page

function Header(  ){

  return(
    <div style={header_div_style}>
      <h1 style={header_style}>
        {/* <svg style={icon_style} enable-background="new 0 0 512 512" height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><g><path d="m324.75 0h-203.75v90h240c66.72 0 121 54.28 121 121 0 55.024-38.856 102.937-91.332 116.294.213-3.739.332-7.502.332-11.294 0-108.075-87.477-196-195-196-107.798 0-196 88.213-196 196 0 107.799 88.214 196 196 196 70.77 0 132.851-38.093 167.026-94.947 86.314-18.051 148.974-94.347 148.974-182.303 0-15.092 0-32.408 0-47.5 0-102.964-84.301-187.25-187.25-187.25zm-23.75 60h-60v-30h60zm-150-30h60v30h-60zm210 30h-30v-29.862c45.377 1.784 85.88 22.874 113.483 55.28-24.615-16.537-53.423-25.418-83.483-25.418zm-165 422c-91.533 0-166-74.467-166-166s74.467-166 166-166c90.981 0 165 74.467 165 166s-74.019 166-165 166zm183.988-101.071c2.514-7.177 4.626-14.542 6.303-22.071 20.441-3.466 39.859-11.081 57.125-22.326-16.971 19.539-38.696 35.015-63.428 44.397z"/><path d="m196 271c24.813 0 45-20.187 45-45s-20.187-45-45-45-45 20.187-45 45 20.187 45 45 45zm0-60c8.271 0 15 6.729 15 15s-6.729 15-15 15-15-6.729-15-15 6.729-15 15-15z"/><path d="m196 361c-24.813 0-45 20.187-45 45s20.187 45 45 45 45-20.187 45-45-20.187-45-45-45zm0 60c-8.271 0-15-6.729-15-15s6.729-15 15-15 15 6.729 15 15-6.729 15-15 15z"/><path d="m106 271c-24.813 0-45 20.187-45 45s20.187 45 45 45 45-20.187 45-45-20.187-45-45-45zm0 60c-8.271 0-15-6.729-15-15s6.729-15 15-15 15 6.729 15 15-6.729 15-15 15z"/><path d="m286 271c-24.813 0-45 20.187-45 45s20.187 45 45 45 45-20.187 45-45-20.187-45-45-45zm0 60c-8.271 0-15-6.729-15-15s6.729-15 15-15 15 6.729 15 15-6.729 15-15 15z"/><path d="m181 301h30v30h-30z"/></g></svg> */}
        <span>FILMS</span>
      </h1>

      <nav style={nav_style}>
        <button style={{...nav_button, ...sign_in_style}} className="hover focus" >SIGN IN</button>
        <button style={{...nav_button, ...create_account_style}} className="hover focus" >CREATE ACCOUNT</button>
        <button style={{...nav_button, ...films_style}} className="hover focus" >FILMS</button>
        <button style={{...nav_button, ...lists_style}} className="hover focus" >LISTS</button>
      </nav>



    </div>
  );
}

// styles 
const header_div_style = {
  width: "100%",
  height: "5%",
  backgroundColor: "#1a1a1a",
  fontSize: "1.3rem",
  display: "flex",
  alignItems: "center"
}

const header_style = {
  marginLeft: "15%",
  color: "#fffff4",
}

// const icon_style = {
//   width: "40px",
//   height: "35px",
//   marginRight: "10px",
//   marginTop: "5px",
//   position: "relative",
//   top: "5%"
//   //backgroundColor: "white"
// }


const nav_style = {
  marginLeft: "30%",
  display: "flex",
  justifyContent: "space-between",
  width: "35%",
}


const nav_button = {
  border: "none",
  background: "none",
  color: "#a5a5a5",
  fontFamily: "Roboto",
  fontSize: "1.0rem",
  padding: "5px",
}

const sign_in_style = {
  //marginLeft: "600px",
  // border: "none",
  // background: "none",
  // color: "#a5a5a5",
  // marginTop: "auto",
  // fontFamily: "Roboto",
  // fontSize: "1.0rem"
}

const create_account_style = {
  marginLeft: ""
}

const films_style = {
  marginLeft: ""
}

const lists_style = {
  marginLeft: ""
}

function todo(){
  // todo 
}





export default Header; 