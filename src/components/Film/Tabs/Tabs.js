import React, { useState } from "react";
import styled from "styled-components"; 
import CreditsTab from "./CreditsTab";
import DetailsTab from "./DetailsTab"; 

function Tabs( {credits}) {

  // const [active, set_active] = useState({
  //   // active tab 
  //   cast: true,
  //   crew: false,
  //   details: false,
  //   genres: false
  // });


  const [active_tab, set_active_tab] = useState("cast"); 


  function show_tab(tab){
    set_active_tab(tab);
  }




  function tab(){
    // probably a better way to do tabs ... 
    // credits componenet used twice, gave it a key so state not reused
    if(active_tab === "cast") return <CreditsTab credits={credits.cast} key="1"></CreditsTab>
    else if(active_tab === "crew") return <CreditsTab credits={credits.crew} key="2"></CreditsTab>
    else if(active_tab === "details") return <DetailsTab ></DetailsTab>
    else return <DetailsTab ></DetailsTab> 
  }


  return (
    <div>

      <Header>
        <Tab  onClick={ () => show_tab("cast") } autoFocus>CAST</Tab>
        <Tab  onClick={ () => show_tab("crew") }>CREW</Tab>
        <Tab  onClick={ () => show_tab("details") }>DETAILS</Tab>
        <Tab  onClick={ () => show_tab("genres") }>GENRES</Tab>
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
    color: #e1e3e5;
    border-bottom: 2px solid white;  
    
  }

  



  width: 50%;
  height: 15%; 

  background: none; 
  font-size: 1.3em; 
`;

const ActiveTab = styled.div`


`;






export default Tabs; 
