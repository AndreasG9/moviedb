import React from "react"; 
import styled from "styled-components";

function CreateAccount( {close_create_act}) {
  // username, email, pw (* 2)
  // login to gen an session id 



  return (
    <React.Fragment>

      <Background></Background>

      <Container>
      <form action="/">
        <HeaderContainer>
          <h2>Join whatever this site is called</h2>
          <CloseBtn onClick={close_create_act}>X</CloseBtn>
        </HeaderContainer>

        <Group>
          <Label htmlFor="email">Email address</Label>
          <Input type="email" longer></Input>
        </Group>

        <Group>
          <Label htmlFor="username">Username</Label>
          <Input type="text"></Input>
        </Group>

        <Group>
          <Label htmlFor="password">Password</Label>
          <Input type="password"></Input>
        </Group>

        <Group more_margin style={{color: "#b4b5b7"}}>By clicking the "Sign up" button below, I certify that ...
          <SignUpButton type="submit">SIGN UP</SignUpButton>
        </Group>
      </form>
     </Container >

    </React.Fragment>
  )
}

// Style 
const Background = styled.div`
  z-index: 1; 
  position: fixed; 
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;  
  background-color: #333; 
  opacity: .6; 
`; 

const Container = styled.div`
  font-family: Roboto; 
  background-color: #425566; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  border: 2px solid white; 

  color: #e1e3e5;
  z-index: 2;

  width: 26%; 
  position: absolute; 
  top: 20%; 
  left: 35%; 
`;

const HeaderContainer = styled.div` 
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center; 
  color: #b4b5b7;  
`;

const Group = styled.div`
  display: flex;
  flex-direction: column; 
  margin-bottom: 5%; 

  margin-top: ${(props) => props.more_margin ? "10%" : "0"}; 
`;

const CloseBtn = styled.div`
  padding: 5px; 
  font-size: 1.4em; 
  font-weight: bold; 

  &:hover{
    cursor: pointer;
    color: #fff;   
  }
`;  

const Label = styled.label`
  margin-bottom: .5%; 
`;

const Input = styled.input`
  font-family: Roboto;
  background-color: #2b3440;
  border: none;  
  flex-grow: 2; 

  width: ${(props) => props.longer ? "300px" : "200px"}; 
  height: 30px;  

  padding: 5px;

  &:focus{
    outline: none;
    background-color: #e1e3e5;
  }

`;

const SignUpButton = styled.button`
  padding: 10px; 
  background-color: #008E00;
  border: none;
  outline: none; 
  color: #e1e3e5;
  margin-top: 2%; 

  &:hover{
    cursor: pointer; 
    background-color: #005900; 
  }

`;



export default CreateAccount; 