import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom"; 
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults"; 
// ... 

const Routes = () => (
  <Router>

    <Route exact path="/" component={Home}></Route>
    
    <Route 
      path="/search" 
      render = { (props) => <SearchResults results={props.location.state.results} query={props.location.state.query}></SearchResults>} 
      >
    </Route>

    <Route path="/film "></Route>

    {/* render={(props) => <SearchResults result={props.location.results}></SearchResults>} */}

  </Router>
); 

export default Routes; 
