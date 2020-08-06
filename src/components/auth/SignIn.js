import React, { useState, useContext } from "react";
import styled from "styled-components"; 
import axios from "axios"; 
import { useUserContext, UserContext } from "../../context/UserContext"; 


function SignIn( {close_sign_in} ) {

  const [username, set_username] = useState("");
  const [password, set_password] = useState("");

  //const [loading, set_loading] = useState(false); 
  
  // set Context 
  const { set_auth } = useUserContext();
  const { set_account } = useUserContext(); 
  const { account } = useContext(UserContext); 


  const handle_sign_in = (event) => {
    // the movie db api provides auth. But instead of having the user redirected to the TMdb website to auth the req bearer token (preferred) 
    // I will get info, GET Req. token, POST Create Session w/ Login, and POST Create Session for validation 
    // update user context (usernane, session_id)
    event.preventDefault();
    update_context();  
  } 
  
  const update_context = async () => {
    // TEMP! for testing 

    // req token 
    const req_token = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`)
      .catch((error) => console.log(error)); 

    // validate 
    const validate_login = await axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_API_KEY}`, 
    {
      "username": username,
      "password": password,
      "request_token" : req_token.data.request_token 
    }).catch((error) => console.log(error)); 

    // get session_id 
    const session = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`, 
    {
      "request_token" : validate_login.data.request_token
    }).catch((error) => console.log(error)); 

    localStorage.setItem("session_id", session.data.session_id);  // TEMP TEMP TEMP session id in local storage (sign out will DELETE req)

    const temp = {...account}; // get user details, rated and fav movies, for all comp to have acess to (other req, get in profile)
    const account_id = 123; 

    // details 
    const detail = `https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}`;
    let res = await axios.get(detail).catch((error) => console.log(error)); 
    temp.details = res.data; 

    // ratings
    const rated_movies = `https://api.themoviedb.org/3/account/${temp.details.id}/rated/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}&sort_by=created_at.asc`;
    res = await axios.get(rated_movies).catch((error) => console.log(error)); 
    temp.ratings= res.data.results; 

    // fav movies 
    const fav = `https://api.themoviedb.org/3/account/${account_id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}&language=en-US&sort_by=created_at.asc&`;
    res = await axios.get(fav).catch((error) => console.log(error)); 
    temp.favorites = res.data.results; 

    // watchlist
    const watch_list = `https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}&language=en-US&sort_by=created_at.asc&`; 
    res = await axios.get(watch_list).catch((error) => console.log(error)); 
    temp.watchlist = res.data.results; 


    localStorage.setItem("account", JSON.stringify(temp)); // for testing 
    set_auth(true); // set auth to true, header will change to display profile w/ dropdown 
    close_sign_in(); 
    set_account(temp); // update context 
    // set_loading(false); 
  }



  return (
    <React.Fragment>

    <Background></Background>

    <Container>
    <form action="/" onSubmit={handle_sign_in}>
      <HeaderContainer>
        <h2>Sign in</h2>
        <CloseBtn onClick={close_sign_in}>X</CloseBtn>
      </HeaderContainer>

      <Group>
        <Label htmlFor="text">Username</Label>
        <Input type="text" longer onChange={(event) => set_username(event.target.value)}></Input>
      </Group>

      <Group>
        <Label htmlFor="password">Password</Label>
        <Input type="password" onChange={(event) => set_password(event.target.value)}></Input>
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

  @media only screen and (max-width: 1500px) {
    width: 40%; 
  }

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