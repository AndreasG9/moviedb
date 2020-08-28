import React, { useContext } from "react"; 
import { useUserContext, UserContext } from "../../context/UserContext"; 
import { NavLink } from "react-router-dom"; 
import styled from "styled-components";
import { StyledLink } from "./Profile"; 


function ProfileHeader() {

  const user = useContext(UserContext); 
  const { set_account } = useUserContext(); 
  const { account } = useContext(UserContext); 

  function get_username() {
    if(Object.keys(user.account.details).length !== 0) return user.account.details.username; 
  }

  function get_img(){
    if(Object.keys(user.account.details).length !== 0) return user.account.details.avatar.gravatar.hash;
  }

  function get_location(){
    if(Object.keys(user.account.user_data.details.location).length !== 0) return user.account.user_data.details.location; 
  }

  const handle_active = (selected) => {
    // reuse film comp. for 4 pages, want to know the active page (update context)
    const temp = {...account};
    temp.active_nav = selected; 
    set_account(temp);
    localStorage.setItem("account", JSON.stringify(temp)); 
  }


  return (
    <React.Fragment>

      <Header>
        <User>
          <Image src={`https://www.gravatar.com/avatar/${get_img()}?s=150`}></Image>
          <div style={{display: "flex", flexDirection: "column", marginLeft: "5%", justifyContent: "space-between"}}>
            <Name>{get_username()}</Name>
            <Location>Location: {get_location()}</Location>
            <StyledLink to={`/user/${user.account.details.username}/edit`}>
              <Edit>Edit profile</Edit>
            </StyledLink>
          </div>
        </User>

        <Stats>

          <StyledLink to={`/user/${user.account.details.username}/ratings`}>
            <Stat>
              <StatValue>{user.account.user_data.ratings.length}</StatValue>
              <StatHeader>{"Ratings"}</StatHeader>
            </Stat>
          </StyledLink>

          <StyledLink to={`/user/${user.account.details.username}/favorites`}>
            <Stat>
              <StatValue>{user.account.user_data.favorites.length}</StatValue>
              <StatHeader>{"Favorites"}</StatHeader>
            </Stat>
          </StyledLink>

          <StyledLink to={`/user/${user.account.details.username}/watchlist`}>
            <Stat>
              <StatValue>{user.account.user_data.watchlist.length}</StatValue>
              <StatHeader>{"Watchlist"}</StatHeader>
            </Stat>
          </StyledLink>

          <StyledLink to={`/user/${user.account.details.username}/lists`}>
            <Stat>
              <StatValue>{user.account.user_data.lists.length}</StatValue>
              <StatHeader>{"Lists"}</StatHeader>
            </Stat>
          </StyledLink>

        </Stats>
      </Header>


      <Nav>
        <Link to={`/user/${user.account.details.username}`} activeStyle={active} exact={true} onClick={() => handle_active("profile")}>Profile</Link>
        <Link to={`/user/${user.account.details.username}/ratings`} activeStyle={active} onClick={() => handle_active("ratings")}>Ratings</Link>
        <Link to={`/user/${user.account.details.username}/favorites`} activeStyle={active} onClick={() => handle_active("favorites")}>Favorites</Link>
        <Link to={`/user/${user.account.details.username}/watchlist`} activeStyle={active} onClick={() => handle_active("watchlist")}>Watchlist</Link>
        <Link to={`/user/${user.account.details.username}/lists`} activeStyle={active} onClick={() => handle_active("lists")}>Lists</Link>
      </Nav>

    </React.Fragment>
  )
}

// Style 
const Header = styled.div`
  display: flex;
  justify-content: space-between; 
`; 

export const User = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2%; 
  padding: 10px; 
`; 

export const Name = styled.div`
  font-size: 1.6em; 
  color: #e1e3e5;
  margin-bottom: 10%; 
`; 

export const Image = styled.img`
  border-radius: 50%; 
`;  

const Location = styled.div`
  
`;

const Edit = styled.div`
  background-color: #e1e3e5; 
  color: #333;
  text-align:center; 

  padding: 4px;
  font-family: Roboto;

  &:hover{
    cursor: pointer; 
    opacity: .8; 
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  height: 80px; 
  padding: 10px; 
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
  width: 97.8%; 
  margin-left: 2%; 
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