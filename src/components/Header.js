import React, { } from "react";
import styled from "styled-components"; 
import Search from "./Search/Search"; 
import { withRouter } from "react-router-dom"; 

function Header( props ){

  // const [active, set_active] = useState(true); 
  

  const go_home = () => {
    props.history.push("/"); // redirect to "/home", which loads the Header and other home componenets, not passing any props 
    window.location.reload(false); // will reset popular films this week pagination back to the start   
  }

  return(
    
    <HeaderContainer>
      <H1
        onClick={go_home}>
        <span>F&iota;LMS</span>
      </H1>

      <NavContainer>
        <NavButton>HOME</NavButton>
        <NavButton>SIGN IN</NavButton>
        <NavButton>CREATE ACCOUNT</NavButton>
        <NavButton>LISTS</NavButton>
      </NavContainer>

      <Search></Search>

    </HeaderContainer>
  );
}


// styles 
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

export default withRouter(Header); 