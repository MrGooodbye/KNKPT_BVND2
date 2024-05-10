import { BrowserRouter as Router, Route, Link, Switch, NavLink, } from "react-router-dom";
import Header from "../components/Nav/Header.jsx";
import Page404 from "../components/ErrorPage/Page404";
import Login from "../components/LoginAccount/Log-in";
import MainMedicalRegister from "../components/MedicalRegister/MainMedicalRegister.jsx";
import MainDoctorExamining from "../components/DoctorExamining/MainDoctorExamining.jsx";

const AppRoutes = (props) => {
  return (
    <>
      <Router>
        <Header />{" "}
        <Switch>
          <Route exact path="/">
            home{" "}
          </Route>
          <Route path="/login"><Login /></Route>
          <Route path="/medicalregister"><MainMedicalRegister /></Route>
          <Route path="/doctor-examining"><MainDoctorExamining /></Route>
          <Route path="*"><Page404 />{" "}</Route>
          {/* <PrivateRoutes path="/users" component={Users} /> */}
        </Switch>
      </Router>
    </>
  );
};
export default AppRoutes;
