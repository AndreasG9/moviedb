import React from "react"; 
import styled from "styled-components"; 

function BrowseBy() {
  // BrowseBy Popular, Rating, Genre, Year 
  // path home/popular , home/rating .... 

  // home/popular/this/month ... 

  return (
    <Container>
      <Label>BROWSE BY</Label>

      <Container2>
        {/* <Select>
          <Option hidden>POPULAR</Option>
          <Option>ALL TIME</Option>
          <Option>THIS YEAR</Option>
          <Option>THIS MONTH</Option>
          <Option>THIS WEEK</Option>
        </Select> */}
        <Select>
          <Option hidden>YEAR</Option>
          <Option>UPCOMING</Option>
          <Option>2020s</Option>
          <Option>2010s</Option>
          <Option>2000s</Option>
        </Select>

        <Select>
          <Option hidden>RATING</Option>
          <Option>HIGHESt FIRST</Option>
          <Option>LOWEST FIRST</Option>
        </Select>
        <Select>
          <Option hidden>GENRE</Option>
          <Option>ACTION</Option>
          <Option>ANIMATION</Option>
          <Option>COMEDY</Option>
          <Option>CRIME</Option>
          <Option>DRAMA</Option>
          <Option>HISTORY</Option>
          <Option>HORROR</Option>
          <Option>MYSTERY</Option>
          <Option>ROMANCE</Option>
          <Option>SCIENCE FICTION</Option>
          <Option>THRILLER</Option>
          <Option>WESTERN</Option>
          <Option>WAR</Option>
        </Select>
        </Container2>
    </Container>
  )
}

// Style 
const Container = styled.div`
  font-family: Roboto; 
  margin-top: 1%; 

  width: 700px;
  height: 50px; 
  
  position: relative;
  left: 24%; 
  display: flex; 
  align-items: center; 


`;

const Container2 = styled.div`
  position: relative; 
  left: 2%; 
  outline: 1px solid #5e6a76; 

  display: flex;
  align-items: center; 
`;

const Label = styled.label`
  color: #6f797d;
  font-size: .9rem; 
  
  &:hover{
    cursor: text; 
  }
`;

const Select = styled.select`
  font-family: Roboto; 
  font-size: 1.0rem; 
  background-color: #13181c; 
  color: #e1e3e5;
  padding: 5px; 
  width: 140px;
  text-indent: 10px; 
`;

const Option = styled.option`
  background-color: #8699aa; 
  color: #333; 
  text-align: center; 
  font-size: 1.1rem; 
  
`;

export default BrowseBy; 
