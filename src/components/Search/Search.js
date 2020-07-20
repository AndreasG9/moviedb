import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios'; 
import styled from "styled-components"; 


function Search( props ) {

  // State 
  // const [search, set_search] = useState("");
  // const [query, set_query] = useState(""); // query search string 
  // const [results, set_results] = useState([]); 

  // change to query, movies, people 
  const [state, set_state] = useState({
    query: "",
    //results: []
  }); 


  const update_search = (event) => {
    // onChange with input
    set_state({query: event.target.value}); // rest of the state empty  
  }

  // CHANGE TO MULTI 
  const get_search = async (event) => {
    // grab the data from GET /search/movie 

    event.preventDefault();

    // TODO PAGINATION 
    
    const page_num = 1; 
    const search_movie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${state.query}&page=${page_num}&include_adult=false`; // GET /search/movie 
    const data = await axios.get(search_movie); 
    const results = data.data.results; 

    console.log(results);
   
    const filtered_results = results.filter( (result) => result.vote_count > 4); // filter out low count films 


    const params = state.query.toString().replace(" ", "+"); // ex. search The Witch url: domain.com/search/the+witch
    props.history.push(`/search/${params}`, {results: filtered_results, query:state.query}); // redirect to "/search", which loads the SearchResults component, pass props 
  }


  // TODO search == movies and people 
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
