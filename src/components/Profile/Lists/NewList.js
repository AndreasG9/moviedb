import React, {  useEffect, useState } from "react";
import styled from "styled-components"; 
import axios from "axios"; 
import { Input } from "../../Search/SearchBar"; 
import Header from "../../Header"; 
import SearchDropDown from "./SearchDropDown"; 


function NewList() {

  // ONE PAGE ONE PAGE

  // INPUT: NAME LIST, DESC. 
  // private -- NEEDS access token 
  // (SEARCH DROP DOWN COMP) (POSTER, MOVIE TITLE, and YEAR)
  // CHOOSE IMAGE

  const [list_name, set_list_name] = useState("");
  const [list_desc, set_list_desc] = useState(""); 
  const [added_films, set_added_films] = useState(""); 

  const header = {
    "Content-Type" : "application/json;charset=utf-8"
  }


  useEffect( () => {



  }, []);

  const handle_submit = (event) => {
    event.preventDefault(); 

    console.log(list_name);
    console.log(list_desc); 

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
            <Btn cancel>Cancel</Btn>
            <Btn type="submit">Save</Btn>
          </div>

          <SearchDropDown></SearchDropDown>
          <AddedItems></AddedItems>
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
  height: 100px; 
  width: 300px; 

  margin-left: 13%; 
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

export default NewList; 