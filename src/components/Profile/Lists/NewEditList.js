import React, {  useState, useContext, } from "react";
import styled from "styled-components"; 
import axios from "axios"; 
import { Input } from "../../Search/SearchBar"; 
import Header from "../../Header"; 
import SearchDropDown from "./SearchDropDown"; 
import { useHistory, } from "react-router-dom"; 
import { useUserContext, UserContext } from "../../../context/UserContext";  

function NewList( { list } ) {  
  // if passed an existing list, you are in "edit" mode
  // otherwise blank slate 

  // init, are you editing an existing list or creating a new a list (both from dif. nav points)
  let init_name = list !== undefined ? list.name : "";
  let init_desc = list !== undefined ? list.description : "";
  let init_films = list !== undefined ? list.items : [];

  const history = useHistory(); 
  const user = useContext(UserContext); 

  const { set_account } = useUserContext(); 
  const { account } = useContext(UserContext); 

  const [list_name, set_list_name] = useState(init_name);
  const [list_desc, set_list_desc] = useState(init_desc); 
  const [added_films, set_added_films] = useState(init_films); 
 // const [block, set_block] = useState(true);

  
  function context_button(){
    // option to delete the existing list 
    if(list !== undefined) return <Btn onClick={handle_delete} type="button">Delete</Btn>; 
  }

  function get_year(result){
    const year = result.release_date !== undefined ? result.release_date.substr(0, 4) : ""; 
    return year; 
  }

  const add_film = (film) => {
    // modify state, once form submits, add one by one 
    // no duplicated, must be a data set 

    if(added_films.find(item => item.id === film.id) !== undefined) return; 

    let temp = [...added_films];
    temp = temp.concat(film);

    set_added_films(temp); 
    //console.log(temp); 
  }

  const handle_cancel = () => {
    // go back to lists 
    history.push(`/user/${user.account.details.username}/lists`);
  }

  const handle_delete = async () => {
    let res = window.confirm("Are you sure you want to delete this list"); 

    if(res){
      // delete list 

      // FIX you fucking idiot 

      // console.log(res); 
      const retval = await axios.delete(`https://api.themoviedb.org/3/list/${list.id}?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}`);
      console.log(retval);
       

      // let temp = {...account};
      // temp.update = true;
      // set_account(temp);

      //update(); 
      history.push(`/user/${user.account.details.username}/lists`); // success 
      //if(retval.data.status_code === 12) history.push(`/user/${user.account.details.username}/lists`); // success 
    }

  }

  const handle_remove_film = (film) => {
    // remove film from added_films arr 
    
    let temp = [...added_films];
    const find = temp.indexOf(film);

    if(find > -1) temp.splice(find, 1); 
    set_added_films(temp); 
  }

  const handle_submit = async (event) => {
    event.preventDefault(); 

    if(list_name.trim() === "") {
      // only required input 
      alert("Name of list required"); 
      return; 
    }

    // TODO
    // DOUBLE CHECK, LIST NAME not taken!

    // TODO
    // what if change list name!
  

    let redo = false; 

    // if(list !== undefined && ((init_name !== list_name) || (init_desc !== list_desc))){
    //   // // have to CREATE a new list, w/ existing data + updated data b/c you changed the title or desc of the list 

    //   // delete list

    //   //set redo to true; 
    //   alert("TODO ! ");
    //   return; 
    // }

    let res; 
   // let id; 

    if(list === undefined){
      // create NEW LIST, will include added films (if present)
  
      await axios.post(`/api/user/${user.account.details.username}/lists`, 
        {
          "name": list_name,
          "description": list_desc,
          "items": added_films
        })
        .then(res => {
          console.log(res); 
        })
        .catch(err => console.log(err)); 
    }

    /*
    if(list === undefined || redo){
      // create NEW LIST, add each movie.  (same path if you update an existing list and change the Name of the list or Desc, have to start fresh)
    
      res = await axios.post(`https://api.themoviedb.org/3/list?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}`, 
        {
          "name": list_name,
          "description": list_desc,
          "language": "en"
        }).catch(error => console.log(error)); 

      if(res === undefined) return; 
    
      if(res.data.success){
        id = res.data.list_id; 
        add_films(id); 
      }
    }

    else {
      // easiest way to only update items is to clear the list and just add added_films, 
      // rather than comparing init list and added_films and adding and removing appropriately
      id = list.id; // use existing list id 

      res = await axios.post(`https://api.themoviedb.org/3/list/${id}/clear?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}&confirm=true`); // clear list
      if(res.data.success) add_films(id); 
    }
    */ 

 
    // UPDATE CONTEXT FOR APP 
    let temp = {...account};
    temp.update = true;
    set_account(temp);

    // go to user lists to see update 
    history.push(`/user/${user.account.details.username}/lists`);
  }

  const add_films = async (id) => {
    // helper func. 

    for(let i=0; i<added_films.length; ++i){
      await axios.post(``, 
        {
          media_id: added_films[i].id
        }).catch(error => console.log(error));  
    }

    // for(let i=0; i<added_films.length; ++i){
    //   await axios.post(`https://api.themoviedb.org/3/list/${id}/add_item?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}`, 
    //     {
    //       media_id: added_films[i].id
    //     }).catch(error => console.log(error));  
    // }

  }


  return (
    <React.Fragment>
      <Header></Header>

      <Container>

        <NewListHeader>New List</NewListHeader>

        <form onSubmit={handle_submit}>
          <Group>
            <Label>Name of the List</Label>
            <Input style={{width: "50%"}} onChange={(event) => set_list_name(event.target.value)} value={list_name}></Input>
          </Group>

          <Group>
            <Label>Description</Label>
            <TextArea rows="6" onChange={(event) => set_list_desc(event.target.value)} value={list_desc}></TextArea>
          </Group>


        <AddContainer>

          <div style={{display: "flex", marginLeft: "70%"}}>
            {context_button()}
            <Btn  type="button" onClick={handle_cancel} color={"#273038"}>Cancel</Btn>
            <Btn type="submit" color={"#00B200"}>Save</Btn>
          </div>

          <SearchDropDown add_film={add_film}></SearchDropDown>
          <AddedItems>
            {added_films.map( film => (
              <AddedFilm key={film.id}>
                <div style={{display: "flex", alignItems: "center", margin: "1%"}}>
                  <img src={`http://image.tmdb.org/t/p/w92${film.poster_path}`} alt="poster"></img>
                  <div style={{marginLeft: "2%"}}>{film.title + " (" + get_year(film) + ")"}</div>
                </div>
                <RemoveFilm onClick={() => handle_remove_film(film)}>X</RemoveFilm>
              </AddedFilm>
            ))}
          </AddedItems>
        </AddContainer>

        </form>

      </Container>
    </React.Fragment>
  )
}

// Style 
const NewListHeader = styled.h2` 
  color: #6f797d; 
  border-bottom: 1px solid;
`

export const Container = styled.div`
  margin-top: 2%; 
  width: 60%; 
  margin-left: 22%; 

  @media only screen and (max-width: 1500px) {
    width: 80%; 
    margin: 5% 0 0 10%;  
  }

  color: #e1e3e5;
  font-size: 1.2em;
  font-family: Roboto;
`; 

export const Group = styled.div`
  display: flex;
  flex-direction: column; 
  margin-bottom: 3%;  
`;

export const Label = styled.label`
  padding-bottom: 2px; 
`; 

export const TextArea = styled.textarea`
  background-color: #2b3440;
  border: none;  
  font-size: 1em;
  font-family: Roboto; 
  width: 60%; 

  &:focus{
    outline: none;
    background-color: #e1e3e5;
  }
`; 

const AddedItems = styled.div`
  border: 1px solid blue;
  margin-top: 1%; 
`; 

export const Btn = styled.button`
  //background-color: ${props => props.cancel ? "#273038" : "#00B200"}; 
  background-color: ${props => props.color}; 
  border-radius: 8%;
  padding: 5px;
  font-family: Roboto; 
  font-size: 1.0em;  
  border: none;
  outline: none; 
  text-align: center; 
  margin-right: 3px; 
  width: 110px; 
   

  &:hover{
    cursor: pointer;
    color: #adadff;
  }

`;

const AddContainer = styled.div`
`; 

const AddedFilm = styled.div`
  display: flex;
  flex-direction: row: 
  margin-top: 1%; 
  align-items: center;
  justify-content: space-between;  
`; 

const RemoveFilm = styled.div`
  padding: 10px; 
  font-size: 1.3em;
  opacity: .4;

  &:hover{
    cursor: pointer;
    opacity: 1; 
  }
`; 

export default NewList; 