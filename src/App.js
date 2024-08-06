import "./App.scss";
import { ToastContainer } from "react-toastify";
import React, { useEffect, useState, useHistory } from "react";
import { HashRouter, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Nav/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <>
      <HashRouter>
        <div className="header-container">
          <Header />
        </div>

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
