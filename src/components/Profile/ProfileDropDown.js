import React, { useState, useContext } from "react";
import { useUserContext, UserContext } from "../../context/UserContext"; 
import { useHistory, Link } from "react-router-dom"; 
import styled from "styled-components"; 
import axios from "axios"

 function ProfileDropDown() {

  const user = useContext(UserContext);
  const { set_account } = useUserContext(); 
  const { account } = useContext(UserContext); 
  const { set_auth } = useUserContext();

  const history = useHistory(); 

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
    history.push("/");  // go back to home ??? maybe change 
  }

  function get_username() {
    if(user !== undefined) return user.account.details.username; 
  }

  const handle_active = (selected) => {
    // reuse film comp. for 4 pages, want to know the active page (update context), but might just parse the url path if open link in new tab ... 
    const temp = {...account};
    temp.active_nav = selected; 
    set_account(temp);
    localStorage.setItem("account", JSON.stringify(temp)); 
  }

  return (
    <Container onMouseEnter={() => set_active(true)} onMouseLeave={() => set_active(false)}>
      <Username active={active}> {get_username()}</Username>
      <DownArr></DownArr>
      <DropDown active={active}>

        <Link 
          className="link-style"
          to={`/user/${user.account.details.username}`}
          onClick={() => handle_active("profile")}>
          Profile
        </Link>

        <Link 
          className="link-style" 
          to={`/user/${user.account.details.username}/ratings`}  
          onClick={() => handle_active("ratings")}>
          Ratings
        </Link>

        <Link 
          className="link-style" 
          to={`/user/${user.account.details.username}/favorites`} 
          onClick={() => handle_active("favorites")}>
          Favorites
        </Link>

        <Link 
          className="link-style" 
          to={`/user/${user.account.details.username}/watchlist`}
          onClick={() => handle_active("watchlist")}>
          Watchlist
        </Link>

        <Link 
          className="link-style" 
          to={`/user/${user.account.details.username}/lists`} 
          onClick={() => handle_active("lists")}>
          Lists
        </Link>

        <div className="link-style" onClick={handle_sign_out}>Sign out</div>
      </DropDown>
    </Container>
  )
}

// Style 

const Container = styled.div`
  padding: 8px; 
  font-family: Roboto;   
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