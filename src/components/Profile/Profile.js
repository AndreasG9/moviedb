import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; 
import { UserContext } from "../../context/UserContext"; 
import ReactTooltip from "react-tooltip";
import ProfileHeader from "./ProfileHeader"; 

function Profile() {
  // get user rated movies, favorite, watchlist, and created lists 

  const user = useContext(UserContext); 
  console.log(user); 
  // user.account.profile_details

  function tool_tip(id, title, release_date){
    let retval = {}; 

    let year = release_date !== undefined ? release_date.substr(0, 4) : ""; 
    retval.tool_tip = `${title} (${year})`; 
    retval.path = id + "-" + title.toString().toLowerCase().replace( / /g, "-"); // for redirect 

    return retval; 
  }


  function favorites_preview(){
    // data from users 4 selected favorites in edit profile 

    if(Object.keys(user.account.user_data.favorites).length === 0) return <div style={{fontSize: ".8em", color: "#fff"}}>Add four favorites in <i>Edit Profile</i></div>

    const four_favs = user.account.user_details.favorites.slice(0, 4); 
    console.log(four_favs); 


    return four_favs.map( (fav) => {

      const year = fav.release_date !== undefined ? fav.release_date.substr(0, 4) : ""; 
      const tool_tip = `${fav.title} (${year})`; 
      const path = fav.id + "-" + fav.title.toString().toLowerCase().replace( / /g, "-"); // for redirect 
      

      return (
        <StyledLink key={fav.id} to={
          {
            pathname: `/film/${path}`,
            state: {movie_id: fav.id}
          }
        }>
          <ReactTooltip></ReactTooltip>
          <MediumPoster src={`https://image.tmdb.org/t/p/w154/${fav.poster_path}`} key={fav.id} data-tip={tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"b></MediumPoster>
        </StyledLink>
      )
    }); 
  }

  function ratings_preview(){ 

    if(Object.keys(user.account.user_data.ratings).length === 0) return; 


    const four_ratings = user.account.user_data.ratings.slice(-4);

    return four_ratings.map( (film) => {

      const year = film.release_date !== undefined ? film.release_date.substr(0, 4) : ""; 
      const tool_tip = `${film.title} (${year})`; 
      const path = film.id + "-" + film.title.toString().toLowerCase().replace( / /g, "-"); // for redirect 

      return (
        <StyledLink key={film.id} to={
          {
            pathname: `/film/${path}`,
            state: {movie_id: film.id}
          }
        }>
          <Film >
            <ReactTooltip></ReactTooltip>
            <MediumPoster src={`https://image.tmdb.org/t/p/w154/${film.poster_path}`} key={film.id} data-tip={tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"b></MediumPoster>
            <YourRating>{film.rating}</YourRating>
          </Film>
        </StyledLink>
      )
    });
  }

  function watchlist_preview(){
    // use data from 4 more recent additions to watchlist 

    if(Object.keys(user.account.user_data.watchlist).length === 0) return; 
    
    const four_watchlist = user.account.user_data.watchlist.slice(-4);

    return ( four_watchlist.map( (item, index) => {
      index = 4 - index;
      return <MiniPoster src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`} key={item.id} z={index.toString()}></MiniPoster>
    }));
  }

  function lists_preview(){
    // similar to watchList_prevew, but three lists 

    if(Object.keys(user.account.user_data.lists).length === 0) return; 


    if(user !== undefined){
     const three_lists = user.account.lists.slice(0, 3); 

     if(three_lists.length > 0){
        return (
          three_lists.map( list => (
            <div key={list.id} style={{margin: "2% 0", display: "flex", padding: "2px", alignItems:"baseline"}} onClick={() => handle_list(list)}>
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

  function get_bio(){
    if(user.account.user_data.details.bio === "") return <Bio><div style={{borderBottom: "1px solid #6f797d", paddingBottom: "2px"}}>BIO</div></Bio>; 
    else return <Bio><div style={{borderBottom: "1px solid #6f797d", paddingBottom: "2px", marginBottom: "4%"}}>BIO</div>{user.account.user_data.details.bio}</Bio>; 
  }

  const handle_list = (list) => {
    // go to specific list 

    

  }

  return (
    <Container>

      <ProfileHeader></ProfileHeader>
      
      <Body>
        <Info>

          <PreviewContainer style={{fontSize: "1.2em"}}>
            <StyledLink to={`/user/${user.account.details.username}/favorites`}>
              <Title left>Favorite Films<span>more</span></Title>
            </StyledLink>
            <Preview>
              { user.account.user_data.details.four_favs.map( (fav) => {

                const info = tool_tip(fav.id, fav.title, fav.release_date);

                return (
                  <StyledLink key={fav.id} to={
                    {
                      pathname: `/film/${info.path}`,
                      state: {movie_id: fav.id}
                    }
                  }>
                    <ReactTooltip></ReactTooltip>
                    <MediumPoster src={`https://image.tmdb.org/t/p/w154/${fav.poster_path}`} key={fav.id} data-tip={info.tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"b></MediumPoster>
                  </StyledLink>
                )
              })}

            </Preview>
          </PreviewContainer>  

          <PreviewContainer style={{fontSize: "1.2em", marginTop: "5%"}}>
            <StyledLink to={`/user/${user.account.details.username}/ratings`}>
              <Title left>Recent Ratings <span>more</span></Title>
            </StyledLink>
            <Preview>
              {ratings_preview()}
            </Preview>
          </PreviewContainer>      
        </Info>

        <Info right>
          {get_bio()}

          <WatchListPreviewContainer >
            <StyledLink to={`/user/${user.account.details.username}/watchlist`}>
              <Title>Watchlist<span>{user.account.user_data.watchlist.length}</span></Title>
              <PreviewRight>
                {watchlist_preview()}
              </PreviewRight>
            </StyledLink>
          </WatchListPreviewContainer>
          

          <ListsPreviewContainer>
            <StyledLink to={`/user/${user.account.details.username}/lists`}>
              <Title>Recent Lists <span>{user.account.user_data.lists.length}</span></Title>
            </StyledLink>
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
export const Container = styled.div`
  margin-top: 1%; 
  height: 100vh; 
  font-family: Roboto; 
  color: #a5a5a5; 
  width: 60%;
  margin-left: 22%; 
  margin-bottom: 10%; 

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
  font-size:${props => props.smaller ? ".7em" : "1.1em"}; 
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

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #a5a5a5; 

  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
  }
`; 

export default Profile; 