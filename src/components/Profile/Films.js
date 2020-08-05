import React, { useState, useEffect } from "react"; 
import styled from "styled-components"; 
import { Link, useLocation } from "react-router-dom"; 
import {v4 as uuidv4} from "uuid"; 
//import ReactTooltip from "react-tooltip";
// context, film data ... 
import Pagination from "./Pagination"; 

function Films() {
  // a users favorites, watchlist, or ratings  
  // w/ poster display date added (watchlist) or RATING (fav, rating) 


  const location = useLocation();
  // const w = location.pathname.includes("watchlist") ? "watchlist" : "favorites"; 

  console.log(location.pathname); 

  const temp2 =  `https://image.tmdb.org/t/p/w154//hvprnfDDRE4boZjH6x9xF9Q8NJV.jpg`;

  const [active_nav, set_active_nav] = useState({
    profile: false,
    favorites: false,
    ratings: false,
    watchlist: true,
    lists: false
  }); 



  // useEffect( () => {


  // }, []); 

  // .... 
  // const index_last = current times post 
  // const index_first = last - posts 
  // const current = slice first to last 




  function get_header(){
    let msg = "";  

    if(active_nav.watchlist === true) msg = `You Want to See ${"some ammount of films"}`; 
    if(active_nav.favorites === true) msg = `You have ${"some amount"} of favorites`;
    
    return <Header>{msg}</Header>
  }

  return (
    <Container>
      <Nav>
        <NavLink to="/:account" left={"true"}>USERNAME HERE</NavLink>
        <NavLink to="/:account/favorites">Favorites</NavLink>
        <NavLink to="/:account/ratings">Ratings</NavLink>
        <NavLink active_nav={active_nav.watchlist.toString()} to={{pathname: ":account.watchlist", state:{active_nav : active_nav.watchlist}}}>Watchlist</NavLink>
        <NavLink to="/:account/lists">Lists</NavLink>
      </Nav>

      {get_header()}

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

      <FilmsContainer>
        {[...Array(30)].map(test => (
          <Poster src={temp2} key={uuidv4()}></Poster>
        ))}
      </FilmsContainer>

      <Pagination total_posts={40} posts_per_page={20} page_neighbors={1}></Pagination>


    </Container>
  )
}

// Style 
export const Container = styled.div`
  font-family: Roboto; 
  color: #a5a5a5; 

  width: 60%;
  margin-left: 22%; 

  @media only screen and (max-width: 1500px) {
    width: 90%;
    margin-left: 5%; 
 }

 border: 1px solid white; 
`; 

export const Nav = styled.nav`
  width: 60%; 
  margin: 0 auto; 
  margin-top: 5%;  
  background-color: #425566; 
  display: flex;
  justify-content: center; 
  align-items: center; 
  border: 1px solid #e1e3e5; 
`;

export const NavLink = styled(Link)`
  background: none;
  border: none; 
  text-decoration: none; 

  font-size: 1.1em; 
  padding: 5px; 

  &:hover{
    cursor: pointer;
    color: #adadff
  }

  &:focus{
    outline: none; 
  }

  color: ${(props) => props.active_nav ? "333" : "#e1e3e5"}; 
  background-color: ${(props) => props.active_nav ? "#e1e3e5" : ""}; 
  margin-right: ${props => props.test === "true" ? "5%" : "0"}; 
`;

const Header = styled.div`
  border-bottom: 1px solid #e1e3e5; 
  margin-top: 2%; 
`; 

const FiltersContainer = styled.div`
  border-top: 2px solid #a5a5a5;;
  border-bottom: 2px solid #a5a5a5;;
  margin: 2% 0; 
`; 

const Select = styled.select`
  margin: 1%; 
  font-family: Roboto;
  background-color: #13181c; 
  color: #e1e3e5;
  padding: 5px; 
  display: flex;
  margin-left: 61.5%; 

  &:hover{
    color: #adadff;
    cursor: pointer; 
  }

  &:focus{
    outline: none; 
  }
`; 

const Option = styled.option`
  background-color: #8699aa; 
  color: #333; 
  font-size: 1.4em; 
`; 

const FilmsContainer = styled.div`
  display: flex;  
  flex-wrap: wrap; 
  border: 1px solid green; 
`; 

const Poster = styled.img`
  display: block; 
  border: 1px solid #a5a5a5;
  border-radius: 3%;

  // width: 156px;
  // height: 233px; 

  margin: 6px;  

  &:hover{
    cursor: pointer;
    border: 2px solid #98fb98;
    margin: 5px;  
  }

`; 



export default Films; 
