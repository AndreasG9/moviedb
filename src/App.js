import React, { useState, useEffect } from 'react';
import './App.css';
import Routes from "./Routes";
import { UserContext } from "./context/UserContext.js";
import axios from "axios"; 
import Footer from "./components/Footer"; 

function App(props) {

  // TODO use tmdb api for auth and data only. every other req. to our api 

  // own API (we get, post data when logged in and the path is user); 
   
  // INIT state (dont want to get all user data each page refresh)
  let init_id = localStorage.getItem("session_id");
  init_id = init_id == null ? false : true; 

  let init_acc = localStorage.getItem("account"); 
  init_acc = init_acc == null ? {details: {}, favorites: [], ratings: [], watchlist: [], lists: [], update: false, active_nav: "", profile_details: {}} : JSON.parse(init_acc); 

  const [auth, set_auth] = useState(init_id); 
  const [account, set_account] = useState(init_acc); 


  useEffect( () => {

    const get_session = async () => {
      // only called when log in for the first time, will trigger context update to get all of a users data 
      // get approved req. token from url

      const q_string = new URLSearchParams(window.location.search);
      const success = q_string.get("approved");
      
      if(success && (auth !== true)){
        // get session_id 

        const approved_req_token = q_string.get("request_token");

        const res = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`, {"request_token" : approved_req_token})
        .catch(error => console.log(error));
        

        if(res.data.success){
          console.log("SIGNED IN"); 
          localStorage.setItem("session_id", res.data.session_id); // persist if reload page  

          // update context 
          set_auth(true);  
          const temp ={...account};
          temp.update = true;
          set_account(temp);
        }
      }
    }

    get_session();

  }, [auth, account]); 


  useEffect( () => {
    // user just signed in, or updated something(rating, watchlist, etc...)

    const update = async () => {
      console.log("CHANGE"); 

      //let temp = {details: {}, favorites: [], ratings: [], watchlist: [], lists: [], update: false, active_nav: "", profile_details: {}}; 

      let temp = {details: {}, user_data: {}, update:false, active_nav: ""}; 
     
      // details (from tmdb auth account details)
      const detail = `https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}`;
      let res = await axios.get(detail).catch((error) => console.log(error)); 
      temp.details = res.data; 

      const id = temp.details.id; 
      const session =  localStorage.getItem("session_id");

      // user_data (our api) including watchlist, ratings, etc ... 
      await axios.get(`/api/user/${res.data.username}`)
      .then(res => {
        temp.user_data = res.data;  
        console.log(res.data); 
      })
      .catch(err => {
        // add to collections (non-required data can be added in EDIT profile)
        axios.post(`/api/user/add`, 
        {
          username: res.data.username,
          details: {
            location: "",
            bio: "",
            four_favs: []
          },
          watchlist: [],
          ratings: [],
          favorites: [],
          lists: []
        })
        .then(res => {
          temp.user_data = res.data;
          console.log("USER ADDED"); 
        })
        .catch(err => console.log(err)); 
      }); 


      // only get 1 page at a time, want all pages for context .... (even w/ excluding page param)

      // // ratings
      // let rated_movies = `https://api.themoviedb.org/3/account/${id}/rated/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}&sort_by=created_at.desc`;
      // res = await axios.get(rated_movies).catch((error) => console.log(error)); 

      // let arr = await get_data(res.data.total_pages, rated_movies);
      // temp.ratings = res.data.results.concat(arr); 
            
      // // fav movies 
      // let fav = `https://api.themoviedb.org/3/account/${id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}&language=en-US&sort_by=created_at.desc`;
      // res = await axios.get(fav).catch((error) => console.log(error)); 
      
      // arr = await get_data(res.data.total_pages, fav);
      // temp.favorites= res.data.results.concat(arr); 

      // // watchlist
      // let watch_list = `https://api.themoviedb.org/3/account/${id}/watchlist/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}&language=en-US&sort_by=created_at.desc`; 
      // res = await axios.get(watch_list).catch((error) => console.log(error)); 

      // arr = await get_data(res.data.total_pages, watch_list);
      // temp.watchlist = res.data.results.concat(arr); 

      // // lists 
      // let created_lists = `https://api.themoviedb.org/3/account/${id}/lists?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}&language=en-US&sort_by=created_at.desc`; 
      // res = await axios.get(created_lists).catch(error => console.log(error)); 

      // arr = await get_data(res.data.total_pages, created_lists);
      // temp.lists = res.data.results.concat(arr); 
      

      localStorage.setItem("account", JSON.stringify(temp));
      set_account(temp);
      
      console.log(temp); 
  }

    if(account.update) update(); // update when sign in, or make change 

  }, [account.update]);


  // helper
  const get_data = async (total_pages, req) =>{
    let temp = []; 
    let res;
    let page_num = 1; 

    for(let i=1; i<total_pages; ++i){
      ++page_num; 
      let request = req += `&page=${page_num}`; 
      res = await axios.get(request).catch((error) => console.log(error)); 
      temp = temp.concat(res.data.results); 
    }
 
    return temp; 
  }


  
  return (
    <div className="App">
      <UserContext.Provider value={{auth, set_auth, account, set_account}}>
        <Routes className="App" current_user={auth}></Routes>
      </UserContext.Provider>
      <Footer></Footer>
    </div>
  );
}

export default App;