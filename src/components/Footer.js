import React from "react"; 
import styled from "styled-components"; 
import GitHubIcon from "../icon/GitHub_Mark_Icon.png"; 

function Footer() {
  return (
    <Container>
      <p>Andreas G.'s' react <a href="https://github.com/AndreasG9" target="__blank" style={{color: "#adadff", padding: "4px"}}>project</a>
      <Icon src={GitHubIcon} alt="GitHub Mark Icon"></Icon>. &nbsp;
      Intended for my portfolio. Some of the layout and features cloned (or attempted to) from Letterboxd.com. <br></br>
      Film data from <a href="https://www.themoviedb.org/" target="__blank" style={{color: "#adadff", padding: "4px"}}>TMDB</a>. 
      </p>
    </Container>
  )
}

const Container = styled.footer`
  font-family: Roboto; 
  
  height: 80px;

  color:  "#a5a5a5";
  text-align: center;
  background-color: #425566; 
  color: #e1e3e5;  

  position: absolute; 
  bottom: 0;
  left: 0; 
  right: 0; 
`; 

const Icon = styled.img`
  position: relative;
  top: 4px;
  margin: 0 6px 0 2px; 
`;



export default Footer; 
