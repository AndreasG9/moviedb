import React from "react";
//import styled from "styled-components";

function Search() {
  return (
    <div style={search_container_style}>

      <input style={search_bar_style} className="focus"></input>
      
    </div>
  )
}


const search_container_style = {
  display: "flex",
  justifyContent: "center",
  marginTop: "2%"
}


const search_bar_style = {
  fontFamily: "Roboto",
  color: "#7f7f7f",
  width: "20%",
  borderRadius: "50em", 
  border: "none",
  padding: "10px",
}





export default Search;
