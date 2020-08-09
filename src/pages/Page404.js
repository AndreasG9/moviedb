import React from "react";
import styled from "styled-components";
import Header from "../components/Header"; 
import backdrop from "../assets/the_new_world.jpg"; 

function Page404() {
  return (
    <React.Fragment>
      <Header></Header>
      <Div>
        <Message>404 Page Not Found</Message>
        <div>Image from The New World (2005) | The Criterion Collection</div>
      </Div>
    </React.Fragment>
  )
}

const Message = styled.div` 
  height: 80vh;
  font-size: 10rem; 
  font-family: Roboto; 
  text-align: center; 
`;

const Div = styled.div`
  background: url(${backdrop}); 
  background-repeat: no-repeat; 
  margin-top: 2%;
  background-position: center; 
  color: white; 
  text-align: center; 
`; 




export default Page404; 
