import React, {useState} from "react";
import styled from "styled-components";
import { Input } from "../../Search/SearchBar"; 
import axios from "axios"; 


function SearchDropDown() {


  const [query, set_query] = useState("");
  const [results, set_results] = useState([]);
  const [active, set_active] = useState(false); 

  const get_search = async (event) => {
    // just page 1 results 

    const search = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false&query=${event.target.value}&page=1`; 
    const res = await axios.get(search); 
    set_results(res.data.results); 
    set_active(true); 
  }

  function get_year(result){
    const year = result.release_date !== undefined ? result.release_date.substr(0, 4) : ""; 
    return year; 
  }

  // onMouseLeave={() => set_active(false)}

  return (
    <Container>

      <div style={{display: "flex", flexDirection:"column", position: "relative", }}>
        <Label>ADD FILMS</Label>
        <Input placeholder="Enter the name of a film..." style={{width: "45%", fontSize: ".8em"}} onChange={get_search} ></Input>
      </div>

      <DropDown active={active}>
      {
        results.map( result => (
          <DropDownItem>{result.title + " (" + get_year(result) + ")"}</DropDownItem>
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
  display: block; 
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
  background-color:  #00B200; 
  padding: 5px; 
  text-align: center; 
  font-size: .8em; 
  margin-bottom: 2%; 
  opacity: .8; 
`; 

const Results = styled.div`
  border: 1px solid white;
  font-size: .5em ;

`;

const Result = styled.div`

`; 





export default SearchDropDown; 