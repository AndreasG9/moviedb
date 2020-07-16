import React from 'react'; 
import FilmResult from "./FilmResult"; 

 function SearchResults( {query, results} ) {
   // Display results, each result is of component FilmResult ... 
   // See the Poster, Title, Year, and Director for each result 

   // to access year and director need to use movie id for GET /movie/{movie_id}

   // TEST


   //let movie = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=1584051e241f7b281373448a78937e84&language=en-US`; 

  return (
    <div>

      <div style={results_container_style}>

        <h3 style={header_style}> FOUND {results.length} FILMS MATCHING &nbsp;"{query.toString().toUpperCase()}" </h3>

        <section style={results_container}>
          {results.map( (result) => (
            <FilmResult result={result} key={result.id}></FilmResult>
          ))}
        </section>

      </div>

      {/* 
      <div style={side_bar_container}>
        FOR ...
      </div> */}
       
    </div>
  )
}

// Style 
const results_container_style = {
  width: "40%",
  position: "relative",
  left: "25%", 
  marginTop: "5px" 
}

const header_style = {
  fontSize: "1.0em", 
  color: "#a5a5a5"
}

const results_container = {
  // border: "2px solid yellow",
  // display: "flex",
  // justifyContent: "center",
  // flexDirection: "column" ,
  // width: "50%"
}

// TODO 
// const side_bar_container = {
//   // float: "right",
//   marginLeft: "90%",
//   color: "#a5a5a5"
// }

export default SearchResults; 