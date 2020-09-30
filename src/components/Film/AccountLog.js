import React, { useContext, useState } from "react"; 
import styled from "styled-components"; 
import axios from "axios"; 
import { UserContext, useUserContext, } from "../../context/UserContext.js";
import ReactTooltip from "react-tooltip";

function AccountLog( {result} ) {
  // if logged in can mark as watched/logged, give it a rating, and add film to the list 
  // if not logged in, display log in the log, rate, and add to list 
  // use of our API for POST/ PUT requests

  const user = useContext(UserContext); 
  const { set_account } = useUserContext(); 
  const { account } = useContext(UserContext); 

  const SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
  let found; 

  // is favorite 
  found = user.account.user_data.favorites.find((movie) => movie.id === result.id);
  let is_favorite = found !== undefined ? true : false; 

  // is on watchlist
  found = user.account.user_data.watchlist.find((movie) => movie.id === result.id);
  let is_on_watchlist = found !== undefined ? true : false; 

  // is rated
  found = user.account.user_data.ratings.find((movie) => movie.id === result.id);
  let is_rated = found !== undefined ? found.rating : "";


  // State 
  const [favorite, set_favorite] = useState(is_favorite); 
  const [watchlist, set_watchlist] = useState(is_on_watchlist); 
  const [rating, set_rating] = useState(is_rated); 


  function display_favorite_context(){
    // is this film added to your favorites 
    // regardless, clicking the fav region will result in the opposite reaction 

    let msg; 

    if(is_favorite) msg = "click to remove from favorites"; // already added 
    else msg = "click to add to favorites"; // not added 

    return (
      <React.Fragment>
        <ReactTooltip></ReactTooltip>
        <Favorite 
          onClick={() => handle_fav(!is_favorite)}
          data-tip={msg}  
          data-effect="solid"
          data-background-color="#425566" 
          data-text-color="#e1e3e5" 
          data-delay-show="100">
          <Heart active_fav={is_favorite} >&#x2764;</Heart>
          <Title>Favorite</Title>
        </Favorite>
      </React.Fragment>
    )
  }

  function display_watchlist_context(){

    let msg; 

    if(is_on_watchlist) msg = "click to remove from watchlist";
    else msg = "click to add to watchlist";

    return (
      <React.Fragment>
        <ReactTooltip></ReactTooltip>
        <WatchList
          onClick={() => handle_watchlist(!is_on_watchlist)}
          data-tip={msg}  
          data-effect="solid"
          data-background-color="#425566" 
          data-text-color="#e1e3e5" 
          data-delay-show="200">
          <Clock active={is_on_watchlist}></Clock>
          <Title>Watchlist</Title>
        </WatchList>
      </React.Fragment>
    )
  }

  function display_rating_context(){
    // have you already logged this film?  

    let title; 

    if(!is_rated) title = "Set Rating";
    else title = "Rated"

      return (
        <div>
          <Rating>
            <Title>{title}</Title>
            <Select onChange={handle_rating}>
              <Option hidden>{is_rated}</Option>
              {SCALE.map(val => (
                <Option key={val}>{val}</Option>
              ))}
            </Select>
          </Rating>
          {/* { is_rated ? <Remove>X</Remove> : "" } */}
        </div>
      )
  }

  const handle_fav = async (status) => {
    // will either add or remove film from favorites, managed in server 

    await axios.post(`/api/user/${user.account.details.username}/favorites`, {
      favorite: status,
      film: result
    })
      .then(res => {
        console.log(res); 

        set_favorite(status);
        let temp = {...account};
        temp.update = true; 
        set_account(temp);
      })
      .catch(err => console.log(err)); 
  }

  const handle_watchlist = async (status) => {

    await axios.post(`/api/user/${user.account.details.username}/watchlist`, {
      watchlist: status,
      film: result 
    })
      .then(res => {
        console.log(res); 

        set_watchlist(status); // T or F 
        let temp = {...account};
        temp.update = true; 
        set_account(temp);

      })
      .catch(err => {
        console.log(err)
      }); 

  }

  const handle_rating = async (event) => {
    // POST rating to user's account (will either add film + rating, or update rating for a film)

    const film = {
      id: result.id,
      title: result.title,
      release_date: result.release_date,
      poster_page: result.poster_path,
      rating: event.target.value 
    }

    await axios.post(`/api/user/${user.account.details.username}/ratings`, {
      film: film
    })
    .then(res => {
      console.log(res.data); 

      let temp = {...account};
      temp.update = true; 
      set_account(temp);
    })
    .catch(err => {
      console.log(err)
    }); 
  }

  const handle_list = async (event) => {
    const id = event.target.value; 

    // const get_list = `https://api.themoviedb.org/3/list/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

    // // check if already added to that specific list 
    // const res = await axios.get(get_list); 
    // const found = res.data.items.find(item => item.id === result.id); 

    // if(found) alert("film already added to that list"); 

    // else{
    //   const add_to_list = `https://api.themoviedb.org/3/list/${id}/add_item?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}`;

    //   await axios.post(add_to_list, {
    //     "media_id": result.id
    //   }, 
    //   header).catch( (error) => console.log(error));  

    // window.location.reload(false); 
    // }
  }


  return (
    <Container>

      <Row>
        {display_favorite_context()}
        {display_watchlist_context()}
      </Row>

      <Col> 
        {display_rating_context()}
      </Col>

      <AddList>
        <Select smaller onChange={handle_list}>
          <Option hidden value="title">Add to a list...</Option>
          {user.account.user_data.lists.map(list => (
            <Option value={list.id} key={list.id}>{list.name}</Option>
          ))}
        </Select>
      </AddList>

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
  height: 230px; 

  color: #a5a5a5; 
  border: 1px solid white; 
`;

const Row = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: center;
  align-items: center; 
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
  margin-top: 10%; 
  font-size: 3em; 

  // red if favorited  
  color: ${props => props.active_fav ? "#FF0000" : "#e1e3e5"};
  opacity: ${props => props.active_fav ? "1" : ".1"}; 
`; 

const WatchList = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between; 
  align-items: center; 
  height: 80%;
  margin-top: 8.5%;  

  &:hover{
    cursor: pointer; 
    color: #e1e3e5; 
  }
`;

const Clock = styled.div`
  width: 40px;
  height: 40px; 
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

  background-color: ${props => props.active === true ? "#003366" : ""}; 
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  margin-bottom: 5%; 
`; 

const AddList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
`; 
const Select = styled.select`
  font-family: Roboto; 
  font-size: 1.0rem; 
  background-color: #13181c; 
  color: #e1e3e5;
  padding: 8px;  
  font-size: ${props => props.smaller ? ".9em" : "1.2em"}; 
  border-radius: 4px;
  border: 1px solid black; 

  &:hover{
    color: #adadff;
    cursor: pointer; 
  }

  &:focus{
    outline: none; 
  }
`;

const Option = styled.option`
  background-color: #8699aa; 
  color: #333; 
  font-size: 1.3rem; 
`; 

const Remove = styled.div`

position: absolute; 
top: 20%; 
 
//margin-left: 60%; 
//font-size: 1.5em;
//border: 1px solid white; 

&:hover{
  color: #adadff;
  cursor: pointer; 
}
`; 

export default AccountLog; 