import React from 'react'; 
import SearchResultFilm from "./SearchResultFilm";
import SearchResultPerson from "./SearchResultPerson"; 
import styled from "styled-components"; 


function SearchResults( {query, results, total} ) {
  // Display results (20 a page), each result is of component SearchResultFilm or SearchResultPerson ... 
  // See the Poster, Title, Year, and Director for each result (each Link to a specific page/search ...)
  // or Profile, name, and known for dept of person


  return (
      <Container>
        <Header> FOUND AT LEAST {total} MATCHES FOR &nbsp;"{query.toString().toUpperCase()}" </Header>
        <section>
          {results.map( (result) => {
            if(result.known_for_department === undefined) return <SearchResultFilm key={result.id} result={result}></SearchResultFilm>
            else return <SearchResultPerson key={result.id} result={result}></SearchResultPerson>
          })}
        </section>
      </Container>
  )
}

// Style 
const Container = styled.div`
  padding-top: 1%;

  width: 60%;
  margin-left: 24%; 

  @media only screen and (max-width: 1500px) {
    width: 95%; 
    margin: 2% 0 0 2%; 
  }
`;

const Header = styled.div`
  font-size: .9em; 
  color: #a5a5a5; 
  padding-bottom: 1%; 
`;


export default SearchResults; 