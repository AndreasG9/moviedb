import React, { useState, useContext } from "react"; 
import { UserContext } from "../../context/UserContext"; 
import { NavLink } from "react-router-dom"; 
import styled from "styled-components";


 function ProfileHeader() {

  const user = useContext(UserContext); 

  

  function get_username() {
    if(user !== undefined) return user.account.details.username; 
  }


  return (
    <React.Fragment>

      <Header>
        <User>
          <Name>{get_username()}</Name>
          <Location>Location: </Location>
          <Edit>Edit profile</Edit>
        </User>

        <Stats>
          <Stat>
            <StatValue>{user.account.ratings.length}</StatValue>
            <StatHeader>{"Ratings"}</StatHeader>
          </Stat>
          <Stat>
            <StatValue>{user.account.favorites.length}</StatValue>
            <StatHeader>{"Favorites"}</StatHeader>
          </Stat>
          <Stat>
            <StatValue>{user.account.watchlist.length}</StatValue>
            <StatHeader>{"Watchlist"}</StatHeader>
          </Stat>
          <Stat>
            <StatValue>{user.account.lists.length}</StatValue>
            <StatHeader>{"Lists"}</StatHeader>
          </Stat>

        </Stats>
      </Header>


      <Nav>
        <Link to="/:account" activeStyle={active} exact={true}>Profile</Link>
        <Link to="/:account/favorites" activeStyle={active}>Favorites</Link>
        <Link to="/:account/ratings" activeStyle={active}>Ratings</Link>
        <Link to="/:account/watchlist" activeStyle={active}>Watchlist</Link>
        <Link to="/:account/lists" activeStyle={active}>Lists</Link>
      </Nav>

    </React.Fragment>
  )
}

// Style 
const Header = styled.div`
  display: flex;
  justify-content: space-between; 
`; 

const User = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2%; 
`; 

const Name = styled.div`
  font-size: 1.6em; 
  color: #e1e3e5;
  margin-bottom: 10%; 
`; 

const Location = styled.div`
  margin-bottom: 5%; 
`;

const Edit = styled.button`
  // todo 
; `

const Stats = styled.div`
  display: flex;
  flex-direction: row;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 10px; 
  border-left: 1px solid white; 


  &:hover{
    cursor: pointer; 
    color: #adadff; 
  }
`;

const StatHeader = styled.div`
  font-size: 1.1em; 
  margin-top: 5%; 
`; 

const StatValue = styled.div`
  font-size: 1.3em; 
`; 

export const Nav = styled.nav`
  width: 50%; 
  margin: 0 auto; 
  margin-top: 5%;  
  background-color: #425566; 
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  border: 1px solid #e1e3e5; 
`;

export const Link = styled(NavLink)`
  background: none;
  border: none; 
  text-decoration: none; 

  font-size: 1.1em; 
  padding: 5px; 

  &:hover{
    cursor: pointer;
    color: #adadff;
  }

  &:focus{
    outline: none; 
  }

  &:active{
    color: green; 
  }

  color: #e1e3e5;
`;

const active = {
  color: "#333",
  backgroundColor: "#e1e3e5",
  pointerEvents: "none"
}

export default ProfileHeader; 
