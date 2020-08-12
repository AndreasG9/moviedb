import React, {useState, useEffect, useContext } from "react";
import styled from "styled-components"; 
import { Container, Header, FiltersContainer, Select, Option } from "../Films"; 
import ReactPaginate from 'react-paginate';
import axios from "axios"; 
import { UserContext } from "../../../context/UserContext"; 
import ProfileHeader from "../ProfileHeader"; 

 function Lists() {
  // other User pages link to film comp., lists goes here first to preview lists, them to films comp.  

  const user = useContext(UserContext); 
  console.log(user.account.details); 

  // easier to call 
  let lists = user.account.lists.length !== 0 ? user.account.lists : []; 
  const POSTS_PER_PAGE = 2;
  const TOTAL_POSTS = user.account.lists.length !== 0  ? user.account.lists.length : 0; 

  const [current_page, set_current_page] = useState(1); 
  const [results, set_results] = useState(lists); 
  const [current, set_current] = useState([]); 
  const [sort, set_sort] = useState("When Updated"); 


  useEffect( () => {
    // show 30 of the results a page 

    if(lists.length > 0){
      //console.log(lists); 
      const last = current_page * POSTS_PER_PAGE;
      const first = last - POSTS_PER_PAGE;
      set_current(results.slice(first, last)); 
    }

  }, [current_page, lists, results]); 

  useEffect( () => {
    // sorting method 

    let temp = [...lists];  

    if(sort === "Popularity Descending") temp.sort((a, b) => (a.popularity > b.popularity) ? -1 : 1);
    else if(sort === "Popularity Ascending") temp.sort((a, b) => (a.popularity > b.popularity) ? 1 : -1);
    else if(sort === "Highest First") temp.sort((a, b) => (a.rating > b.rating) ? -1 : 1);
    else if(sort === "Lowest First") temp.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
    else if(sort === "Release Date Descending") temp.sort((a, b) => (a.release_date > b.release_date) ? -1 : 1);
    else if(sort === "Release Date Ascending") temp.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1);
    else temp = lists; // "when updated"

    set_results(temp); 

  }, [sort, lists]); 



  // function list_preview(){

  // }

  // function handle_list(){
  //   // go to list (use film comp to display)
  // }

  const handle_page_change = (page_num) => { 
    set_current_page(page_num.selected+1); 
  }

  const handle_new_list = () => {
    // create a new list 
    // go to create list! 
    // /user/username/list/new 
  }


  // testing 
  const temp = `https://image.tmdb.org/t/p/w92//hvprnfDDRE4boZjH6x9xF9Q8NJV.jpg`;

  return (
    <Container>
      
      <ProfileHeader></ProfileHeader>

      <Header>You have {user.account.lists.length} lists</Header>

     <div style={{display: "flex"}}>
        <FiltersContainer style={{width: "75%"}}>
          <label>Sort by</label>
          <Select>
            <Option>When Updated</Option>
            <Option>When Added</Option>
          </Select>
        </FiltersContainer>
        <NewListBtn onClick={handle_new_list}>Start a new list...</NewListBtn>
      </div>

      <ListsContainer>



        {/* { [...Array(10)].map(element => (
          <List>
          <ListPreview>
            <MiniPoster src={temp}></MiniPoster>
            <MiniPoster src={temp}></MiniPoster>
            <MiniPoster src={temp}></MiniPoster>
            <MiniPoster src={temp}></MiniPoster>
          </ListPreview>

          <div style={{display: "flex", flexDirection: "column", paddingLeft: "5px"}}>
            <ListTitle>List of Cleo from 5 to 7</ListTitle>
            <ListItemCount> 40 films</ListItemCount>
          </div>
        </List>
        ))} */}
      </ListsContainer>
     

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
const ListsContainer = styled.div`
  width: 75%; 

`; 

const List = styled.div`
  display: flex;
  align-items: center; 
  padding-bottom: 3px; 
  border-bottom: 1px solid #6f797d; 
  margin-left: 2%; 
`;

const ListPreview = styled.div`
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


const ListTitle = styled.div`
  color: #e1e3e5;
  font-size: 1.4em;
    
  &:hover{
    cursor: pointer;
    color: #adadff; 
  }
`; 

const ListItemCount = styled.div`
  font-size: .8em; 
`; 

const NewListBtn = styled.button`
  border: none; 
  color: #a5a5a5;
  background-color: #273038; 
  border-radius: 8%;
  padding: 15px;
  font-size: 1.1em;  
  text-align: center; 
  margin-left: 8%; 
  height: 10%;   

  &:hover{
    cursor: pointer;
    color: #e1e3e5;
  }

  &:focus{
    outline: none;
  }
`; 

const MiniPoster = styled.img`
  border: 1px solid #a5a5a5;
  border-radius: 3%;
  grid-column: span 2; 
`; 

export default Lists; 