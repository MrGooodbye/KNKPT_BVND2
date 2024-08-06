import { BrowserRouter, Route, Link, Switch, NavLink, HashRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Header from "../components/Nav/Header.jsx";
import Page404 from "../components/ErrorPage/Page404";
import Login from "../components/LoginAccount/Log-in";
import MainMedicalRegister from "../components/MedicalRegister/MainMedicalRegister.jsx";
import MainDoctorExamining from "../components/DoctorExamining/MainDoctorExamining.jsx";

const AppRoutes = (props) => {
  return (
    <>
      <HashRouter>
        {/* <Header />{" "} */}
        <Switch>
          <Route exact path="/">home{" "}</Route>
          <Route path="/login"><Login /></Route>
          <PrivateRoutes path="/medicalregister" component={MainMedicalRegister}></PrivateRoutes>
          <PrivateRoutes path="/doctor-examining" component={MainDoctorExamining}></PrivateRoutes>
          <Route path="*"><Page404 />{" "}</Route>
          {/* <PrivateRoutes path="/users" component={Users} /> */}
        </Switch>
      </HashRouter>
    </>
  );
};
export default AppRoutes;
