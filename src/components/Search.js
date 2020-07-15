import React, { } from "react";

function Search( {update_search, get_search}) {
  return (
    
    <div>
      <form onSubmit={get_search}>
        <div style={container_style}>
          <input 
            style={search_bar_style}
            className="focus" 
            type="text" 
            onChange={update_search}>
          </input>
          <button 
            style={search_button_style} 
            className="hover focus" 
            type="submit"
            >
           <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          </button>
        </div>
      </form>   


    </div>

  )
}




// Style 
const  container_style = {
  marginTop: "2%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

const search_bar_style = {
  fontFamily: "Roboto",
  backgroundColor: "#404040",
  borderRadius: "50em", 
  border: "none",
  padding: "10px",
  width: "25%"
}

const search_button_style = {
  position: "absolute",
  right: "38%",
  border: "none",
  backgroundColor: "#404040",
  marginTop: "3px"
}


export default Search;
