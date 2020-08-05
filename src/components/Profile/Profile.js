import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext"; 
//import ReactTooltip from "react-tooltip";
// import favorite films recent activity 
// 

function Profile() {
  // get user rated movies, favorite, watchlist, and created lists 

  const user = useContext(UserContext); 

  const [active_nav, set_active_nav] = useState({
    profile: true,
    favorites: false,
    ratings: false,
    watchlist: false,
    lists: false
  }); 

  const handle_profile = () => {

  }

  // function wathlist_preview(){

  // }




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
          {[...Array(5)].map( (stat) => ( 
          <Stat>
            <StatValue>1234</StatValue>
            <StatHeader>Films</StatHeader>
          </Stat>
          ))}
        </Stats>
      </Header>

      <Nav>
        <NavButton active_nav={active_nav.profile} onClick={handle_profile}>Profile</NavButton>
        <NavButton active_nav={active_nav.favorites}>Favorites</NavButton>
        <NavButton active_nav={active_nav.ratings}>Ratings</NavButton>
        <NavButton active_nav={active_nav.watchlist}>Watchlist</NavButton>
        <NavButton active_nav={active_nav.lists}>Lists</NavButton>
      </Nav>
      

        <Grid>
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
            <Title>WATCHLIST</Title>
            <WatchListPreview>
              <MiniPoster src={temp} z={"4"}></MiniPoster>
              <MiniPoster src={temp} z={"3"}></MiniPoster>
              <MiniPoster src={temp} z={"2"}></MiniPoster>
              <MiniPoster src={temp} z={"1"}></MiniPoster>
            </WatchListPreview>
          </WatchListPreviewContainer>
        </RightInfo>
        </Grid>
        

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
  //border: 2px solid white; 


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
  border: 1px solid white;  
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 10px; 
  border-left: 1px solid white; 
  font-size: 1.25em; 

  &:hover{
    cursor: pointer; 
  }
`;

const StatHeader = styled.div`

`; 

const StatValue = styled.div`

`; 

const Nav = styled.nav`
  width: 40%;
  width: 60%; 
  margin: 0 auto; 
  margin-top: 5%;  
  background-color: #425566; 
  display: flex;
  justify-content: center; 
  border: 1px solid #e1e3e5; 
`; 

const NavButton = styled.button`
  background: none;
  border: none; 
  font-size: 1.1em; 
  padding: 5px; 

  &:hover{
    cursor: pointer;
    color: #adadff
  }

  &:focus{
    outline: none; 
  }

  //color: #e1e3e5;
  // #adadff
  color: ${(props) => props.active_nav ? "333" : "#e1e3e5"}; 
  background-color: ${(props) => props.active_nav ? "#e1e3e5" : ""}; 


`; 

const Grid = styled.div`
  border: 1px solid white; 
  // display: grid;

  // // grid-template-rows: repeat(4, 1fr);
  // grid-template-columns: 2fr 1fr; 

  display: flex; 
  flex-direction: row; 


`; 


const FavContainer = styled.div`
  // temp

  border: 2px solid blue;
  font-size: 1.25em; 
  margin-top: 2.5%;
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
  margin-top: 2.5%;
`; 

const Bio = styled.div`
  // temp 
  border: 2px solid blue;
  height: 500px;
  word-wrap: break-word;
`; 

const WatchListPreviewContainer = styled.div`
  margin-top: 10%; 
`;

const WatchListPreview = styled.div`
  margin-top: 2%; 
  // display: flex;
  // flex-direction: row; 

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
  width: 86%; 
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
