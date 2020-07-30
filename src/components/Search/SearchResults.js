import React, {} from 'react'; 
import FilmResult from "./SearchResult";
import styled from "styled-components"; 
//import PaginationNumbers from "../PaginationNumbers"; 


function SearchResults( {query, results } ) {
  // Display results (20 a page), each result is of component FilmResult ... 
  // See the Poster, Title, Year, and Director for each result (each Link to a specific page/search ...)

  console.log(results); 

  return (
      <Container className="media-width-50">
        <Header> FOUND AT LEAST {"TODO"} MATCHES FOR &nbsp;"{query.toString().toUpperCase()}" </Header>
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
`;

const Header = styled.div`
  font-size: .9em; 
  color: #a5a5a5; 
  padding-bottom: 1%; 
`;


export default SearchResults; 