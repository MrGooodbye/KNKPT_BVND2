import "./App.scss";
import { ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { handleRefresh } from "./components/redux/actions/userAction";
function App() {
  // const [account, setAccount] = useState({});
  useEffect(() => {
    let session = localStorage.getItem("userName");
    if (session) {
      dispatch(handleRefresh());
    }
  }, []);
  const dispatch = useDispatch();
  const dataUserRedux = useSelector((state) => state.user.user);
  return (
    <>
      <Router>
        <div className="app-container">
          <AppRoutes />
        </div>
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
      </Router>
    </>
  );
}

export default App;
