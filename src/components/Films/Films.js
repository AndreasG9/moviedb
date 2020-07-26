import React, { useState, useEffect } from "react"; 
import styled from "styled-components";
import axios from "axios"; 
import FilmsResults from "./FilmsResults"; 

function Films( {browseby, selected} ) {
  // ex. .../films/genre/crime 
  // DEFAULT sorted by popularity all time

  const GENRES = ["ACTION", "ADVENTURE", "ANIMATION", "COMEDY", "CRIME", "DOCUMENTARY", "DRAMA", "FAMILY", "FANTASY", "HORROR", "MUSIC", "MYSTERY", "ROMANCE", "SCIFI", 
                  "TV MOVIE", "THRILLER", "WAR", "WESTERN"]; 
  const YEARS = ["UPCOMING", "2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s", "1950s", "1940s", "1930s", "1920s", "1910s", "1900s"]; 

  

  const test_id = 80; 

  const decade = selected === "year" ? "DECADE" : "ALL"; 
  const genre = browseby === "genre" ? selected : "ALL"; 
  const SORT_BY_DEFAULT_STRING = "TMDB RATING"; 

  const SORT_BY_DEFAULT_PARAM = `&sort_by=vote_average.desc`; 
  // const SORT_BY_RATING_HIGH = "&sort_by=vote_average.desc";
  //const SORT_BY_RATING_LOW = "&sort_by=vote_average.as";
  //const include_genre = ``;

  const [results, set_results] = useState([]);

  const [pages, set_pages] = useState({
    current_page: 1,
    posts_per_page: 40,
    total_results: 0
  });

  const [current_page, set_current_page] = useState(1); 
  const [loading, set_loading] = useState(false); 
  //const posts_per_page = 20; 

  const [active, set_active] = useState({
    left: false,
    right: true
  });


  useEffect(  () => {

    const get_data = async () => {
      set_loading(true);
      const request = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${current_page}&vote_count.gte=50&with_genres=80`; 
      const res = await axios.get(request); 

      set_pages({
        current_page: 1,
        posts_per_page: 20,
        total_results: res.data.total_results
      }); 

      set_results(res.data.results); // display 72 posts a page? maybe less 
      set_loading(false); 
    }

    get_data();

  }, [current_page]); 


  // re-render will new page request 
  const next = () => {
    set_current_page(current_page + 1); 

    // if(current_page === 4){
    //   // disable pointer event, change opacity 
    //   setActive({left: true, right: false}); 
    // }

    // else{
    //   // gets called multiple times but its fine 
    //   setActive({left: true,right: true})
    // }

  }

  const prev = () => {
    set_current_page(current_page - 1); 

    // if(currentPage === 2)setActive({left: false, right: true});
    // else setActive({left: true, right: true}); 
  }

  return (

    <Container>

      <HeaderContainer>
        <Title>FILMS</Title>

        <FiltersContainer>
          <Select>
            <Option hidden>{decade}</Option>
            <Option>ALL</Option>
          </Select>

          <Select>
            <Option hidden>{genre}</Option>
            <Option>ACTION</Option>
          </Select>

          <Select>
            <Option hidden>Sort by: {SORT_BY_DEFAULT_STRING}</Option>

              <Group label="TMDB RATING">
                <Option>Highest First</Option>
                <Option>Lowest First</Option>
              </Group>

              <Group label="FILM POPULARITY">
                <Option>All Time</Option>
                <Option>This Year</Option>
                <Option>This Month</Option>
                <Option>This Week</Option>
              </Group>

              <Group label="RELEASE DATE">
                <Option>Newest First</Option>
                <Option>Earliest First</Option>
              </Group>
          </Select>

        </FiltersContainer>
      </HeaderContainer>

      <SearchResultContainer>
        <Header>There are {pages.total_results} films matching your filters</Header>
        <Filters>
          <Filter>YEAR: {decade}</Filter>
          <Filter>GENRE: {genre}</Filter>
          <Filter>Sort By: {"TMDB RATING HIGHEST FIRST"}</Filter>
        </Filters>
      </SearchResultContainer>


      
      <FilmsResults results={results} loading={loading}></FilmsResults>
     


      <ButtonsContainer>
        <Button active={active} onClick={prev}>Previous</Button>
        <Button active={active} onClick={next}>Next</Button>
      </ButtonsContainer>
      
    </Container>
  )
}

const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  font-family: Roboto; 
  border: 2px solid black; 
  color: #a5a5a5; 

  width: 60%; 
  margin: 0 auto; 
`; 

const HeaderContainer = styled.h2`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: flex-end; 
  font-size: 1.1em; 
  border-bottom: 1px solid #a5a5a5;
`;

const FiltersContainer = styled.div`
  
`;

const Title = styled.div` 
 
`; 

const Select = styled.select`
  font-family: Roboto;
  
  background-color: #13181c; 
  color: #e1e3e5;
  padding: 5px; 

  &:hover{
    color: #adadff;
  }

  &:focus{
    outline: none; 
  }

`;

const Group = styled.optgroup`
  font-size: 1.1em;
  background-color: #13181c; 
  color: #adadff;
`; 

const Option = styled.option`
  background-color: #8699aa; 
  color: #333; 
`; 

const SearchResultContainer = styled.div`
  //margin: 0 auto; 
  margin-left: 18%; 
  padding: 1% 0 2% 0; 

  display: flex; 
  flex-direction: row; 
  align-items: center; 
`;

const Header = styled.div`
  margin-right: 2%; 
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  font-size: .8em; 
  white-space: nowrap;
`;

const Filter = styled.div`
`; 

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  border-top: 1px solid #a5a5a5; 
`; 

const Button = styled.button`
  color: #a5a5a5;
  border-radius: 4px; 

  padding: 10px;  
  width: 8%;

  text-align: center; 
  border: none; 
  background-color: #273038; 
  margin-top: .5%; 

  &:hover{
    cursor: pointer;
    color: #e1e3e5;
  }

  &:focus{
    outline: none; 
  }
`;

export default Films; 
