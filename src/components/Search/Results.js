import React from 'react'; 
import FilmResult from "./FilmResult";
import styled from "styled-components"; 
//import Pagination from "../Pagination"; 

 function SearchResults( {query, results} ) {
   // Display results, each result is of component FilmResult ... 
   // See the Poster, Title, Year, and Director for each result (each Link to a specific page/search ...)

   // TODO add pagination

  return (
      <Container>
        <Header> FOUND AT LEAST {results.length} MATCHES FOR &nbsp;"{query.toString().toUpperCase()}" </Header>
        <section>
          {results.map( (result) => (
            <FilmResult key={result.id} result={result}></FilmResult>
          ))}
        </section>
      </Container>
  )
}


// Style 
const Container = styled.div`
  padding-top: 1%; 
  width: 40%;
  position: relative;
  left: 24%;  
  // border: 2px solid black; 
`;

const Header = styled.div`
  font-size: .9em; 
  color: #a5a5a5; 
  padding-bottom: 1%; 
`;


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