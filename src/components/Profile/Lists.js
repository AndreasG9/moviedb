import React from "react";
import styled from "styled-components"; 
import {Container,  Nav, NavLink} from "./Films"; 

 function Lists() {
  // other User pages link to film comp., lists goes here first to preview lists, them to films comp.  

  return (
    <Container>
      <Nav>
        <NavLink to="/:account">USERNAME HERE</NavLink>
        <NavLink to="/:account/favorites">Favorites</NavLink>
        <NavLink to="/:account/ratings">Ratings</NavLink>
        <NavLink to="/:account/watchlist">Watchlist</NavLink>
        <NavLink to="/:account/lists" active_nav={"true"}>Lists</NavLink>
      </Nav>
    </Container>
  )
}

// Style 



export default Lists; 
