import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext"; 
import { Link } from "react-router-dom"; 
import styled from "styled-components"; 

import { useUserContext } from "../../context/UserContext"; 


 function ProfileDropDown() {
   // a lot TODO 

  const user = useContext(UserContext);
  const { set_auth } = useUserContext();


  const [active, set_active] = useState(false); 

  const handle_sign_out = () => {
    // TODO (delete request w/ session id)
    // https://api.themoviedb.org/3/authentication/session?api_key=<<api_key>>  body: session_id 
    set_auth(false); // logout
  }



  return (
    <Container onMouseEnter={() => set_active(true)} onMouseLeave={() => set_active(false)}>
      <Username active={active}>{"USERNAME TEST"}</Username>
      {/* <Username>{user.account.details.username.toUpperCase()}</Username> */}
      <DropDown active={active}>
      <Link className="link-style" to="/:account">Profile</Link>
        <Link className="link-style" to="/:account/favorites">Favorites</Link>
        <Link className="link-style" to="/:account/ratings">Ratings</Link>
        <Link className="link-style" to="/:account/watchlist">Watchlist</Link>
        <Link className="link-style" to="/:account/lists">Lists</Link>
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
  display: inline-block;

  color: ${(props) => props.active ? "#e1e3e5" : "#6f797d"}; 
`; 

const DropDown = styled.div`
  position: absolute; 
  display: ${(props => props.active ? "block" : "none")}; 
  background-color: #425566; 
  // width: 7%; 
  width: 100px; 
  z-index: 1;
`; 

export default ProfileDropDown; 
