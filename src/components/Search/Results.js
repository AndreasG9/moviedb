import React from 'react'; 
import FilmResult from "./FilmResult";
import styled from "styled-components"; 

 function SearchResults( {query, results} ) {
   // Display results, each result is of component FilmResult ... 
   // See the Poster, Title, Year, and Director for each result (each Link to a specific page/search ...)


  //let directors = []; // could have more than 1 director 


  const get_director = async (id) => {

    // const API_KEY = process.env.API_KEY; 
    // let credits = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`; 

    // const res = await fetch(credits);
    // const data = await res.json(); 

    return "Davis Bryrne"; 

    // for(let i=0; i<crew.length; ++i){
      
    //   if(crew[i].job === "Director"){
    //     directors.push(crew[i].name); 
    //   }
    // }

    
    
    //return directors; 
  }

  return (
    <div>

      <div style={results_container_style}>

        <h3 style={header_style}> FOUND {results.length} FILMS MATCHING &nbsp;"{query.toString().toUpperCase()}" </h3>

        <section>
          {results.map( (result) => (
            <FilmResult key={result.id} result={result} directors={get_director(result.id)}></FilmResult>
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
const Container = styled.div`
  width: 40%;
  position: relative;
  left: 25%; 
`;

const Header = styled.div`
  font-size: 1.0em; 
  color: #a5a5a5; 
`;


const results_container_style = {
  width: "40%",
  position: "relative",
  left: "25%", 
}

const header_style = {
  fontSize: "1.0em", 
  color: "#a5a5a5"
}


export default SearchResults; 




// const get_alt_titles = async(movie_id) => {
//   // search for a film, alternative titles will also diplay under the title and year 

//   const alt_titles_req = `https://api.themoviedb.org/3/movie/${movie_id}/alternative_titles?api_key=${process.env.REACT_APP_API_KEY}`; 
//   let alt_titles = []; 

//   // fetch(alt_titles_req)
//   //   .then((res) => res.json())
//   //   .then((data) => {
      
//   //     data.titles.forEach( (title) => {
//   //       alt_titles.push(title.title); 
//   //     }); 

//   //   }); 

//   return alt_titles; 
// }