import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom"; 
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage"; 
import FilmPage from "./pages/FilmPage"; 
import FilmsPage from "./pages/FilmsPage"; 
import PersonPage from "./pages/PersonPage"; 

const Routes = () => (
  <Router>

    <Route exact path="/" component={Home}></Route>
    
    <Route 
      path="/search" 
      render = { (props) => 
        <SearchPage 
          query={props.location.state.query}>
        </SearchPage>}>
    </Route>

    <Route
      path="/film"
      render = { (props) => 
        <FilmPage
         movie_id={props.location.state.movie_id}>
        </FilmPage>}>
    </Route>

    <Route
      path="/films"
      render = { (props) => (
        <FilmsPage
          browseby={props.location.state.browseby}
          selected={props.location.state.selected}
          genres={props.location.state.genres}>
        </FilmsPage>)}>
    </Route>

    <Route
      path="/person"
      render = { (props) => (
        <PersonPage
        credit={props.location.state.credit}>
        </PersonPage>)}>
    </Route>

    

    

  </Router>
); 

export default Routes; 
