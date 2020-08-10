import React, { useState, useEffect } from 'react';
import './App.css';
import Routes from "./Routes";
import { UserContext } from "./context/UserContext.js";
import axios from "axios"; 

function App() {

  // INIT state 
  let init_id = localStorage.getItem("session_id");
  init_id = init_id == null ? false : true; 

  let init_acc = localStorage.getItem("account"); 
  init_acc = init_acc == null ? {details: [], favorites: [], ratings: [], watchlist: [], lists: [], update: false, active_nacv: ""} : JSON.parse(init_acc); 

  const [auth, set_auth] = useState(init_id); 
  const [account, set_account] = useState(init_acc); 


  useEffect( () => {
    // user just signed in, or updated something(rating, watchlist, etc...)

    const update = async () => {
       
      console.log("CHANGE"); 
      let temp = {details: [], favorites: [], ratings: [], watchlist: [], lists: [], update: false, active_nav: ""}; 

      // details 
      const detail = `https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}`;
      let res = await axios.get(detail).catch((error) => console.log(error)); 
      temp.details = res.data; 

      const id = temp.details.id; 
      const session =  localStorage.getItem("session_id");

      // only get 1 page at a time, want all pages for context .... (even w/ excluding page param)

      // ratings
      let rated_movies = `https://api.themoviedb.org/3/account/${id}/rated/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}&sort_by=created_at.desc`;
      res = await axios.get(rated_movies).catch((error) => console.log(error)); 
      
      let arr = await get_data(res.data.total_pages, rated_movies);
      temp.ratings = res.data.results.concat(arr); 
            
      // fav movies 
      let fav = `https://api.themoviedb.org/3/account/${id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}&language=en-US&sort_by=created_at.desc`;
      res = await axios.get(fav).catch((error) => console.log(error)); 
      
      arr = await get_data(res.data.total_pages, fav);
      temp.favorites= res.data.results.concat(arr); 

      // watchlist
      let watch_list = `https://api.themoviedb.org/3/account/${id}/watchlist/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}&language=en-US&sort_by=created_at.desc`; 
      res = await axios.get(watch_list).catch((error) => console.log(error)); 

      arr = await get_data(res.data.total_pages, watch_list);
      temp.watchlist = res.data.results.concat(arr); 

      // lists 
      let created_lists = `https://api.themoviedb.org/3/account/${id}/lists?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}&language=en-US&sort_by=created_at.desc`; 
      res = await axios.get(created_lists).catch(error => console.log(error)); 

      arr = await get_data(res.data.total_pages, created_lists);
      temp.lists = res.data.results.concat(arr); 

      localStorage.setItem("account", JSON.stringify(temp));
      set_account(temp);
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
    <div>
      <UserContext.Provider value={{auth, set_auth, account, set_account}}>
        <Routes className="App"></Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;