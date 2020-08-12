import React, {useState, useEffect, useContext } from "react";
import styled from "styled-components"; 
import { Container, Header, FiltersContainer, Select, Option } from "../Films"; 
import ReactPaginate from 'react-paginate';
import axios from "axios"; 
import { UserContext, useUserContext } from "../../../context/UserContext"; 
import ProfileHeader from "../ProfileHeader"; 
import { useHistory } from "react-router-dom"; 

 function Lists() {
  // other User pages link to film comp., lists goes here first to preview lists, them to films comp.  

  const user = useContext(UserContext); 
  const history = useHistory(); 
  const { set_account } = useUserContext(); 
  const { account } = useContext(UserContext); 

  // easier to call 
  let lists = user.account.lists.length !== 0 ? user.account.lists : []; 
  const POSTS_PER_PAGE = 2;
  const TOTAL_POSTS = user.account.lists.length !== 0  ? user.account.lists.length : 0; 

  const [current_page, set_current_page] = useState(1); 
  const [results, set_results] = useState(lists); 
  const [current, set_current] = useState([]); 
  const [sort, set_sort] = useState("When Updated"); 
  const [lists_data, set_lists_data] = useState([]); 


  useEffect( () => {
    // lists with all their content 

    const get_lists = async () => {

      let temp = []; 

      for(let i=0; i<lists.length; ++i){
        const res = await axios.get(`https://api.themoviedb.org/3/list/${lists[i].id}?api_key=${process.env.REACT_APP_API_KEY}`).catch(error => console.log(error)); 
        temp = temp.concat(res.data);
      }

      set_lists_data(temp); 
      set_results(temp);
    }

    get_lists(); 

  }, [lists, account, set_account]);


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



  function get_list_preview(list){
    // preview 3 items for each list 
    

    if(list.length > 0){
      return (
        <React.Fragment key={list.id}>
          {list.map( item => (
            <MiniPoster src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`} key={item.id}></MiniPoster>
          ))}
        </React.Fragment>
      )
    }
  }

  function film_or_films(count){
    let res = ""; 

    if(count === 1) res = "film"; 
    else res = "films";

    return count + " " + res; 
  }


  function get_short_desc(list){
    if(list.description.length < 50) return list.description;
    else return (list.description.slice(1, 50) + "..."); 
  }


  const handle_page_change = (page_num) => { 
    set_current_page(page_num.selected+1); 
  }

  function handle_list(list){
    // go to list (use film comp to display)

    const path =  list.name.replace(/\s/g , "-"); 
    history.push(`/user/${user.account.details.username}/lists/${path}`, {list: list});
  }


  const handle_new_list = () => {
    // create a new list 
    // go to create list! 
    // /user/username/list/new 
  }


  // testing 
  //const temp = `https://image.tmdb.org/t/p/w92//hvprnfDDRE4boZjH6x9xF9Q8NJV.jpg`;

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


        {lists_data.map(list => (
          <List key={list.id}>
            <ListPreview onClick={() => handle_list(list)}>
              {get_list_preview(list.items)}
            </ListPreview>

            <div style={{display: "flex", flexDirection: "column", paddingLeft: "5px"}}>
            <ListTitle>{list.name}</ListTitle>
            <ListItemCount>{film_or_films(list.item_count)}</ListItemCount>
            <ListShortDesc>{get_short_desc(list)}</ListShortDesc>
            </div>
          </List>
        ))}
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
  opacity: .4; 
`; 

const ListShortDesc = styled.div`
  font-size: .9em;
  margin-top: 5%; 
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