import React, { useState } from "react";
import styled from "styled-components"; 
import SearchBar from "./Search/SearchBar"; 
import { useHistory } from "react-router-dom"; 
import CreateAccount from "./auth/CreateAccount"; 
import SignIn from "./auth/SignIn"; 

function Header( props ){

  const history = useHistory();

  const go_home = () => {
    history.push("/"); // redirect to "/home", which loads the Header and other home componenets, not passing any props 
    window.location.reload(false); // will reset popular films this week pagination back to the start   
  }

  // go to lists page 

  const [show_overlay, set_show_overlay] = useState({
    sign_in: false,
    create_account: false 
  })


  const handle_create_account = () => set_show_overlay({create_account: true}); // overlay create account comp 
  const handle_sign_in = () => set_show_overlay({sign_in: true}); 

  const close_create_act = () => set_show_overlay({create_account: false}); // close overlay 
  const close_sign_in = () => set_show_overlay({sign_in: false}); 


  function display_overlay(){
    // display modal to sign in or create an account 
    if(show_overlay.create_account === true) return <CreateAccount close_create_act={close_create_act}></CreateAccount>
    if(show_overlay.sign_in === true) return <SignIn close_sign_in={close_sign_in}></SignIn>
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
          <NavButton onClick={() => handle_sign_in()}>SIGN IN</NavButton>
          <NavButton onClick={() => handle_create_account()}>CREATE ACCOUNT</NavButton>
          <NavButton >LISTS</NavButton>
        </NavContainer>

        <SearchBar></SearchBar>
      </HeaderContainer>

      {display_overlay()}
    </React.Fragment>
  );
}


// Style 
const HeaderContainer = styled.header`
  background-color:  #13181c;
  display: flex;
  align-items: center;

  height: 90px;
`;

const H1 = styled.h1`
  font-size: 2.5rem;
  margin-left: 24%;
  color: #e1e3e5; 

  &:hover{
    cursor: pointer;
    color: #e1e3e5; 
  }
`;

const NavContainer = styled.nav`
  margin-left: 15%;
  display: flex;
  justify-content: space-between;

  width: 20%;
  border: 1px solid white; 

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