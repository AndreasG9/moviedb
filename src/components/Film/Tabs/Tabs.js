import React, { useState } from "react";
import styled from "styled-components"; 
import CreditsTab from "./CreditsTab";
import DetailsTab from "./DetailsTab"; 
import GenresTab from "./GenresTab"; 
import {v4 as uuidv4} from "uuid"; 

function Tabs( {credits, result}) {

  const [active, set_active] = useState({
    // active tab 
    cast: true,
    crew: false,
    details: false,
    genres: false
  });


  const [active_tab, set_active_tab] = useState("cast"); // show cast tab as default 


  function show_tab(tab){
    set_active_tab(tab);
    set_active({[tab]: true}); 
  }

  function tab(){
    // probably a better way to do tabs ... 
    // credits componenet used twice, gave it a key so state not reused

    if(active_tab === "cast") return <CreditsTab credits={credits.cast} key="1" autofocus></CreditsTab>; 
    else if(active_tab === "crew") return <CreditsTab credits={credits.crew} key="2"></CreditsTab>
    else if(active_tab === "details") return <DetailsTab result={result}></DetailsTab>
    else return <GenresTab genres={result.genres} key={uuidv4()}></GenresTab>
  }



  return (
    <div>
      <Header>
        <Tab  onClick={ () => show_tab("cast") }   active={active.cast}>CAST</Tab>
        <Tab  onClick={ () => show_tab("crew") }  active={active.crew}>CREW</Tab>
        <Tab  onClick={ () => show_tab("details") } active={active.details}>DETAILS</Tab>
        <Tab  onClick={ () => show_tab("genres") } active={active.genres}>GENRES</Tab>
      </Header>

      {tab()} 
    </div>
  )
}

const Header = styled.div`
  display: flex; 
  justify-content: space-between; 
`;

const Tab = styled.button`
  font-family: Roboto; 
  padding-bottom: 4px; 
  border: none;  

  color: #00dd61;
  border-bottom: 2px solid #333; 


  &:hover{
    cursor: pointer; 
    border-bottom: 2px solid #e1e3e5;  
    //padding-bottom: 2px; 
  }


  &:focus{
    outline: none; 
  }

  color: ${ (props) => props.active ? "#e1e3e5" : "#00dd61"}; 
  border-bottom: ${ (props) => props.active ? "2px solid white" : "2px solid #333"}; 

  width: 50%;
  height: 15%; 

  background: none; 
  font-size: 1.3em; 
`;







export default Tabs; 
