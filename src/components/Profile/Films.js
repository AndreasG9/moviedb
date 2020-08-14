import React, { useState, useContext, useEffect } from "react"; 
import styled from "styled-components"; 
import { Link, useHistory, useLocation } from "react-router-dom"; 
import { UserContext } from "../../context/UserContext"; 
import ReactTooltip from "react-tooltip";
import ReactPaginate from "react-paginate";
import ProfileHeader from "./ProfileHeader"; 

function Films( {list} ) {
  // a users favorites, watchlist, or ratings w/ poster display date added (watchlist) or RATING (fav, rating) 

  const user = useContext(UserContext);
  const location = useLocation();  
  const history = useHistory(); 

  // init 
  let ACTIVE_NAV; 
  let init_results; 
  let TOTAL_POSTS; 

  // get ACTIVE_NAV from path 
  const temp = location.pathname.split("/")[3];
  console.log(temp); 
  if(temp === "profile" || temp === "ratings" || temp === "favorites" || temp === "watchlist" || temp === "lists" || temp === "list") ACTIVE_NAV = temp;
  else history.push("/404"); // url manually entered path and its not recognized/ invalid  
  
  // easier to call 
  if(ACTIVE_NAV === "list") {
    init_results = list.items; 
    TOTAL_POSTS = list.item_count; 
  }
  else {
    init_results = Object.keys(user.account.details).length !== 0 ? user.account[ACTIVE_NAV] : ""; 
    TOTAL_POSTS = Object.keys(user.account.details).length !== 0  ? user.account[ACTIVE_NAV].length : ""; 
  }
  
  const POSTS_PER_PAGE = 30; 
  const [current_page, set_current_page] = useState(1); 
  const [results, set_results] = useState(init_results); 
  const [current, set_current] = useState([]); 
  const [sort, set_sort] = useState("When Added"); 
  

  useEffect( () => {
    // show 30 of the results a page 

    if(init_results){
      const last = current_page * POSTS_PER_PAGE;
      const first = last - POSTS_PER_PAGE;
      set_current(results.slice(first, last)); 
      
    }

  }, [current_page, init_results, results]); 

  useEffect( () => {
    // sorting method 

    let temp = [...init_results];  

    if(sort === "Popularity Descending") temp.sort((a, b) => (a.popularity > b.popularity) ? -1 : 1);
    else if(sort === "Popularity Ascending") temp.sort((a, b) => (a.popularity > b.popularity) ? 1 : -1);
    else if(sort === "Highest First") temp.sort((a, b) => (a.rating > b.rating) ? -1 : 1);
    else if(sort === "Lowest First") temp.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
    else if(sort === "Release Date Descending") temp.sort((a, b) => (a.release_date > b.release_date) ? -1 : 1);
    else if(sort === "Release Date Ascending") temp.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1);
    else temp = init_results; // "when added"

    set_results(temp); 

  }, [sort, init_results])


  function get_header(){
    let msg = "";  

    if(ACTIVE_NAV === "watchlist") msg = `You Want to See ${user.account.watchlist.length} films`; 
    else if(ACTIVE_NAV === "favorites") msg = `You have ${user.account.favorites.length} of favorites`;
    else if(ACTIVE_NAV === "ratings") msg = `You Have Rated ${user.account.ratings.length} Films`;
    else if(ACTIVE_NAV === "lists") msg = `${list.name}`;

    return <Header>{msg}</Header>
  }

  function include_desc(){
    // only iff a list 

    if(ACTIVE_NAV === "lists"){
      return (
        <Description>
          {list.description || "no description"}
          <Button onClick={handle_list_edit}>Edit or Delete This List...</Button>
        </Description>
      )
    }
  }
 
  function get_films_context(film){
    // watchlist, ratings, or a specific list 

    if(ACTIVE_NAV === "watchlist" || ACTIVE_NAV === "lists"){
      const found = user.account.ratings.find(item => item.id === film.id); // maybe you seen the film, but want to remind yourself to re-watch 

      if(found) return <Rating>{found.rating}</Rating>;
      else return <Rating>No rating found</Rating>;
    }

    else if(ACTIVE_NAV === "ratings") return <Rating>{film.rating}</Rating>; 
  }

  const handle_sorting = (event) => {
    set_sort(event.target.value); 
  }


  const handle_page_change = (page_num) => {
    set_current_page(page_num.selected+1); 
  }

  const handle_list_edit = () => {
    const params = list.name.toString().toLowerCase().replace( / /g, "-"); 
    history.push(`/user/${user.account.details.username}/list/${params}/edit`, {list: list});
  }


  const handle_film = (film) => {
    const params = film.title.toString().toLowerCase().replace( / /g, "-"); 
    const target = `/film/${params}`; 
    history.push(target, {movie_id: film.id});
  } 


  return (
    <Container>
      
      <ProfileHeader></ProfileHeader>

      {get_header()}

      <FiltersContainer>
          <label>Sort By</label>
          <Select onChange={handle_sorting} id="sort-by-id">

            <Option>When Added</Option>

            <Group label=" TMDB FILM POPULARITY">
              <Option>Popularity Descending</Option>
              <Option>Popularity Ascending</Option>
            </Group>

            <Group label="Your Rating">
              <Option>Highest First</Option>
              <Option>Lowest First</Option>
            </Group>        

            <Group label="RELEASE DATE">
              <Option>Release Date Descending</Option>
              <Option>Release Date Ascending</Option>
            </Group>

          </Select>
      </FiltersContainer>

      {include_desc()}

      <FilmsContainer>
      {current.map( film => {
          const year = film.release_date !== undefined ? film.release_date.substr(0, 4) : ""; 
          const tool_tip = `${film.title} (${year})`; 
        return ( 
          <Film key={film.id}>
            <ReactTooltip></ReactTooltip>
            <Poster 
              src={`https://image.tmdb.org/t/p/w154/${film.poster_path}`}  
              onClick={() => handle_film(film)}
              data-tip={tool_tip}  
              data-effect="solid" 
              data-background-color="#425566" 
              data-text-color="#e1e3e5" 
              data-delay-show="200">  
            </Poster>
            {get_films_context(film)}
          </Film>
        )
        })}
      </FilmsContainer>

      <div style={{width: "75%"}}>
        <ReactPaginate
          nextClassName = "prev-next"
          nextLinkClassName = "prev-next-link"
          previousClassName = "prev-next"
          previousLinkClassName = "prev-next-link"
          activeLinkClassName = "active-page"
          breakClassName= "break"
          containerClassName = "paginate-container"
          pageClassName = "page"
          pageLinkClassName = "page-link"

          pageCount = {TOTAL_POSTS / POSTS_PER_PAGE}
          pageRangeDisplayed = {4}
          marginPagesDisplayed = {2}
          onPageChange = {handle_page_change}>
        </ReactPaginate>  
      </div>
    </Container>
  )
}


// Style 
export const Container = styled.div`
  font-family: Roboto; 
  color: #a5a5a5; 
  margin-top: 1%; 

  width: 60%;
  margin-left: 22%; 
  height: 100vh; 

  @media only screen and (max-width: 1500px) {
    width: 90%;
    margin-left: 5%; 
 }
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

export const NavLink = styled(Link)`
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

  color: ${(props) => props.active_nav ? "#333" : "#e1e3e5"}; 
  background-color: ${(props) => props.active_nav ? "#e1e3e5" : ""}; 
  margin-right: ${props => props.test === "true" ? "5%" : "0"}; 
  pointer-events:  ${(props) => props.active_nav ? "none" : "auto"}; 
`;

export const Header = styled.div`
  margin-top: 4%;  
  margin-left: 2%; 
`; 

export const FiltersContainer = styled.div`
  border-top: 2px solid #a5a5a5;
  border-bottom: 2px solid #a5a5a5;
  width: 72%;
  margin-left: 2%; 

  display: flex;
  justify-content: flex-end; 
  align-items: center; 

  @media only screen and (max-width: 1100px) {
    width: 86%;
 }

`; 

export const Select = styled.select`
  margin: 2% 0 2% 2%; 
  font-family: Roboto;
  background-color: #13181c; 
  color: #e1e3e5;
  padding: 5px; 

  &:hover{
    color: #adadff;
    cursor: pointer; 
  }

  &:focus{
    outline: none; 
  }
`; 

const Group = styled.optgroup`
  font-size: 1.1em;
  background-color: #13181c; 
  color: #adadff;
`;

export const Option = styled.option`
  background-color: #8699aa; 
  color: #333; 
  font-size: 1.4em; 
`; 

export const FilmsContainer = styled.div`
  display: flex;  
  flex-wrap: wrap; 
  width: 75%; 
  margin: 2% 0 0 1%; 

  @media only screen and (max-width: 1100px) {
    width: 92%;
 }
`; 

export const Film = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  margin-bottom: 2%; 
  border-radius: 3%;
`;

export const Poster = styled.img`
  display: block; 
  border: 1px solid #a5a5a5;
  border-radius: 3%;
  margin: 6px;  

  &:hover{
    cursor: pointer;
    border: 2px solid #98fb98;
    margin: 5px;  
  }
`; 

const Rating = styled.div`
  width: 154px; 
  text-align: center; 
  background-color: rgba(66, 85, 102, 1); 
`; 

const Description = styled.div`
  width: 72%;
  margin: 3% 2%; 
  padding-bottom: 5px; 
  border-bottom: 2px dotted #a5a5a5;
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 

  @media only screen and (max-width: 1100px) {
    width: 86%;
 }

`; 

const Button = styled.button`
  background-color: #00B200;

  color: #333;  
  border-radius: 8%;
  padding: 8px;
  font-family: Roboto; 
  font-size: 1.1em;  
  border: none;
  outline: none; 
  text-align: center; 

  &:hover{
    cursor: pointer;
    color: #e1e3e5;
  }
`; 

export default Films; 