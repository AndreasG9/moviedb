import React from "react"; 
import Header from "../../components/Header";
import Films from "../../components/Profile/Films.js"; 

function UserFilmsPage( { list } ) {

  return (
    <div>
      <Header></Header>
      <Films list={list}></Films>
    </div>
  )
}

export default UserFilmsPage; 