import React from "react"; 
import styled from "styled-components"; 
import GitHubIcon from "../icon/GitHub_Mark_Icon.png"; 

function Footer() {
  return (
    <Container>
      <p>Andreas G.'s react <a href="https://github.com/AndreasG9" target="__blank" style={{color: "#adadff", padding: "4px"}}>project</a>
      <Icon src={GitHubIcon} alt="GitHub Mark Icon"></Icon>. &nbsp; 
      Intended for my portfolio. Some of the layout and features cloned from Letterboxd.com. <br></br> 
      <div style={{marginLeft: "40%"}}>Film data from <a href="https://www.themoviedb.org/" target="__blank" style={{color: "#adadff", padding: "4px"}}>TMDB</a>. </div>
      </p>
    </Container>
  )
}

const Container = styled.footer`
  font-family: Roboto; 
  display: flex;
  justify-content: center;
  align-items: center; 
  background-color: #425566; 
  color: #e1e3e5;  
  height: 6.5rem;  
  width: 100%; 


  margin-top: auto; 
`; 

const Icon = styled.img`
  position: relative;
  top: 4px;
  margin: 0 6px 0 2px; 
`; 

export default Footer; 