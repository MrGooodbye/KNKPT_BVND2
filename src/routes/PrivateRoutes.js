import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const token = localStorage.getItem('jwt');
  const getUserLogin = JSON.parse(localStorage.getItem('userLogin'));

  if (token && getUserLogin) {
    return (
      <>
        <Route path={props.path} component={props.component}></Route>
      </>
    );
  }
  else {
    return (
      <>
        <Redirect to='/login'></Redirect>
      </>
    )
  }
};
export default PrivateRoutes;
