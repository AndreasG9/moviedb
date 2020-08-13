import React, {  useState, useContext, } from "react";
import styled from "styled-components"; 
import axios from "axios"; 
import { Input } from "../../Search/SearchBar"; 
import Header from "../../Header"; 
import SearchDropDown from "./SearchDropDown"; 
import { useHistory, } from "react-router-dom"; 
import { useUserContext, UserContext } from "../../../context/UserContext"; 


function NewList() {  

  // ONE PAGE ONE PAGE



  const history = useHistory(); 
  const user = useContext(UserContext); 

  const { set_account } = useUserContext(); 
  const { account } = useContext(UserContext); 

  const [list_name, set_list_name] = useState("");
  const [list_desc, set_list_desc] = useState(""); 
  const [added_films, set_added_films] = useState([]); 
 // const [block, set_block] = useState(true);


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
    //console.log(temp); 
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

  const handle_submit = async (event) => {
    // create LIST, add each item in the added_films arr 

    event.preventDefault(); 


    if(list_name.trim() === "") {
      // only required input 
      alert("Name of List required"); 
      return; 
    }


    let res = await axios.post(`https://api.themoviedb.org/3/list?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}`, 
      {
        "name": list_name,
        "description": list_desc,
        "language": "en"
      }).catch(error => console.log(error)); 

    if(res === undefined) return; 

    if(res.data.success){
      // add items to recently created list 

     const list_id = res.data.list_id; 

      for(let i=0; i<added_films.length; ++i){

        res = await axios.post(`https://api.themoviedb.org/3/list/${list_id}/add_item?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}`, 
          {
            media_id: added_films[i].id
          }).catch(error => console.log(error));  
      }
    }

    
    //UPDATE CONTEXT FOR APP 
    let temp = {...account};
    temp.update = true;
    set_account(temp);

    // go to user lists to see update 
    history.push(`/user/${user.account.details.username}/lists`);
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

export const AddedItems = styled.div`
  border: 1px solid blue;
  margin-top: 1%; 
`; 

export const Btn = styled.button`
  background-color: ${props => props.cancel ? "#273038" : "#00B200"}; 
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