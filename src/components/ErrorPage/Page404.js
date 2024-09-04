import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../ErrorPage/Page500.scss";

const Page404 = () => {

  let history = useHistory();

  return (
    <div>
      <div className="section">
        <h1 className="error">404</h1>
        <div className="page">Trang mà bạn đang truy cập không tồn tại.</div>
      </div>
    </div>
  );
};
export default Page404;
