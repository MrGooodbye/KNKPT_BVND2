import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = (props) => {
  let history = useHistory();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user && user.auth === false) {
      history.push("/login");
    }
  }, [user]);
  return (
    <>
      <Route path={props.path} component={props.component}></Route>
    </>
  );
};
export default PrivateRoutes;
