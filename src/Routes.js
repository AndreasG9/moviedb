import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom"; 
import Home from "./pages/Home";
import SearchResults from "./pages/Search"; 
import FilmPage from "./pages/FilmPage"; 
// ... 

const Routes = () => (
  <Router>

    <Route exact path="/" component={Home}></Route>
    
    <Route 
      path="/search" 
      render = { (props) => 
        <SearchResults 
          results={props.location.state.results} 
          query={props.location.state.query} 
          // posts_per_page={props.location.state.posts_per_page}
          // total_pages={props.location.state.total_pages}
        >
        </SearchResults>}>
    </Route>

    <Route
      path="/film"
      render = { (props) => 
        <FilmPage
         movie_id={props.location.state.movie_id}
        >
        </FilmPage>}
      >
    </Route>

  </Router>
); 

export default Routes; 
