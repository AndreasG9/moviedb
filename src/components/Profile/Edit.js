import React, { useState, useContext } from "react";
import styled from "styled-components"; 
import { UserContext } from "../../context/UserContext"; 
import { Input } from "../Search/SearchBar"; 
import { Group, Label, TextArea, Btn } from "./Lists/NewEditList"; 
import SearchDropDown from "./Lists/SearchDropDown"; 
import Header from "../Header"; 


 function Edit() {

  // able to edit location, bio, four_fav films, which will be POST to our server along with their username 

  // get existing data if present 
  
  // init here 

  const user = useContext(UserContext); 

  const [location, set_location] = useState("");
  const [bio, set_bio] = useState("");
  const [four_fav, set_four_fav] = useState([]); 

  const get_username = () => {if(Object.keys(user.account.details).length !== 0) return user.account.details.username;}
  const get_img = () => {if(Object.keys(user.account.details).length !== 0) return user.account.details.avatar.gravatar.hash;}

  const add_film =  (film) => { 
    
    //    media_id: added_films[i].id

    if(four_fav.find(item => item.id === film.id) !== undefined) return;  
    let temp = [...four_fav];

    if(four_fav.length > 3) temp[3] = film; // MAX 4, replace most recent 
    else temp = temp.concat(film);

    set_four_fav(temp); 
  }

  const handle_remove_film = (film) => {
        
    let temp = [...four_fav];
    const find = temp.indexOf(film);

    if(find > -1) temp.splice(find, 1); 
    set_four_fav(temp); 
  }

  function get_year(result){
    const year = result.release_date !== undefined ? result.release_date.substr(0, 4) : ""; 
    return year; 
  }
 

  const handle_submit = (event) => {
    // POST 
    event.preventDefault(); 


  }


  return (
    <React.Fragment>

      <Header></Header>

      <Container>

        <form onSubmit={handle_submit}>

          <Title>{`Edit Profile - ${get_username()}`} </Title>
          
          <Group>
            <Label>Location</Label>
            <Input style={{width: "50%"}} onChange={(event) => set_location(event.target.value)} value={location}></Input>
          </Group>

          <Group>
            <Label>Bio</Label>
            <TextArea rows="6" onChange={(event) => set_bio(event.target.value)} value={bio} maxLength="500"></TextArea>
          </Group>


          <Group>
            <Label>4 Favorites</Label>
            <SearchDropDown  add_film={add_film} header={false}></SearchDropDown>

            
          {four_fav.map( film => (
            <AddedFilm key={film.id}>
              <div style={{display: "flex", alignItems: "center", margin: "1%"}}>
                <Poster src={`http://image.tmdb.org/t/p/w154${film.poster_path}`} alt="poster"></Poster>
                <div style={{marginLeft: "2%"}}>{film.title + " (" + get_year(film) + ")"}</div>
              </div>
              <RemoveFilm onClick={() => handle_remove_film(film)}>X</RemoveFilm>
            </AddedFilm>
          ))}
          </Group>

          <Group>
            <Btn type="submit" color={"#00B200"} style={{float: "right"}}>SAVE</Btn>
          </Group>

        </form>
      </Container>

    </React.Fragment>
  )
}


// Style 

const Container = styled.div`
  margin-top: 1%; 
  height: 100vh; 
  font-family: Roboto; 
  color: #a5a5a5; 
  width: 60%;
  margin-left: 24%; 
  margin-bottom: 10%; 

  @media only screen and (max-width: 1500px) {
    width: 75%; 
    margin: 2% 0 0 10%; 
  }
`; 


const Title = styled.div`  
  margin: 2% 0; 
  border-bottom: 1px solid #6f797d; 
  padding-bottom: 2px;  
`; 

const Poster = styled.img`
  display: block;
  border: 1px solid #a5a5a5;
  border-radius: 3%;
  margin-right: 2%; 
`;

const AddedFilm = styled.div`
  display: flex;
  flex-direction: column: 
  margin-top: 1%; 
  align-items: center;
   
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

export default Edit; 