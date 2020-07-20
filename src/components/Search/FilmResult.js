import React, { useEffect, useState } from "react";
import styled from "styled-components"; 
import axios from "axios"; 

function FilmResult( { result } ) {
  // search for a movie, each result is composed of this component 

  const [directors, set_directors] = useState([]);

  useEffect( () => {
    const get_directors = async () => {
      // director is available under cast in the credits request 
  
      let directors = []; // could have more than 1 director 
      let credits = `https://api.themoviedb.org/3/movie/${result.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`; 
  
      let data = await axios.get(credits); 
      const crew = data.data.crew; 
  
      crew.forEach( (person) => {
        if(person.job === "Director") directors.push(person.name); 
      })
      
      //console.log(directors);
      set_directors(directors); 
    }

    get_directors(); 

  }, [result.id]);



  // MOVE TO SEPERATE FILE! 
  // for api poster, need base url, file size, and file path 
  const base = "https://image.tmdb.org/t/p";
  const size = "/w200/";
  const poster_path = result.poster_path; 
  //const backdrop_path = result.backdrop_path; 
  let path = ""; 
  path = base + size + poster_path; 

  
  function get_year(){
    const year = result.release_date.substr(0, 4); 

    if(year.length === 4) return year;
    else return result.release_date; 
  }


  return (
    <div>
      <Container style={result_style}>
        <Poster src={path} alt="POSTER MISSING"></Poster>

        <ContainerInfo>
          <h3 style={title_style} className="hover-blue">{result.title}</h3>
          <h3 style={year_style} className="hover-blue">{get_year()}</h3>

          <div style={line_break}></div>

          <DirectorContainer>
            <DirectedBy>Directed By</DirectedBy>
            {
              directors.map( (director) => (
                <h3 style={director_style} className="hover">{director}</h3>
              ))
            }
          </DirectorContainer>

        </ContainerInfo>

      </Container>

    </div>
  )
}


// Style 
const Container = styled.div`
  border-Top: 1px solid #a5a5a5;
  display: "flex";
  flex-direction: row;
`;

const Poster = styled.img`
  display: block;
  border: 1px solid #a5a5a5;
  border-radius: 3%;
  margin: 10px;
  width: 156px;
  height: 231px; 

  &:hover{
    cursor: pointer;
    border: 4px solid #98fb98 !important;
    margin: 7px !important;
  }
`;

const ContainerInfo = styled.div`
  display: flex; 
  align-items: center;
  flex-wrap: wrap;
  height: 35%;
  margin: 5px;
`; 


const DirectorContainer = styled.div`
  display: flex; 
  flex-direction: row;
  color: #a5a5a5;
  margin-top: 25%; 
`;

const DirectedBy = styled.h3`
  font-size: .9em;
  margin-right: 10px;
  margin-top: 14%; 
`;







/* 



const director_style = {
 backgroundColor: "#273038",
 borderRadius: "10%",
 padding: "5px"
}

*/



const result_style = {
  borderTop: "1px solid #a5a5a5",
  display: "flex",
  flexDirection: "row",
}


const title_style = {
  color: "#e1e3e5",
  padding: "3px", 
  fontSize: "1.2em"
}

const year_style = {
  marginLeft: "10px", 
  color: "#a5a5a5",
}

const line_break = {
  width: "100%"
}
const director_container = {
  display: "flex",
  flexDirection: "row",
  // border: "2px solid green",
  color: "#a5a5a5",
  marginTop: "25%",
}

const directed_by_style = {
  fontSize: ".9em",
  marginRight: "12px",
  marginTop: "14%"
}

const director_style = {
 backgroundColor: "#273038",
 borderRadius: "10%",
 padding: "5px"
}




export default FilmResult; 
