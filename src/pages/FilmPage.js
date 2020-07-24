import React from "react"; 
import Header from "../components/Header"; 
import Film from "../components/Film/Film"; 

 function FilmPage( {movie_id} ) {
  // /film/movie-title-here
  // display a bunch of info, allow user to rate that specific film 

  return (
    <React.Fragment>

      <Header></Header>
      <Film movie_id={movie_id}></Film>

    </React.Fragment>
  )
}


export default FilmPage; 