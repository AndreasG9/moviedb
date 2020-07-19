import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components"; 


function Search( props ) {

  // State 
  // TODO store single obj, ONLY query submit search 
  const [search, set_search] = useState("");
  const [query, set_query] = useState("");
  const [results, set_results] = useState([]); 

  // const [query, set_query] = useState({
  //   search: "",
  //   results = []
  // })

  // Effect 
  useEffect(() => {
    // only runs when form submitted (search)
    // new results each search 
    if(query !== "") get_films(); // FIX 
  }, [query]); 

  const update_search = (event) => {
    // onChange with input, REMOVE LATER 
    set_search(event.target.value); 
  }

  const get_search = (event) => {
    // search form submission 
    event.preventDefault();
    set_query(search); 
    set_search(""); // reset  
  }

  const get_films = async () => {
    // grab the data from GET /search/movie 
    // query string is value of query state string 

    const search_movie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`; // GET /search/movie 

    const res = await fetch(search_movie);
    const data = await res.json(); 

    // FILTER DATA 
    //   return data.vote_count > 50; 

  


    set_results(data.results); 
    // console.log(data.results);

    const params = query.toString().replace(" ", "+"); // ex. search The Witch url: domain.com/search/the+witch
    props.history.push(`/search/${params}`, {results: data.results, query:query}); // redirect to "/search", which loads the SearchResults component, pass props 
  }

  // const get_multiple = async () => {
  //   // grab data from GET /search/multi
  // }

  return (
    
    <div style={center}>
      <form onSubmit={get_search}>
        <Container>
        <div style={box}>
            <Input 
              type="text" 
              onChange={update_search}>
            </Input>
            <Button 
              type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </Button>
        </div>
        </Container>
      </form>   
    </div>

  ); 
}


// Style 
const Container = styled.div`
  margin-top: 12%;
  display: flex; 
  justify-content: center;
  align-items: center; 
  position: relative;
  left: 15%; 
`;

const Input = styled.input`
  font-family: Roboto;
  background-color: #2b3440;
  border: none;  
  flex-grow: 2; 
  width: 200px;
  height: 30px;   
  padding: 5px; 

  &:focus{
    outline: none;
    background-color: #e1e3e5;
  }

`;

const Button = styled.button`
  background-color: #e1e3e5;
  border: none;
  border-left: 2px solid #2b3440; 

  &:hover{
    cursor: pointer;
  }

  &:focus{
    outline: none; 
  }

  &:active{
    background-color: #2b3440 !important; 
  }
`;

const box = {
  display: "flex",
  flexDirection: "row",
  padding: "1px"
}

const center = {
  marginBottom: "30px"  
}

export default withRouter(Search); 
