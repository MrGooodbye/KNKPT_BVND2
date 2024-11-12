import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, useHistory, Redirect } from "react-router-dom";

const PrivateRoutes = (props) => {

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const checkJWTExpire = () => {
    let result = false;
    let getJWT = localStorage.getItem('jwt');
    if (getJWT) {
      let decodeJWT = parseJwt(getJWT);
      let currentDate = new Date();
      if (decodeJWT.exp * 1000 < currentDate.getTime()) {
        //console.log('Token đã hết hạn hoặc không tồn tại')
        localStorage.removeItem('jwt'); //xóa localStorage
        localStorage.removeItem('userLogin');
        sessionStorage.clear();
        return result
      }
      else {
        //console.log('token còn hạn');
        result = true;
        return result
      }
    }
    else {
      localStorage.removeItem('userLogin');
      return result
    }
  }

  const getToken = localStorage.getItem('jwt');
  const getUserLogin = JSON.parse(localStorage.getItem('userLogin'));

  if (getUserLogin && getToken) {
    const result = checkJWTExpire();
    if (result === false) {
      return (
        <>
          <Redirect to='/login'></Redirect>
        </>
      )
    }
    else {
      return (
        <>
          <Route path={props.path} component={props.component}></Route>
        </>
      );
    }
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
