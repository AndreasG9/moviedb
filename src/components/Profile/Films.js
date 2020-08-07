import React, { useState, useContext, useEffect } from "react"; 
import styled from "styled-components"; 
import { Link, useLocation } from "react-router-dom"; 
import { UserContext } from "../../context/UserContext"; 
import ReactTooltip from "react-tooltip";
import ReactPaginate from "react-paginate";
import ProfileHeader from "./ProfileHeader"; 


function Films() {
  // a users favorites, watchlist, or ratings w/ poster display date added (watchlist) or RATING (fav, rating) 

  //const temp2 =  `https://image.tmdb.org/t/p/w154//hvprnfDDRE4boZjH6x9xF9Q8NJV.jpg`;

  const location = useLocation();
  const user = useContext(UserContext); 
  // const w = location.pathname.includes("watchlist") ? "watchlist" : "favorites"; 
  console.log(location.pathname); 


  // easier to call 
  const watchlist = user.account.watchlist;
  const POSTS_PER_PAGE = 30;
  const TOTAL_POSTS = watchlist.length; 


  const [active_nav, set_active_nav] = useState({
    profile: false,
    favorites: false,
    ratings: false,
    watchlist: true,
    lists: false
  }); 

  const [current_page, set_current_page] = useState(1); 
  const [current, set_current] = useState([]); 

  useEffect( () => {

    const last = current_page * POSTS_PER_PAGE;
    const first = last - POSTS_PER_PAGE; 
    set_current(watchlist.slice(first, last));
    console.log(watchlist.slice(first, last)); 

  }, [current_page, watchlist]); 

  function get_header(){
    let msg = "";  

    if(active_nav.watchlist === true) msg = `You Want to See ${user.account.watchlist.length} films`; 
    else if(active_nav.favorites === true) msg = `You have ${"some amount"} of favorites`;
    if(active_nav.ratings === true) msg = `You have  rated ${"some amount"} films`;
    if(active_nav.list === true) msg = `LIST TITLE HERE w/ short desc.`;
    
    return <Header>{msg}</Header>
  }

  function get_films_context(){
    // watchlist, ratings, or a specific list 


  }


  const handle_page_change = (page_num) => { 
    set_current_page(page_num.selected+1); 
  }




  return (
    <Container>
      
      <ProfileHeader></ProfileHeader>

      {get_header()}

      <FiltersContainer>
          <Select >
            <Option>Date Added Descending</Option>
            <Option>Date Added Ascending</Option>
            <Option>Popularity Descending</Option>
            <Option>Rating Descending</Option>
            <Option>Rating Ascending</Option>
            <Option>Release Date Descending</Option>
            <Option>Release Date Ascending</Option>
          </Select>
      </FiltersContainer>

      <FilmsContainer>
      {current.map( film => {
          const year = film.release_date !== undefined ? film.release_date.substr(0, 4) : ""; 
          const tool_tip = `${film.title} (${year})`; 
        return ( 
          <React.Fragment key={film.id}>
            <ReactTooltip></ReactTooltip>
            <Poster src={`https://image.tmdb.org/t/p/w154/${film.poster_path}`}  data-tip={tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"></Poster>
          </React.Fragment>
        )
        })}
      </FilmsContainer>
      

      <ReactPaginate
        nextClassName = "prev-next"
        previousClassName = "prev-next"
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

    </Container>
  )
}


// Style 
export const Container = styled.div`
  font-family: Roboto; 
  color: #a5a5a5; 
  margin-top: 2%; 

  width: 60%;
  margin-left: 22%; 

  @media only screen and (max-width: 1500px) {
    width: 90%;
    margin-left: 5%; 
 }

 border: 1px solid white; 
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

const Header = styled.div`
  //border-bottom: 1px solid #e1e3e5; 
  margin-top: 2%;  
`; 

export const FiltersContainer = styled.div`
  border-top: 2px solid #a5a5a5;
  border-bottom: 2px solid #a5a5a5;

`; 

export const Select = styled.select`
  margin: 2%; 
  font-family: Roboto;
  background-color: #13181c; 
  color: #e1e3e5;
  padding: 5px; 

  position: relative;
  left: 57%; 


  &:hover{
    color: #adadff;
    cursor: pointer; 
  }

  &:focus{
    outline: none; 
  }
`; 

export const Option = styled.option`
  background-color: #8699aa; 
  color: #333; 
  font-size: 1.4em; 
`; 

export const FilmsContainer = styled.div`
  display: flex;  
  flex-wrap: wrap; 
  border: 1px solid green; 
  width: 75%; 
`; 

export const Poster = styled.img`
  display: block; 
  border: 1px solid #a5a5a5;
  border-radius: 3%;

  // width: 156px;
  // height: 233px; 

  margin: 6px;  

  &:hover{
    cursor: pointer;
    border: 2px solid #98fb98;
    margin: 5px;  
  }

`; 

// testing 
// {[...Array(50)].map(test => (
//   <Poster src={temp2} key={uuidv4()}></Poster>
// ))}



export default Films; 
