import React from 'react'

function FilmResult( {result} ) {
  // search for a movie, each result is composed of this component 
  
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

  function get_director(){
    return "David Byrne"; 
  }

  return (
    <div>

      <div style={result_style}>
        {/* {Testing, will first display title and poster} */}
        <img src={path} alt="POSTER MISSING" style={img_style} className="hover-green"></img>

        <div style={title_year_container}>
          <h3 style={title_style} className="hover-blue">{result.title}</h3>
          <h3 style={year_style} className="hover-blue">{get_year()}</h3>

          <div style={line_break}></div>

          <div style={director_container}>
            <h3 style={directed_by_style}>Directed By</h3>
            <h3 style={director_style} className="hover">{get_director()}</h3>
          </div>
        </div>

      </div>


    </div>
  )
}




const result_style = {
  borderTop: "1px solid #a5a5a5",
  display: "flex",
  flexDirection: "row",
}

const img_style = {
  display: "block",
  border: "1px solid #a5a5a5",
  borderRadius: "3%",
  margin: "10px",
  width: "156px",
  height: "231px",

}


const title_year_container = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  height: "35%",
  margin: "5px"
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
  marginRight: "10px",
  marginTop: "14%"
}

const director_style = {
 backgroundColor: "#273038",
 borderRadius: "10%",
 padding: "5px"
}




export default FilmResult; 
