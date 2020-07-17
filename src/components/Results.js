import React from 'react'; 
import FilmResult from "./FilmResult"; 

 function SearchResults( {query, results} ) {
   // Display results, each result is of component FilmResult ... 
   // See the Poster, Title, Year, and Director for each result 

  // to access director: GET /movie/{movie_id}/credits for director 
  // let movie = `https://api.themoviedb.org/3/movie/${id}?api_key=1584051e241f7b281373448a78937e84&language=en-US`; 

  // function get_year(id){
  //   let movie = `https://api.themoviedb.org/3/movie/${id}?api_key=1584051e241f7b281373448a78937e84&language=en-US`; 

  //   fetch(movie)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       return data.release_date; 
  //     }); 
  // }


  function get_director(id){
    let movie = `https://api.themoviedb.org/3/movie/${id}?api_key=1584051e241f7b281373448a78937e84&language=en-US`; 



  }

  return (
    <div>

      <div style={results_container_style}>

        <h3 style={header_style}> FOUND {results.length} FILMS MATCHING &nbsp;"{query.toString().toUpperCase()}" </h3>

        <section>
          {
            // filter results (need min ___ hits ), search has to match 100% 



          }
          {results.map( (result) => (
            <FilmResult key={result.id} result={result}  ></FilmResult>
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