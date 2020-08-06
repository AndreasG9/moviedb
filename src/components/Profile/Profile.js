import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom"; 
import { UserContext } from "../../context/UserContext"; 
import {v4 as uuidv4} from "uuid"; 
import ReactTooltip from "react-tooltip";
// import favorite films recent activity 


function Profile() {
  // get user rated movies, favorite, watchlist, and created lists 

  // testing 
  const titles = ["ratings", "favorites", "todo", "watchlist", "lists"];
  const values = [1234, 64, "0", 200, 2]; 
  const temp = `https://image.tmdb.org/t/p/w92//hvprnfDDRE4boZjH6x9xF9Q8NJV.jpg`;
  const temp2 =  `https://image.tmdb.org/t/p/w154//hvprnfDDRE4boZjH6x9xF9Q8NJV.jpg`;

  const user = useContext(UserContext); 
  console.log(user); 

  const medium = `https://image.tmdb.org/t/p/w154/`; 

  function favorites_preview(){
    // TODO use data from users top 4, for now use 4 most recent additions favorites 

    const four_favs = user.account.favorites.slice(0, 4);

    return four_favs.map( (fav) => {

      const year = fav.release_date !== undefined ? fav.release_date.substr(0, 4) : ""; 
      const tool_tip = `${fav.title} (${year})`; 

      return (
        <React.Fragment>
        <ReactTooltip></ReactTooltip>
        <MediumPoster src={`https://image.tmdb.org/t/p/w154/${fav.poster_path}`} key={fav.id} onClick={() => handle_film(fav.id, fav.title)} data-tip={tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"b></MediumPoster>
        </React.Fragment>
      )
    }); 
  }

  function watchlist_preview(){
    // use data from 4 more recent additions to watchlist 

    const four_watchlist = user.account.watchlist.slice(0, 4);

    return ( four_watchlist.map( (item, index) => {
      index = 4 - index;
      return <MiniPoster src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`} key={item.id} z={index.toString()}></MiniPoster>
    }));
  }
  
  function get_username() {
    if(user !== undefined) return user.account.details.username; 
  }


  const history = useHistory();

  const handle_film = (id, title) => {
    // redirect /film/movie-title, pass the movie id to retrieve its data 
    const params = title.toString().toLowerCase().replace( / /g, "-"); 
    const target = `/film/${params}`; // ex. search The Witch /film/the-witch
    history.push(target, {movie_id: id});
  }

  const handle_watchlist = () => { 
    history.push("/:account/watchlist"); 
  }

  return (
    <Container>

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
        <NavLink active_nav={"true"} to="/:account">Profile</NavLink>
        <NavLink to="/:account/favorites">Favorites</NavLink>
        <NavLink to="/:account/ratings">Ratings</NavLink>
        <NavLink to="/:account/watchlist">Watchlist</NavLink>
        <NavLink to="/:account/lists">Lists</NavLink>
      </Nav>
      

        <Body>
          <FavContainer>
            <Title style={title_detail} left>My Favorites <span>more</span></Title>
            <Fav>
              {favorites_preview()}
            </Fav>
          </FavContainer>  

          <RightInfo>
            <Bio><div style={{borderBottom: "1px solid #6f797d", paddingBottom: "2px"}}>BIO GOES HERE</div>TODO</Bio>
            <WatchListPreviewContainer onClick={handle_watchlist}>
              <Title style={title_detail} watchlist>WATCHLIST <span>{user.account.watchlist.length}</span></Title>
              <WatchListPreview>
                {watchlist_preview()}
              </WatchListPreview>
            </WatchListPreviewContainer>
          </RightInfo>
        </Body>
        
    </Container>
  )
}

// Style
const Container = styled.div`
  margin-top: 2%; 
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

const title_detail = {
  display: "flex", 
  justifyContent: "space-between"
}

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
  border-bottom: 1px solid #6f797d; 
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

export const MiniPoster = styled.img`
  border: 1px solid #a5a5a5;
  border-radius: 3%;
  grid-column: span 2; 
  z-index: ${props => props.z}; 
`; 

export default Profile; 
