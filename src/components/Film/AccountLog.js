import React, { useState, useContext } from "react"; 
import styled from "styled-components"; 
import axios from "axios"; 
import { UserContext, useUserContext, } from "../../context/UserContext.js";


function AccountLog( {result} ) {
  // if logged in can mark as watched/logged, give it a rating, and add film to the list 
  // if not logged in, display log in the log, rate, and add to list 

  const header = {
    "Content-Type" : "application/json;charset=utf-8"
    }

  const user = useContext(UserContext); 
  const { set_account } = useUserContext(); 
  const { account } = useContext(UserContext); 

  const found = user.account.ratings.find((movie) => movie.id === result.id);
  let rated = found !== undefined ? found.rating : 0; 

  const [rating, set_rating] = useState(rated); 
  const [update, set_update] = useState(false); 




  // const [log, set_log] = useState({
  //   is_favorite: false,
  //   is_rated: false,
  //   is_watchlist: false
  // }); 


  function display_context(){
    // have you already logged this film?  

    if(rated && !update){
      // to update rating, have to click X 
      return (
        <React.Fragment>
          <Title>Rated</Title>
          <form style={{display: "flex"}}>
            <ResetRating onClick={() => set_update(true)}>X</ResetRating>
              <span>{rated}</span>
            <Rating style={{pointerEvents: "none"}}>
              {[...Array(5)].map( (cirlce, i) => (
                <Circle 
                  key={i+1}
                  value={i+1}
                  rating={rated/2}>
                </Circle>
              ))}
            </Rating>
        </form>
      </React.Fragment>
      )
    }


    else if(update === true || !rated){ 
      // update existing or new rating
      return (
        <React.Fragment>
          <Title>Set Rating</Title>
          <form>
            <Rating onMouseLeave={() => set_rating(0)}>
              {[...Array(5)].map( (cirlce, i) => (
                <Circle 
                  key={i+1} 
                  rating={rating} 
                  value={i+1} 
                  onMouseEnter={() => set_rating(i+1)}
                  onClick={handle_rating}>
                </Circle>
              ))}
            </Rating>
        </form>
      </React.Fragment>
      )
    }

  }

  const handle_fav = () => {
    // POST mark as favorite or REMOVE 

   // const fav = `ttps://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`; 
   // body: media_type: movie media_id:  favorite: true 

  }

  const handle_watchlist = () => {
    // POST 
    //const watchlist = `ttps://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`; 
    // body media_type: movie media_id:  watchlist: true
  }


  const handle_rating = async () => {
    set_update(false);

    // POST rating to user's account 
    let session_id = localStorage.getItem("session_id");  
    const post_rating = `https://api.themoviedb.org/3/movie/${result.id}/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`;
    const scale_rating = rating * 2; 
    // add auth header w/ bearer token  TODO 
    const res = await axios.post(post_rating, 
      {
        "value": scale_rating 
      }, 
      header)
      .catch( (error) => console.log(error));  


    // tell app update context 
    let temp = {...account};
    set_account(temp); 
    temp.update = true; 
  }

  return (
    <Container>

      <Row>
        <Favorite onClick={handle_fav}>
          <Heart>&#x2764;</Heart>
          <Title>favorite</Title>
        </Favorite>

        <WatchList onClick={handle_watchlist}>
          <Clock></Clock>
          <Title>watchlist</Title>
        </WatchList>
      </Row>

      <Col> 
        {display_context()}
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

const ResetRating = styled.div`
  padding: 8px; 
  font-size: 1.4em; 
  
  &:hover{
    cursor: pointer;
    color: #fff;   
  }
  
`; 

const Rating = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 6%; 
  margin-top: 3%; 

  width: 165px;
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
