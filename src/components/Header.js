import React, { useState, useContext } from "react";
import styled from "styled-components"; 
import SearchBar from "./Search/SearchBar"; 
import { useHistory } from "react-router-dom"; 
// import CreateAccount from "./auth/CreateAccount"; 
// import SignIn from "./auth/SignIn"; 
import ProfileDropDown from "./Profile/ProfileDropDown"; 
import { UserContext } from "../context/UserContext.js";
import axios from "axios"; 

function Header(){

  const history = useHistory();

  const go_home = () => {
    history.push("/"); // redirect to "/home", which loads the Header and other home componenets, not passing any props 
    window.location.reload(false); // will reset popular films this week pagination back to the start   
  }


  // const [show_overlay, set_show_overlay] = useState({
  //   sign_in: false,
  //   create_account: false 
  // })

  // Overlay Component 
  // const handle_create_account = () => set_show_overlay({create_account: true}); // overlay create account component 
  // const handle_sign_in = () => set_show_overlay({sign_in: true}); 

  // const close_create_act = () => set_show_overlay({create_account: false}); // close overlay 
  // const close_sign_in = () => set_show_overlay({sign_in: false}); 

  // function display_overlay(){
  //   // display modal to sign in or create an account 
  //   if(show_overlay.create_account === true) return <CreateAccount close_create_act={close_create_act}></CreateAccount>
  //   if(show_overlay.sign_in === true) return <SignIn close_sign_in={close_sign_in}></SignIn>
  // }

  

  // Context 
  const user = useContext(UserContext); 

  function display_context(){
    // username w/ dropdown or sign in + create account 
    
    if(user.auth === true) return <ProfileDropDown></ProfileDropDown>
    else return (
      <React.Fragment>
        <NavButton onClick={handle_auth}>SIGN IN OR CREATE ACCOUNT w/ TMDB</NavButton>
        <a id="tmdb-auth" href="/#" target="__blank" style={{transform: "scale(0)"}}>temp</a>   
        {/* <NavButton onClick={() => handle_create_account()}>CREATE ACCOUNT</NavButton> */}
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

      localStorage.setItem("temp_access_token", req_token.data.request_token); 
    } 
  }


  return(
    <React.Fragment>

      <HeaderContainer>
        <H1
          onClick={go_home} style={{whiteSpace: "noWrap"}}>
          <span>F&iota;LMS </span>
          <span style={{fontSize: ".4em"}}>andreas g.</span>
        </H1>

        <NavContainer>
          <NavButton onClick={go_home}>HOME</NavButton>
          {display_context()}
        </NavContainer>

        <SearchBar></SearchBar>
      </HeaderContainer>

      {/* {display_overlay()} */}
    </React.Fragment>
  );
}


// Style 
const HeaderContainer = styled.header`
  background-color:  #13181c;
  display: flex;
  align-items: center;

  height: 80px; 
`;

const H1 = styled.h1`
  font-size: 2.5rem;
  margin-left: 24%;
  color: #e1e3e5; 

  &:hover{
    cursor: pointer;
    color: #e1e3e5; 
  }

  @media only screen and (max-width: 1500px) {
    margin-left: 10%; 
  }
`;

const NavContainer = styled.nav`
  margin-left: 15%;
  display: flex;
  justify-content: space-between;
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