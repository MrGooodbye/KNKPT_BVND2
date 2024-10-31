import { BrowserRouter, Route, Link, Switch, NavLink, HashRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Header from "../components/Nav/Header.jsx";
import Page404 from "../components/ErrorPage/Page404";
import Home from "../components/Home/Home.jsx";
import Login from "../components/LoginAccount/Log-in";
import MainMedicalRegister from "../components/MedicalRegister/MainMedicalRegister.jsx";
import MainAppointmentExamining from "../components/MedicalAppointment/MainAppointmentExamining.jsx";
import MainDoctorExamining from "../components/DoctorExamining/MainDoctorExamining.jsx";
import MainDashboard from "../components/Dashboard/MainDashboard.jsx";
import MainListUser from "../components/Dashboard/MainListUser.jsx";

const AppRoutes = (props) => {
  return (
    <>
      <HashRouter>
        {/* <Header />{" "} */}
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/login"><Login /></Route>
          <PrivateRoutes path="/medicalregister" component={MainMedicalRegister}></PrivateRoutes>
          <PrivateRoutes path="/doctor-examining" component={MainDoctorExamining}></PrivateRoutes>
          <PrivateRoutes path="/remind-examining" component={MainAppointmentExamining}></PrivateRoutes>
          <PrivateRoutes path="/dashboard" component={MainDashboard}></PrivateRoutes>
          <PrivateRoutes path="/list-user" component={MainListUser}></PrivateRoutes>
          <Route path="*"><Page404 />{" "}</Route>
          {/* <PrivateRoutes path="/users" component={Users} /> */}
        </Switch>
      </HashRouter>
    </>
  );
};
export default AppRoutes;
