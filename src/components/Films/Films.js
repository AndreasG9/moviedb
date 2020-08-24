import React, { useState, useEffect } from "react"; 
import styled from "styled-components";
import axios from "axios"; 
import FilmsResults from "./FilmsResults"; 
import { useLocation, useHistory } from "react-router-dom"; 

const DECADES = ["Upcoming", "2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s", "1950s", "1940s", "1930s", "1920s", "1910s", "1900s"];

function Films( ) {
  // base search off params (ex ../films?year=2010s&genre=crime   (will sort be default popularity descending))
  // first param is always ?sort_by=... with popularity.desc being the default 

  const history = useHistory(); 
  const location = useLocation(); 
  const search_params = new URLSearchParams(location.search); 

  if(!search_params.has("sort_by")) history.push("/films?sort_by=popularity.desc");  

  // // State 
  const [query_string, set_query_string] = useState(""); 
  const [year, set_year] = useState({});


  const [results, set_results] = useState([]);
  const [current_page, set_current_page] = useState(1); 
  const [total_results, set_total_results] = useState(0); 
  const [loading, set_loading] = useState(false); 
  const [genres, set_genres] = useState([]); 

  const [btn_active, set_btn_active] = useState({
    // prev and next buttons 
    prev: false,
    next: true
  });

  useEffect( () => {

    const get_genre_ids = async () => {
      const genre_req = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`; 
      const res = await axios.get(genre_req); 
      set_genres(res.data.genres);
    };

    get_genre_ids(); 

  }, []);


  useEffect( () => {

    const get_data = async () => {
      //console.log(location.search); 
      set_loading(true); 
      let request = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false&vote_count.gte=40&page=${current_page}`;

      let q_string = location.search;
      q_string = q_string.replace("?", "&"); // remove first param, for tmdb req. 

      request += q_string; 
      console.log(q_string); 
      const res = await axios.get(request); 
      
      if(res.status === 200){
        set_results(res.data.results); // display 72 posts a page? maybe less 
        set_total_results(res.data.total_results);
      }

      // reset page to 1 if any param changes 
      if(q_string !== query_string) set_current_page(1); 
      set_query_string(q_string); 
      set_loading(false); 
    }

    get_data(); 

  }, [current_page, location.search, query_string]); 


  
  function show_years(){
    // // horizontal list of buttons with a decade and its years 
 
    if(search_params.has("primary_release_date.gte") || search_params.has("primary_release_year")){
       return ( 
        <React.Fragment>{
          year.years.map( (year) => (
            <Year key={year} onClick={(event) => handle_year(year)}>{year}</Year>
          ))}
        </React.Fragment>
      )
    }
  }

  // re-render will new page request 
  const next = () => {
    set_current_page(current_page + 1); 

    if(current_page === Math.floor(total_results / 20)) set_btn_active({prev: true, next: false})
    else set_btn_active({prev: true, next: true}); 
  }

  const prev = () => {
    set_current_page(current_page - 1); 

    if(current_page === 2) set_btn_active({prev: false, next: true});
    else set_btn_active({prev: true, next: true}); 
  }


  // Modify search params 
  const handle_genre = (event) => {

    let selected = genres.find( (g) => g.name === event.target.value); 

    if(search_params.has("with_genres")){
      // replace existing genre
      search_params.delete("with_genres");

      if(selected !== undefined) search_params.append("with_genres", selected.id); 
    }

    else {
      if(selected !== undefined) search_params.append("with_genres", selected.id);  
    }
    

    history.push(`/films?${search_params.toString()}`); 
  }

  const handle_sorting = (event) => {
    //set_sort_by(event.target.value);

    search_params.delete("sort_by");
    const select = event.target.value;
    let param;

    if(select === "Highest First"){
      param = "vote_average.desc";

      // increment min vote count for "highest rated all time"
      search_params.delete("vote_count.gte");
      search_params.append("vote_count.gte", 200); 
    } 
    else if(select === "Lowest First") param = "vote_average.asc"; 
    else if(select === "Release Date Descending") param = "primary_release_date.desc"; 
    else if(select === "Release Date Ascending") param = "primary_release_date.asc"; 
    else if(select === "Popularity Ascending") param = "popularity.asc"
    else param = "popularity.desc"; 

    search_params.append("sort_by", param);  

    history.push(`/films/?${search_params.toString()}`); 
  }

  const handle_years = (event) => {
    // Decade or Upcoming 
    // if decade, fill years 

    let years_arr = []; 
    let visible = false; 

    if(event.target.value !== "Upcoming"){

      if(search_params.has("primary_release_date.gte")){
        // remove if changed decade
        search_params.delete("primary_release_date.gte");
        search_params.delete("primary_release_date.lte");
      }

      if(event.target.value !== "All") {
        // a decade 

        visible = true; 
        let a_year = parseInt(event.target.value.substring(0,4)); 
        years_arr.push(event.target.value); 
  
        for(let i=0; i<10; ++i){
          years_arr.push(a_year); 
          ++a_year; 
        }
  
        let year = a_year - 10; 
        let from = `${year}-01-01`;
        let to = `${10 + parseInt(year)}-01-01`;  
  
        search_params.append("primary_release_date.gte", from);
        search_params.append("primary_release_date.lte", to);
      }

      history.push(`/films?${search_params.toString()}`); 
    }
    
    else {} // upcoming TODO 


    set_year({
      selected: event.target.value,
      years: years_arr,
      visible: visible
    }); 
  }

  const handle_year = (selected_year) => {
    // // Specific year 

    if(search_params.has("primary_release_date.gte")) search_params.delete("primary_release_date.gte");
    if(search_params.has("primary_release_date.lte")) search_params.delete("primary_release_date.lte");
    if(search_params.has("primary_release_year")) search_params.delete("primary_release_year");


    if(isNaN(selected_year)){
      // include a decade 
  
      let year = selected_year.split("s")[0];
      let from = `${year}-01-01`;
      let to = `${10 + parseInt(year)}-01-01`;  

      search_params.append("primary_release_date.gte", from); 
      search_params.append("primary_release_date.lte", to); 
    }

    else search_params.append("primary_release_year", selected_year); 

    history.push(`/films?${search_params.toString()}`); 
  }

  const reset = () => {
    // remove all search params, set sort_by to populairty.desc 
    history.push(`/films?sort_by=popularity.desc`, {browseby: "genre", selected: "", genres: genres}); 

    document.getElementById("year-id").selectedIndex = 0; 
    document.getElementById("genre-id").selectedIndex = 0; 
    document.getElementById("sort-by-id").selectedIndex = 0; 
  }

  function get_filters(){
    // for visualization of current search query 

    // genre
    let g;
    if(search_params.has("with_genres")){
      let find = genres.find( (gen) => gen.id === parseInt(search_params.get("with_genres"))); 
      if(find !== undefined) g = find.name.toLowerCase();  
    }

    else g = "all" ;


    // year 
    let y;
    if(search_params.has("primary_release_date.gte")){
      // decade 
      const decade = search_params.get("primary_release_date.gte").split("-")[0];
      y = decade + "s"; 
    }

    else if(search_params.has("primary_release_year")) y = search_params.get("primary_release_year"); // specific year 
    else y = "all"; 

    
    // sort_by (popularity.desc is DEFAULT)
    const s = search_params.get("sort_by"); 


    return (
      <React.Fragment>
        <div>Year: {y}</div>
        <div>Genre: {g}</div>
        <div>Sort By: {s}</div>
      </React.Fragment>)
  }



  return (
    <Container className="media-width-50">

      <HeaderContainer>
        <div>FILMS</div>

        <div >
          <Select onChange={handle_years} id="year-id">
            <Option hidden>Year</Option>
            <Option>All</Option>
            {DECADES.map( (year) => (
              <Option key={year}>{year}</Option>
            ))}
          </Select>

          <Select onChange={handle_genre} id="genre-id">
            <Option hidden>Genre</Option>
            <Option>All</Option>
            {genres.map( (genre) => (
              <Option key={genre.id}>{genre.name}</Option> 
            ))}
          </Select>

          <Select onChange={handle_sorting} id="sort-by-id">
            <Option hidden>Sort by</Option>

            <Group label=" TMDB FILM POPULARITY">
                <Option>Popularity Descending</Option>
                <Option>Popularity Ascending</Option>
            </Group>

            <Group label="TMDB RATING (awful system)">
              <Option>Highest First</Option>
              <Option>Lowest First</Option>
            </Group>

            <Group label="RELEASE DATE">
              <Option>Release Date Descending</Option>
              <Option>Release Date Ascending</Option>
            </Group>
          </Select>
        </div>
      </HeaderContainer>


      <SearchResultContainer>
        <Header>There are {total_results} films matching your filters</Header>
        <Filters>
          {get_filters()}
          <ResetButton onClick={reset}>Reset</ResetButton>
        </Filters>
      </SearchResultContainer>



      <YearsContainer visible={year.visible}>
        {show_years()}
      </YearsContainer>


      <FilmsResults results={results} loading={loading}></FilmsResults>
    

       <ButtonsContainer>
        <Button active={btn_active.prev} onClick={prev}>Previous</Button>
        <Button active={btn_active.next} onClick={next}>Next</Button>
      </ButtonsContainer> 
      
    </Container>
  )
}

const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  font-family: Roboto; 
  color: #a5a5a5; 

  width: 48%; 
  margin-left: 24%; 

 @media only screen and (max-width: 1500px) {
    width: 90%; 
    margin-left: 5%;  
 }
`; 

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: flex-end;  
  border-bottom: 1px solid #a5a5a5;
  margin-top: 5%; 
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
  font-size: 1.0rem; 
`; 

const SearchResultContainer = styled.div`
  margin-left: 18%; 
  padding-top: 3.5%; 

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
  justify-content: center; 
  font-size: .8em; 
  white-space: nowrap;
`;

const ResetButton = styled.button`
  padding: 5px; 
  color: #a5a5a5;
  border-radius: 4px; 
  border: none; 
  background-color: #273038; 
  margin-top: 2%;

  &:hover{
    cursor: pointer; 
    color: #e1e3e5;
  }

  &:focus{
    outline: none; 
  }
`;

const YearsContainer = styled.div`
  transform: ${(props) => props.visible ? "scale(1)" : "scale(0)"};

  margin: 0 auto; 
  display: flex;
  flex-direction: row; 
  padding-bottom: 15px; 
`; 

const Year = styled.button`
  color: #a5a5a5;
  border: none;
  background-color: #1a2127; 
  outline: 2px solid #31383e; 
  font-size: 1.0em; 
  
  padding: 5px 20px;  

  &:hover{
    cursor: pointer; 
    color: #fff; 
  }

  &:focus{
    color: #fff; 
    background-color: #6f7d89; 
  }
`; 

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  border-top: 1px solid #a5a5a5; 
  padding-top: 2%; 
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

  transform: ${(props) => props.active ? "scale(1)" : "scale(0)"}; 

  &:hover{
    cursor: pointer;
    color: #e1e3e5;
  }

  &:focus{
    outline: none; 
  }
`;

export default Films; 