import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom"; 
import { UserContext } from "../../context/UserContext"; 
import ReactTooltip from "react-tooltip";
import ProfileHeader from "./ProfileHeader"; 
//import axios from "axios"; 

function Profile() {
  // get user rated movies, favorite, watchlist, and created lists 

  const user = useContext(UserContext); 
  
  function favorites_preview(){
    // TODO use data from users top 4, for now use 4 most recent additions favorites 

    const four_favs = user.account.favorites.slice(0, 4);

    return four_favs.map( (fav) => {

      const year = fav.release_date !== undefined ? fav.release_date.substr(0, 4) : ""; 
      const tool_tip = `${fav.title} (${year})`; 

      return (
        <React.Fragment key={fav.id}>
          <ReactTooltip></ReactTooltip>
          <MediumPoster src={`https://image.tmdb.org/t/p/w154/${fav.poster_path}`} key={fav.id} onClick={() => handle_film(fav.id, fav.title)} data-tip={tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"b></MediumPoster>
        </React.Fragment>
      )
    }); 
  }

  function ratings_preview(){ 
    const four_ratings = user.account.ratings.slice(0, 4);

    return four_ratings.map( (film) => {

      const year = film.release_date !== undefined ? film.release_date.substr(0, 4) : ""; 
      const tool_tip = `${film.title} (${year})`; 

      return (
        <Film key={film.id}>
          <ReactTooltip></ReactTooltip>
          <MediumPoster src={`https://image.tmdb.org/t/p/w154/${film.poster_path}`} key={film.id} onClick={() => handle_film(film.id, film.title)} data-tip={tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"b></MediumPoster>
          <YourRating>{film.rating}</YourRating>
        </Film>
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

  function lists_preview(){
    // similar to watchList_prevew, but three lists 
    if(user !== undefined){
     const three_lists = user.account.lists.slice(0, 3); 

    
    // POSTER PATH (selected when create list)

     if(three_lists.length > 0){
        return (
          three_lists.map( list => (
            <div key={list.id} style={{margin: "3% 0", display: "flex", border: "1px solid white", padding: "2px"}} onClick={() => handle_list(list)}>
              <ListTitle>{list.name}</ListTitle>
              <ListTitle smaller>{list.item_count} {film_or_films(list.item_count)}</ListTitle>
            </div>
          ))
        )
      }
    }
  }

  function film_or_films(count){
    let res = ""; 

    if(count === 1) res = "film"; 
    else res = "films";

    return res; 
  }

  
  const history = useHistory();

  const handle_film = (id, title) => {
    // redirect /film/movie-title, pass the movie id to retrieve its data 
    const params = title.toString().toLowerCase().replace( / /g, "-"); 
    const target = `/film/${params}`; // ex. search The Witch /film/the-witch
    history.push(target, {movie_id: id});
  }

  const handle_list = (list) => {
    // go to specific list 
  }


  return (
    <Container>

      <ProfileHeader></ProfileHeader>
      
      <Body>
        <Info>
          <PreviewContainer style={{fontSize: "1.2em"}} onClick={() => history.push(`/user/${user.account.details.username}/favorites`) }>
            <Title left>My Favorites <span>more</span></Title>
              <Preview>
                {favorites_preview()}
              </Preview>
          </PreviewContainer>  

          <PreviewContainer style={{fontSize: "1.2em", marginTop: "5%"}} onClick={() => history.push(`/user/${user.account.details.username}/ratings`)}>
            <Title left>Recent Ratings <span>more</span></Title>
              <Preview>
                {ratings_preview()}
              </Preview>
          </PreviewContainer>      
        </Info>

        <Info right>
          <Bio><div style={{borderBottom: "1px solid #6f797d", paddingBottom: "2px"}}>BIO GOES HERE</div>TODO</Bio>

          <WatchListPreviewContainer onClick={() => history.push(`/user/${user.account.details.username}/watchlist`)}>
            <Title>Watchlist<span>{user.account.watchlist.length}</span></Title>
            <PreviewRight>
              {watchlist_preview()}
            </PreviewRight>
          </WatchListPreviewContainer>

          <ListsPreviewContainer >
            <Title>Recent Lists <span>{user.account.lists.length}</span></Title>
            <ListPreview>
              {lists_preview()}
            </ListPreview>
          </ListsPreviewContainer>    
        </Info>
      </Body>
      
    </Container>
  )
}


// Style
const Container = styled.div`
  margin-top: 1%; 
  height: 100vh; 
  font-family: Roboto; 
  color: #a5a5a5; 
  width: 60%;
  margin-left: 22%; 

  @media only screen and (max-width: 1500px) {
    width: 97.5%; 
    margin: 2% 0 0 0; 
  }
`; 

const Body = styled.div`
  margin-top: 3.5%; 
  display: flex; 
  flex-direction: row; 
  justify-content: space-between; 
`; 

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column; 
`; 

const Preview = styled.div`
  margin: 2%; 
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  border-radius: 3%;
  width: 35vw; 
`; 

const Info = styled.div`
  display: flex;
  flex-direction: column; 
  width: ${props => props.right ? "20vw" : "80vw"}; 

  @media only screen and (max-width: 1500px) {
    width: ${props => props.right ? "33vw" : "67vw"}; 
  }
`; 

const Bio = styled.div`
  // temp 
  height: 240px;
  word-wrap: break-word;
`; 

const WatchListPreviewContainer = styled.div`
  margin-top: 12.7vh;  
`;

const PreviewRight = styled.div`
  margin-top: 2%; 

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
  margin-left: ${props => props.left ? "2%" : "0"}; 
  width: ${props => props.left ? "35vw" : "19.6vw"}; 

  border-bottom: 1px solid #6f797d; 
  padding-bottom: 2px;  

  &:hover{
    cursor: pointer; 
    color: #adadff; 
  }

  display: flex;
  justify-content: space-between;
`; 


const MediumPoster = styled.img`
  border: 2px solid #a5a5a5;
  border-radius: 3%;  

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

const ListsPreviewContainer = styled.div`
  margin-top: 20%; 
`;

const ListPreview = styled.div`
  display: flex;
  flex-direction: column; 
`; 

const ListTitle = styled.div`
  font-size: 1.1em; 
  margin-left: ${props => props.smaller ? "3%" : ""}; 
  opacity: ${props => props.smaller ? ".3" : ""}; 
  color: ${props => props.smaller ? "" : "#e1e3e5"}; 
  
`; 

export const Film = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  margin-bottom: 2%; 
  border-radius: 3%;
`;

const YourRating = styled.div`
  margin-top: 4%; 
  width: 154px; 
  text-align: center; 
  background-color: rgba(66, 85, 102, 1); 
`; 

export default Profile; 