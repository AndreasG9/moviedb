import React from 'react'

function FilmResult( {result} ) {
  // search for a movie, each result is composed of this component 
  
  // for api poster, need base url, file size, and file path 
  const base = "https://image.tmdb.org/t/p";
  const size = "/w200/";
  const poster_path = result.poster_path; 
  //const backdrop_path = result.backdrop_path; 
  let path = ""; 

  // if(poster_path === null) 

  path = base + size + poster_path; 

  return (
    <div>


      <div style={result_style}>
        {/* {Testing, will first display title and poster} */}
        <img src={path} alt="POSTER MISSING" style={img_style}></img>
        <h3 style={title_style} className="hover-blue">{result.title}</h3>
      </div>


    </div>
  )
}


const result_style = {
  borderTop: "1px solid #a5a5a5",
  display: "flex",
  flexDirection: "row"
}

const img_style = {
  display: "block",
  border: "1px solid #a5a5a5",
  borderRadius: "5%",
  margin: "5px"
  // width: "100%"
}

const title_style = {
  color: "#fffff4",
  padding: "3px"
}







export default FilmResult; 
