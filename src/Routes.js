import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom"; 
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults"; 
// ... 

const Routes = () => (
  <Router>

    <Route exact path="/" component={Home}></Route>
    <Route path="/search" component={SearchResults}></Route>


  </Router>
); 

export default Routes; 
