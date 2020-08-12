import React, { useState, useEffect } from "react"; 
import {Container, Nav, NavLink, FiltersContainer, Select, Option, FilmsContainer, Poster} from "../Films"; 
import styled from "styled-components";

function List() {
  // couldn't reuse Film comp., too many differences 
  // .../list/name-of-list
  // v4 of lists for TMDB api 

  

  // function get_header(){}

  // get films from that list 
        //const lists = `https://api.themoviedb.org/3/account/${account_id}/lists?api_key=${process.env.REACT_APP_API_KEY}S&session_id=${session_id}&page=${current_page}`; 

  
  useEffect( () => {

    const get_list = async () => {

    }

    get_list(); 

  }, []); 


  function create_list(){
    
  }

  function delete_list(){

  }


  function add_item(){

  }

  function remove_item(){

  }

  function selected_list_img(){

  }

  return (
    <Container>

      <Nav>
        <NavLink to="/:account">USERNAME HERE</NavLink>
        <NavLink to="/:account/favorites">Favorites</NavLink>
        <NavLink to="/:account/ratings">Ratings</NavLink>
        <NavLink to="/:account/watchlist">Watchlist</NavLink>
        <NavLink to="/:account/lists" active_nav={"true"}>Lists</NavLink>
      </Nav>

      <FiltersContainer>
        <Select >
          <Option>Date Added Descending</Option>
          <Option>Date Added Ascending</Option>
          <Option>Popularity Descending</Option>
          <Option>Rating Descending</Option>
          <Option>Rating Ascending</Option>
          <Option>Release Date Descending</Option>
          <Option>Release Date Ascending</Option>
        </Select>
      </FiltersContainer>

      <div style={{display: "flex"}}>
        <FilmsContainer>

        </FilmsContainer>

        <EditBtn>Edit or Delete list</EditBtn>
      </div>

      
    </Container>
  )
}


const EditBtn = styled.button`
  border: none; 
  color: #a5a5a5;
  background-color: #273038; 
  border-radius: 8%;
  padding: 20px;
  font-size: 1.1em;  
  text-align: center; 
  margin-left: 1%; 

  height: 10%;   

  &:hover{
    cursor: pointer;
    color: #e1e3e5;
  }
`;

export default List; 
