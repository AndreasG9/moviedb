import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; 
import { UserContext } from "../../context/UserContext"; 
import {v4 as uuidv4} from "uuid"; 
//import ReactTooltip from "react-tooltip";
// import favorite films recent activity 
// 

function Profile() {
  // get user rated movies, favorite, watchlist, and created lists 

  //const user = useContext(UserContext); 

  // const [active_nav, set_active_nav] = useState({
  //   profile: true,
  //   favorites: false,
  //   ratings: false,
  //   watchlist: false,
  //   lists: false
  // }); 


  // function wathlist_preview(){

  // }

  // function get_stats(){}


  // testing 
  const titles = ["ratings", "favorites", "todo", "watchlist", "lists"];
  const values = [1234, 64, "0", 200, 2]; 


  // testing 
  const temp = `https://image.tmdb.org/t/p/w92//hvprnfDDRE4boZjH6x9xF9Q8NJV.jpg`;
  const temp2 =  `https://image.tmdb.org/t/p/w154//hvprnfDDRE4boZjH6x9xF9Q8NJV.jpg`;

  return (
    <Container>

      <Header>
        <User>
          <Name>UserNameHere</Name>
          <Location>Location: </Location>
          <Edit>Edit profile</Edit>
        </User>

        <Stats>
          {[...Array(5)].map( (stat, index) => ( 
          <Stat key={uuidv4()}>
            <StatValue>{values[index]}</StatValue>
            <StatHeader>{titles[index]}</StatHeader>
          </Stat>
          ))}
        </Stats>
      </Header>

      <Nav>
        <NavLink active_nav={"true"} to="/:account">Profile</NavLink>
        <NavLink to="/:account/favorites">Favorites</NavLink>
        <NavLink to="/:account/ratings">Ratings</NavLink>
        <NavLink to="/:account/watchlist">Watchlist</NavLink>
        <NavLink to="/:account/lists">Lists</NavLink>
      </Nav>
      

        <Body>
          <FavContainer>
            <Title style={{display: "flex", justifyContent: "space-between"}} left>My Favorites <span>more</span></Title>
            <Fav>
              <MediumPoster src={temp2}></MediumPoster>
              <MediumPoster src={temp2}></MediumPoster>
              <MediumPoster src={temp2}></MediumPoster>
              <MediumPoster src={temp2}></MediumPoster>
            </Fav>
          </FavContainer>  

          <RightInfo>
            <Bio><div style={{borderBottom: "1px solid white", paddingBottom: "2px"}}>BIO GOES HERE</div>TODO</Bio>
            <WatchListPreviewContainer>
              <Title watchlist>WATCHLIST</Title>
              <WatchListPreview>
                <MiniPoster src={temp} z={"4"}></MiniPoster>
                <MiniPoster src={temp} z={"3"}></MiniPoster>
                <MiniPoster src={temp} z={"2"}></MiniPoster>
                <MiniPoster src={temp} z={"1"}></MiniPoster>
              </WatchListPreview>
            </WatchListPreviewContainer>
          </RightInfo>
        </Body>
        
    </Container>
  )
}

// Style
const Container = styled.div`
  //border: 2px solid white; 
  margin-top: 5%; 
  height: 100vh; 
  font-family: Roboto; 
  color: #a5a5a5; 

  width: 60%;
  margin-left: 22%; 

  @media only screen and (max-width: 1500px) {
    width: 96%;
    margin-left: 1%; 
 }
`; 

const Header = styled.div`
  display: flex;
  justify-content: space-between; 
`; 

const User = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 2%; 
  //border: 2px solid white; 
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

; `

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  //border: 1px solid white;  
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

const Nav = styled.nav`
  width: 60%; 
  margin: 0 auto; 
  margin-top: 5%;  
  background-color: #425566; 
  display: flex;
  justify-content: center; 
  border: 1px solid #e1e3e5; 
`; 


const NavLink = styled(Link)`
  background: none;
  border: none; 
  text-decoration: none; 

  font-size: 1.2em; 
  padding: 5px; 

  &:hover{
    cursor: pointer;
    color: #adadff
  }

  &:focus{
    outline: none; 
  }

  color: ${(props) => props.active_nav === "true" ? "#333" : "#e1e3e5"}; 
  background-color: ${(props) => props.active_nav === "true" ? "#e1e3e5" : ""}; 
`;

const Body = styled.div`
  margin-top: 4.5%; 
  display: flex; 
  flex-direction: row; 
`; 

const FavContainer = styled.div`
  // temp

  font-size: 1.25em; 
  flex: 1; 
`;

const Fav = styled.div`
  margin: 2%; 
  display: flex;
  flex-direction: row; 
  border-radius: 3%;
  width: max-content; 
`; 

const RightInfo = styled.div`
  @media only screen and (max-width: 1500px) {
    margin-left: 3.5%; 
  }
`; 

const Bio = styled.div`
  // temp 
  height: 300px;
  word-wrap: break-word;
`; 

const WatchListPreviewContainer = styled.div`
  margin-top: 10%; 
`;

const WatchListPreview = styled.div`
  margin-top: 2%; 

  // want slight overlap
  display: grid; 
  grid-template-columns: repeat(8, 47px); 

  border: 2px solid transparent;
  border-radius: 3%;
  width: max-content; 

  &:hover{
    cursor: pointer; 
    border: 2px solid #98fb98; 
  }
`; 

const Title = styled.div`

  margin-left: ${props => props.left ? "2%" : 0}; 
  width: ${props => props.watchlist ? "98.5%" : "86%"}; 
  border-bottom: 1px solid white; 
  padding-bottom: 2px; 

  &:hover{
    cursor: pointer; 
    color: #adadff; 
  }

`; 

const MediumPoster = styled.img`

  border: 2px solid #a5a5a5;
  border-radius: 3%;

  margin: 1% 1% 0 0; 
  

  &:hover{
    cursor: pointer; 
    border: 2px solid #98fb98; 
  }
`;

const MiniPoster = styled.img`
  border: 1px solid #a5a5a5;
  border-radius: 3%;
  grid-column: span 2; 
  z-index: ${props => props.z}; 
`; 

export default Profile; 
