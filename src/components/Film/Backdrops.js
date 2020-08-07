import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import styled from "styled-components";

 function Backdrops( {movie_id} ) {

  const [backdrops, set_backdrops] = useState([]); 

  const [active, set_active] = useState({
    left: false,
    right: true
  }); 

  const [current_index, set_current_index] = useState(0); 

  useEffect( () => {

    const get_data = async () => {
      const images = `https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${process.env.REACT_APP_API_KEY}`;
      const res = await axios.get(images);
      set_backdrops(res.data.backdrops); 
    }

    get_data();

  }, [movie_id]);


  const next = () => {
    set_current_index(current_index + 1); 

    if(current_index === backdrops.length-2) set_active({left: true, right: false}); 
    else set_active({left: true, right: true}); 
  }

  const prev = () => {
    set_current_index(current_index - 1); 

    if(current_index === 1) set_active({left: false, right: true}); 
    else set_active({left: true, right: true}); 
  }

  function get_count(){
    if(backdrops.length !== 0) return <Counter>{`${current_index+1} / ${backdrops.length}`}</Counter> 
    else return <Counter>{"No Available Backdrops"}</Counter>
  }


  function get_backdrop(){
    const current = backdrops[current_index]; 
    if(current !== undefined) return <BackDrop src={`https://image.tmdb.org/t/p/original/${current.file_path}`} alt="backdrop"></BackDrop>
  }

  function show(){
    if(backdrops.length !== 0){
      return (
        <BackDropsContainer>
        {get_count()}
        <Arrow active={active.left} onClick={prev}>{"<"}</Arrow>
        {get_backdrop()}
        <Arrow active={active.right} onClick={next} right>{">"}</Arrow>
        <Msg>OPEN IN NEW TAB TO VIEW IN ORIGINAL SIZE</Msg>
      </BackDropsContainer>
      )
    }
    else return <Msg>No Available Backdrops</Msg>; 
  }

  return (
    show()
  )
}

// Style 
const BackDropsContainer = styled.div` 
  margin-top: 5%; 
  border: 1px solid #a5a5a5;  

  position: relative; 
`;

const Arrow = styled.div`
  outline: none;
  border: none; 

  position: absolute; 
  top: 50%;

  right: ${(props) => props.right ? "0" : ""};

  opacity: ${props => props.active ? "1" : "0"}; 
  pointer-events: ${props => props.active ? "auto" : "none"}; 

  transition: .6s ease;
  color: #e1e3e5; 
  font-size: 2.5em; 
  padding: 15px; 
  font-weight: bold; 

  &:hover{
    cursor: pointer; 
    color: #e1e3e5;
    background-color: #151515; 
  }

  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
`;

const BackDrop = styled.img`
  width: 100%; // open in new tab to view original size of the image 
`;

const Counter = styled.div`
  position: absolute;
  color: #e1e3e5; 
  font-size: 1.4em;
  padding: 10px; 
`;

const Msg = styled.div`
  color: #e1e3e5; 
  margin: 1%;
  text-align: center; 
  font-family: Roboto; 
`;

export default Backdrops; 
