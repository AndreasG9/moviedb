import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext"; 
import { Link } from "react-router-dom"; 
import styled from "styled-components"; 
import axios from "axios"

import { useUserContext } from "../../context/UserContext"; 

 function ProfileDropDown() {

  const user = useContext(UserContext);
  const { set_auth } = useUserContext();

  const [active, set_active] = useState(false); 

  const handle_sign_out =  async () => {
    let id = localStorage.getItem("session_id").toString();
    
    await axios.delete(`https://api.themoviedb.org/3/authentication/session?api_key=${process.env.REACT_APP_API_KEY}`, {
      data: {
        "session_id": id
      }
    }).catch(error => console.log(error)); 

    localStorage.clear();  
    set_auth(false); // logout
    // go back to home ??? 
  }

  function get_username() {
    if(user !== undefined) return user.account.details.username; 
  }

  return (
    <Container onMouseEnter={() => set_active(true)} onMouseLeave={() => set_active(false)}>
      <Username active={active}> {get_username()}</Username>
      <DownArr></DownArr>
      <DropDown active={active}>
        <Link className="link-style" to={`/user/${user.account.details.username}`}>Profile</Link>
        <Link className="link-style" to={`/user/${user.account.details.username}/favorites`}>Favorites</Link>
        <Link className="link-style" to={`/user/${user.account.details.username}/ratings`}>Ratings</Link>
        <Link className="link-style" to={`/user/${user.account.details.username}/watchlist`}>Watchlist</Link>
        <Link className="link-style" to={`/user/${user.account.details.username}/lists`}>Lists</Link>
        <div className="link-style" onClick={handle_sign_out}>Sign out</div>
      </DropDown>
    </Container>
  )
}

// Style 
const Container = styled.div`
  padding: 8px; 
`; 

const Username = styled.button`
  border: none; 
  background: none; 
  font-family: Roboto; 
  font-size: 1.0rem; 
  padding: 5px; 
  position: relative; 

  color: ${(props) => props.active ? "#e1e3e5" : "#6f797d"}; 
`; 

const DropDown = styled.div`
  position: absolute; 
  display: ${(props => props.active ? "block" : "none")}; 
  background-color: #425566; 
  width: 100px; 
  z-index: 9;
`; 

const DownArr = styled.span`  
  width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #e1e3e5;
  display: inline-block; 
  vertical-align: middle; 
`; 

export default ProfileDropDown; 
