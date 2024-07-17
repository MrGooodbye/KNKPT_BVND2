import "./App.scss";
import { ToastContainer } from "react-toastify";
import React, { useEffect, useState, useHistory } from "react";
import { HashRouter, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <>
      <HashRouter>
        <div className="app-container">
          <AppRoutes />
        </div>
      </HashRouter>

      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
