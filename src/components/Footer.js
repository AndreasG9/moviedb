import React from "react"; 

function Footer() {
  return (
    <footer style={footer_style}>
      <p>Andreas G. react <a href="https://github.com/AndreasG9">project</a>.&nbsp;
      Film data from <a href="https://www.themoviedb.org/">TMDB</a>. 
      </p>
    </footer>
  )
}

const footer_style = {
  color: "#a5a5a5",
  textAlign: "center",
  backgroundColor: "#4e4e4e",
}



export default Footer; 
