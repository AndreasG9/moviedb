import React, {useState} from "react";
import styled from "styled-components";
import { Input } from "../../Search/SearchBar"; 
import axios from "axios"; 


function SearchDropDown( {add_film, header} ) {

  const [results, set_results] = useState([]);
  const [active, set_active] = useState(false); 

  const get_search = async (event) => {
    // just page 1 results 

    if(event.target.value !== ""){
      const search = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false&query=${event.target.value}&page=1`; 
      const res = await axios.get(search); 
      set_results(res.data.results); 
      set_active(true); 
    }
  }

  function get_year(result){
    const year = result.release_date !== undefined ? result.release_date.substr(0, 4) : ""; 
    return year; 
  }

  const add_result = async (result) => {
    // relay selected film to form, to be added 
    add_film(result); 
    set_active(false); 
    document.getElementById("add-film").value=""; // clear 
  }

  function include_header(){
    if(header) return <Label>ADD FILMS</Label>;
  }


  const reset = () => {
    set_active(false); 
    document.getElementById("add-film").value="";
  }


  return (
    <Container>

      <div style={{display: "flex", flexDirection:"column", position: "relative"}}>
        {include_header()}
        <div style={{display: "flex", flexDirection:"row", width: "60%", alignItems: "center"}}>
          <Input placeholder="Enter the name of a film..." style={{width: "45%", fontSize: ".8em"}} onChange={get_search} id="add-film"></Input>
          <Close onClick={reset}>X</Close>
        </div>
      </div>

      <DropDown active={active}>
        {
          results.map( result => (
            <DropDownItem onClick={() => add_result(result)} key={result.id}>{result.title + " (" + get_year(result) + ")"}</DropDownItem>
          ))
        }
      </DropDown>
      
    </Container>
  )
}

// Style 
const Container = styled.div`
  margin-top: 2%; 
  color: #e1e3e5;
  font-size: 1.2em;
  font-family: Roboto;
`; 

const DropDown = styled.div`
  position: absolute; 

  display: ${(props => props.active ? "block" : "none")}; 
  background-color: #425566; 
  width: 527px;  
  height: 200px; 
  z-index: 9;
  border: 1px solid white; 
  overflow: auto; 
`; 

const DropDownItem = styled.div`
  font-size: .8em;
  padding: 2px; 

  &:hover{
    cursor: pointer;
    background-color: #00B200; 
  }
`; 

const Label = styled.label`
  background-color: #58a9b6; 
  padding: 5px; 
  text-align: center; 
  font-size: .8em; 
  margin: 2% 0; 
`; 

const Close = styled.div`

  margin-left: 5%; 
  padding: 5px; 

  &:hover{
    cursor: pointer;
    opacity: .2; 
  }
`;

export default SearchDropDown; 