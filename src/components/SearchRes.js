import React from 'react'; 
import FilmResult from "./FilmResult"; 

 function SearchResults( {query, results} ) {
   // path: /search 
   // Display results, each result is of component FilmResult ... 
   // See the Poster, Title, Year, and Director for each result 

  return (
    <div>

      <div style={results_container_style}>
        <h3 style={header_style}> FOUND {results.length} FILMS MATCHING "{query}" </h3>

        <section>
          {results.map( (result) => (
            <FilmResult result={result} key={result.id}></FilmResult>
          ))}
        </section>
      </div>


      <div style={side_bar_container}>
        FOR ...
      </div>
       
    </div>
  )
}

// Style 
const results_container_style = {
  display: "flex",
  justifyContent: "center", 
  right: "60%",
  flexWrap: "nowrap"
}

const header_style = {
  color: "#a5a5a5"
}

// TODO 
const side_bar_container = {
  // float: "right",
  marginLeft: "90%",
  color: "#a5a5a5"
}

export default SearchResults; 