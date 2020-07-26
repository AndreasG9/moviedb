import React, { useState } from "react"; 
import styled from "styled-components";
import axios from "axios"; 

function Films( {browseby, selected} ) {
  // ex. .../films/genre/crime 
  // DEFAULT sorted by popularity all time


  const [pages, set_pages] = useState({
    current_page: 1,
    posts_per_page: 100
  });


  

  return (

    <Container>

      <FiltersContainer>
        <Select>
          <Option>DECADE</Option>
        </Select>
      </FiltersContainer>

      <SearchResultHeader>Ex. there are xxxx GENRE HERE films</SearchResultHeader>

      <FilmsContainer>
      </FilmsContainer>

      <ButtonsContainer>
        <Button>Next</Button>
        <Button>Previous</Button>
      </ButtonsContainer>
      
    </Container>
  )
}

const Container = styled.div`
  display: flex; 
  flex-direction: column; 
`; 

const FiltersContainer = styled.h2`
  display: flex;
  flex-direction: row; 
`;

const Select = styled.select`
`;

const Option = styled.option`

`; 


const SearchResultHeader = styled.div`

`;

const FilmsContainer = styled.div`

`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row; 
`; 

const Button = styled.button`

`;

export default Films; 
