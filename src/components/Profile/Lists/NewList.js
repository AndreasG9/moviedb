import React, {  useEffect, useState, useContext } from "react";
import styled from "styled-components"; 
import axios from "axios"; 
import { Input } from "../../Search/SearchBar"; 
import Header from "../../Header"; 
import SearchDropDown from "./SearchDropDown"; 
import { UserContext } from "../../../context/UserContext"; 
import { useHistory } from "react-router-dom"; 


function NewList() {

  // ONE PAGE ONE PAGE

  // INPUT: NAME LIST, DESC. 
  // private -- NEEDS access token 
  // (SEARCH DROP DOWN COMP) (POSTER, MOVIE TITLE, and YEAR)
  // CHOOSE IMAGE

  const history = useHistory(); 
  const user = useContext(UserContext); 

  const [list_name, set_list_name] = useState("");
  const [list_desc, set_list_desc] = useState(""); 
  const [added_films, set_added_films] = useState([]); 

  const header = {
    "Content-Type" : "application/json;charset=utf-8"
  }



  function get_year(result){
    const year = result.release_date !== undefined ? result.release_date.substr(0, 4) : ""; 
    return year; 
  }

  const add_film = (film) => {
    // modify state, once form submits, add one by one 
    // no duplicated, must be a data set 

    let temp = [...added_films];
    temp = temp.concat(film);

    set_added_films(temp); 
    console.log(temp); 
  }

  const handle_cancel = () => {
    // go back to lists 
    history.push(`/user/${user.account.details.username}/lists`);
  }

  const handle_remove_film = (film) => {
    // remove film from added_films arr 
    
    let temp = [...added_films];
    const find = temp.indexOf(film);

    if(find > -1) temp.splice(find, 1); 
    set_added_films(temp); 
  }

  const handle_submit = (event) => {
    // create LIST, add each Item in added_films arr 

    event.preventDefault(); 


    const new_list = `https://api.themoviedb.org/3/list?api_key=${process.env.REACT_APP_API_KEY}`; 

    // body: name, desc, language, 
    // header 
  }



  return (
    <React.Fragment>
      <Header></Header>

      <Container>

        <form onSubmit={handle_submit}>
          <Group>
            <Label>Name of the List</Label>
            <Input style={{width: "50%"}} onChange={(event) => set_list_name(event.target.value)}></Input>
          </Group>

          <Group>
            <Label>Description</Label>
            <TextArea rows="6" onChange={(event) => set_list_desc(event.target.value)}></TextArea>
          </Group>


        <AddContainer>

          <div style={{display: "flex", marginLeft: "70%"}}>
            <Btn cancel onClick={handle_cancel}>Cancel</Btn>
            <Btn type="submit">Save</Btn>
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

const Group = styled.div`
  display: flex;
  flex-direction: column; 
  margin-bottom: 3%;  
`;

const Label = styled.label`
  padding-bottom: 2px; 
`; 

const TextArea = styled.textarea`
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

export const Btn = styled.div`
  background-color: ${props => props.cancel ? "#273038" : "#00B200"}; 
  border-radius: 8%;
  padding: 5px;
  //font-size: 1.0em;  
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