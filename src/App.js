import React, { useState, useEffect } from 'react';
import './App.css';
import Routes from "./Routes";
import { UserContext } from "./context/UserContext.js";
import axios from "axios"; 
import Footer from "./components/Footer"; 

function App(props) {

  // INIT state (dont want to get all user data each page refresh)
  let init_id = localStorage.getItem("session_id");
  init_id = init_id == null ? false : true; 

  let init_acc = localStorage.getItem("account"); 
  init_acc = init_acc == null ? {details: {}, favorites: [], ratings: [], watchlist: [], lists: [], update: false, active_nav: "", profile_details: {}} : JSON.parse(init_acc); 

  const [auth, set_auth] = useState(init_id); 
  const [account, set_account] = useState(init_acc); 


  useEffect( () => {

    const get_session = async () => {
      // only called when log in for the first time, will trigger context update to get all of a users data (from our server)
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

      let temp = {details: {}, user_data: {}, update:false, active_nav: ""}; 
     
      // details (from tmdb auth account details)
      const detail = `https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem("session_id")}`;
      let res = await axios.get(detail).catch((error) => console.log(error)); 
      temp.details = res.data; 

      // const id = temp.details.id; 
      // const session =  localStorage.getItem("session_id");

      // user_data (our api) including watchlist, ratings, etc ... 
      await axios.get(`/api/user/${res.data.username}`)
        .then(res => {
          temp.user_data = res.data;  
          console.log(res.data); 
        })
        .catch(err => {
          // add to collections (non-required data can be added in EDIT profile, account log for a film, etc...)

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


      localStorage.setItem("account", JSON.stringify(temp));
      set_account(temp);
      console.log(temp); 
  }

    if(account.update) update(); // update when sign in, or make change 

  }, [account.update]);

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