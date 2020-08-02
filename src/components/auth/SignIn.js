import React from "react";
import styled from "styled-components"; 


function SignIn({close_sign_in}) {
  // username/email with pw (* 2)
  // login to gen an session id 


  return (
    <React.Fragment>

    <Background></Background>

    <Container>
    <form action="/">
      <HeaderContainer>
        <h2>Sign in</h2>
        <CloseBtn onClick={close_sign_in}>X</CloseBtn>
      </HeaderContainer>

      <Group>
        <Label htmlFor="email">Username or Email</Label>
        <Input type="text" longer></Input>
      </Group>

      <Group>
        <Label htmlFor="password">Password</Label>
        <Input type="password"></Input>
      </Group>

      TODO forgotten 

      <Group more_margin>
        <SignInButton type="submit" >SIGN IN</SignInButton>
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

const SignInButton = styled.button`
  padding: 10px; 
  background-color: #008E00;
  border: none;
  outline: none; 
  color: #e1e3e5;

  &:hover{
    cursor: pointer; 
    background-color: #005900; 
  }

`;





export default SignIn; 