import React, { useState, useContext } from "react"; 
import styled from "styled-components"; 
import axios from "axios"; 
import { UserContext } from "../../context/UserContext.js";


function AccountLog( {result} ) {
  // if logged in can mark as watched/logged, give it a rating, and add film to the list 
  // if not logged in, display log in the log, rate, and add to list 

  const user = useContext(UserContext); 


  //const [input, set_input] = useState(0); 
  const [rating, set_rating] = useState(0); 



  const test = async (event) => {
    // test POST request 
    event.preventDefault();

    // const testing = await axios.post(rate_req, {
    //   "value" : 10 
    // });

    // console.log(testing); 
  }

  const handle_rating = async () => {
    // POST rating to user's account 
    let session_id = ""; 
    const post_rating = `https://api.themoviedb.org/3/movie/${result.id}/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`;
    const scale_rating = rating * 2; 


    // add auth header w/ bearer token 
    const header = {
      "Content-Type" : "application/json;charset=utf-8"
    }

    const res = await axios.post(post_rating, 
      {
        "value": scale_rating 
      }, 
      header)
      .catch( (error) => console.log(error));  
  }

  return (
    <Container>

      <Row>
        <Favorite>
          <Heart> &#x2764;</Heart>
          <Title>favorite</Title>
        </Favorite>

        <WatchList>
          <Clock></Clock>
          <Title>watchlist</Title>
        </WatchList>
      </Row>

      <Col>
        <Title>Rate (base 5)</Title>
        
        <form>
          <Rating onMouseLeave={() => set_rating(0)}>
            {[...Array(5)].map( (cirlce, i) => (
              <Circle 
                key={i+1} 
                rating={rating} 
                value={i+1} 
                onMouseEnter={() => set_rating(i+1)}
                onClick={handle_rating} >
              </Circle>
            ))}
          </Rating>
        </form>

      </Col>

      <Row>

        Add to a list...
      </Row>

    </Container>
  )
}

// Style

const Container = styled.div`
  font-family: Roboto; 
  background-color: #425566; 

  display: flex;
  flex-direction: column;
  justify-content: space-around; 

  border-radius: 3%;
  color: #e1e3e5; 
  z-index: 1; 
  margin-right: 2%; 

  width: 350px;
  height: 200px; 

  color: #a5a5a5; 
`;

const Row = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: center;
  border-bottom: 1px solid #333;  
`; 

const Col = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center; 

  border-bottom: 1px solid #333;  
`; 

const Title = styled.div`
  padding: 5px;  
`; 

const Favorite = styled.div`
  margin-right: 20%; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 

  &:hover{
    cursor: pointer; 
    color: #e1e3e5; 
  }
`; 

const Heart = styled.div`
  // red if favorited  

  margin-top: 10%; 
  font-size: 3em; 
 // color: transparent; // FIX 
  opacity: .1; 

  &:hover{
    color: red;  
    opacity: 1; 
  }
`; 

const WatchList = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  margin-top: 1%; 

  &:hover{
    cursor: pointer; 
    color: #e1e3e5; 
  }

`;

const Clock = styled.div`
  width: 40px;
  height: 40px; 
  background-color: transparent; // FIX  light blue if added 
  
  border-radius: 50%;  
  border: 1px solid #e1e3e5;

  position: relative;

  &::before{
    content: "";

    height: 17px;
    width: 1px;
    background-color: #e1e3e5;
    position: absolute;
    top: 10%; 
    left: 50%; 
  }
  &::after{
    content: "";
    height: 10px;
    width: 1px;
    background-color: #e1e3e5;
    position: absolute;
    top: 37.8%; 
    left: 64%;  
    transform: rotate(90deg);
  }
`;

const Rating = styled.div`
  display: flex;
  flex-direction: row;
  width: 9vh; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 6%; 
  margin-top: 3%; 
`; 

const Circle = styled.div`
  height: 25px;
  width: 25px; 
  border: 2px solid #e1e3e5;

  // border-right: ${(props) => props.left ? "none" : "2px solid #e1e3e5"};
  // border-left:  ${(props) => props.left ? "2px solid #e1e3e5" : "none"};
  // border-radius: ${(props) => props.left ? "50% 0 0 50%" : "0 50% 50% 0"}; 
  // margin-right: ${(props) => props.left ? "" : "1.5%"}; 

  border-radius: 50%; 

  transition: 150ms; 
  
  &:hover{
    cursor: pointer; 
  }

  background-color: ${(props) => props.rating >= props.value ? "#CCAC00" : ""}; // based on state 
`; 

export default AccountLog; 
