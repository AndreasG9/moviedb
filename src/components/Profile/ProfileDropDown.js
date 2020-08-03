import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext"; 
import { Link } from "react-router-dom"; 
import styled from "styled-components"; 


 function ProfileDropDown() {

  const user = useContext(UserContext);

  const [active, set_active] = useState(false); 

  const handle_sign_out = () => {
    // TODO (delete request w/ session id)
  }



  return (
    <Container onMouseEnter={() => set_active(true)} onMouseLeave={() => set_active(false)}>
      <Username >{user.username.toUpperCase()}</Username>
      <DropDown active={active}>
        <Link style={link}>Profile</Link>
        <Link style={link}>Watchlist</Link>
        <Link style={link}>Lists</Link>
        <div style={link} onClick={handle_sign_out}>Sign out</div>
      </DropDown>
    </Container>
  )
}

// Style 

const Container = styled.div`
  //border: 1px solid white; 
  padding: 8px; 
`; 

const Username = styled.button`
  border: none; 
  background: none; 
  color: #6f797d;
  font-family: Roboto; 
  font-size: 1.0rem; 
  padding: 5px; 
  position: relative; 
  display: inline-block;
`; 

const DropDown = styled.div`
  position: absolute; 

  display: ${(props => props.active ? "block" : "none")}; 
  // display: block; 

  background-color: #425566; 
  width: 12%; 
  z-index: 1;
`; 


// temp 
const link = {
  textDecoration: "none",
  fontSize: "1.2em", 
  color: "#e1e3e5",
  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
  borderTop: "1px solid #6f797d",
  padding: "10px" 
}

// background-color: #ddd;



export default ProfileDropDown; 
