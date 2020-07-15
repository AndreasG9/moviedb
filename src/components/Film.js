import React from 'react'

function Film( {result} ) {
  
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
      {/* {Testing, will first display title and poster} */}
      <img src={path} alt="POSTER MISSING"></img>
      <h3>{result.title}</h3>
    </div>
  )
}

export default Film; 
