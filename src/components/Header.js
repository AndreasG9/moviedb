import React, { useContext } from "react";
import styled from "styled-components"; 
import SearchBar from "./Search/SearchBar"; 
import ProfileDropDown from "./Profile/ProfileDropDown"; 
import { UserContext } from "../context/UserContext.js";
import { StyledLink } from "./Profile/Profile"; 
import axios from "axios"; 
import { useLocation } from "react-router-dom";


function Header(){

  // Context 
  const user = useContext(UserContext); 
  const location = useLocation(); 

  function display_context(){
    // username w/ dropdown or sign in + create account 
    
    if(user.auth === true) return <ProfileDropDown></ProfileDropDown>
    else return (
      <React.Fragment>
        <NavButton onClick={handle_auth}>SIGN IN OR CREATE ACCOUNT w/ TMDB</NavButton>
        <a id="tmdb-auth" href="/#" target="__blank" style={{display: "none"}}>temp</a>   
      </React.Fragment>
    )
  }

  
  const handle_auth = async () => {
    // get req token, redirect to tmdb to approve req token 
    const req_token = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`).catch(error => console.log(error)); 

    if(req_token.data.success === true){
      // redirect to tmdb auth 

      const redirect = document.getElementById("tmdb-auth");
      redirect.href = `https://www.themoviedb.org/authenticate/${req_token.data.request_token}?redirect_to=http://localhost:3000/`;  // TODO 
      redirect.click(); // trigger 
    } 
  }

  const handle_home = () => {
    // if already on home page and hit home, reload 
    if(location.pathname === "/") window.location.reload(); 
  }

  return(
      <Container>
      
          <H1>
            <StyledLink to="/" onClick={handle_home} style={{color: "#e1e3e5"}}>
              <span>F&iota;LMS </span>
              <span style={{fontSize: ".4em"}}>andreas g.</span>
            </StyledLink>
          </H1>

          <NavContainer>
            <StyledLink to="/" onClick={handle_home}>
              <NavButton>HOME</NavButton>
            </StyledLink>
            {display_context()}
          </NavContainer>

          <SearchBar></SearchBar>
        
      </Container>
  );
}


// Style 
const Container = styled.header`
  display: flex;
  align-items: center;
  height: 10vh;
  width: 100%;
  background-color: #13181c;  
`;

const H1 = styled.h1`
  font-size: 2.5rem;
  color: #e1e3e5; 
  white-space: nowrap; 
  margin-left: 24%; 

  &:hover{
    cursor: pointer;
    color: #e1e3e5; 
  }

  @media only screen and (max-width: 1500px) {
    margin-left: 5%; 
  }
`;

const NavContainer = styled.nav`
  margin-left: 5%; 
  display: flex;
  justify-content: space-between; 
  align-items: center; 

  @media only screen and (max-width: 1500px) {
    margin-left: 9%; 
  }
`;

const NavButton = styled.button`
  border: none; 
  background: none; 
  color: #6f797d;
  font-family: Roboto; 
  font-size: 1.0rem; 
  padding: 5px; 

  &:hover{
    cursor: pointer;
    color: #e1e3e5; 
  }

  &:focus{
    outline: none; 
  }
`; 
export default Header; 