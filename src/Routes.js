import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"; 
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage"; 
import FilmPage from "./pages/FilmPage"; 
import FilmsPage from "./pages/FilmsPage"; 
import PersonPage from "./pages/PersonPage"; 
import ProfilePage from "./pages/User/ProfilePage.js";
import UserFilmsPage from "./pages/User/UserFilmsPage.js";  
import UserListsPage from "./pages/User/UserListsPage.js";  
import Error from "./pages/Page404"; 
import NewEditList from "./components/Profile/Lists/NewEditList"; 
import EditProfile from "./components/Profile/Edit"; 
import Films from "./components/Films/Films";



const Routes = ( { current_user } ) => (
    <Router>
      <Switch>

      <Route exact path="/" component={Home}></Route>
      
      <Route
        path="/search" 
        render = { (props) => {
          if(props.location.state !== undefined) return <SearchPage query={props.location.state.query} key={props.location.state.query}></SearchPage>
          else return <SearchPage query={undefined}></SearchPage>
        }}>
      </Route>

      <Route
        path="/film/:film_id"
        render = { (props) => {
          if(props.location.state !== undefined) return <FilmPage movie_id={props.location.state.movie_id}></FilmPage>
          else return <FilmPage movie_id={undefined}></FilmPage> // opened Link in new tab, read from URL q_string 
        }}> 
      </Route>

      <Route
        path="/films"
        component={FilmsPage}> 
      </Route>

      <Route
        path="/person"
        render = { (props) => {
          if(props.location.state !== undefined) return <PersonPage credit={props.location.state.credit}></PersonPage>
          else return <PersonPage credit={undefined}></PersonPage>
        }}>
      </Route>
 
      <Route
        exact path="/user/:username"
        render = { () => !current_user ? 
         (<Redirect to="/"></Redirect>) : (<ProfilePage></ProfilePage>)}> 
      </Route>

      <Route
        path="/user/:username/edit"
        render = { () => !current_user ? 
          (<Redirect to="/"></Redirect>) : (<EditProfile></EditProfile>)}> 
      </Route>

      <Route
        path="/user/:username/watchlist"
        render = { () => !current_user ? 
          (<Redirect to="/"></Redirect>) : (<UserFilmsPage></UserFilmsPage>)}> 
      </Route>

      <Route
        path="/user/:username/ratings"
        render = { () => !current_user ? 
          (<Redirect to="/"></Redirect>) : (<UserFilmsPage></UserFilmsPage>)}> 
      </Route>

      <Route
        path="/user/:username/favorites"
        render = { () => !current_user ? 
          (<Redirect to="/"></Redirect>) : (<UserFilmsPage></UserFilmsPage>)}> 
      </Route>


      <Route 
        path="/user/:username/list/:list/edit" 
        render = { (props) => !current_user ? 
          (<Redirect to="/"></Redirect>) : 
          (<NewEditList
            list={props.location.state.list}>
          </NewEditList>)}> 
      </Route>

      
      <Route
        path="/user/:username/list/new"
        render = { () => !current_user ? 
          (<Redirect to="/"></Redirect>) : 
          (<NewEditList>
          </NewEditList>)}>  
      </Route>

      {/* (<Redirect to="/"></Redirect>) : (<UserFilmsPage></UserFilmsPage>)}>  */}

      <Route 
        path="/user/:username/list/:list" 
        render = { (props) => !current_user ? 
          (<Redirect to="/"></Redirect>) : 
          (<UserFilmsPage
            list={props.location.state.list}>
          </UserFilmsPage>)}> 
        </Route>

      <Route
        path="/user/:username/lists"
        render = { () => !current_user ? 
          (<Redirect to="/"></Redirect>) : (<UserListsPage></UserListsPage>)}> 
      </Route>

      <Route
        path="/404"
        component={Error}>
      </Route>
      
      <Redirect to="/404"></Redirect>
      
    </Switch>
  </Router>

); 


export default Routes; 