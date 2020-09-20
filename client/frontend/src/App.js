import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./components/styles/App.css";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignupAll from "./components/SignupAll";
import Logout from "./components/Logout";
import DashBoard from "./components/DashBoard";
import DashBoardCommander from "./components/DashBoardCommander"
import Password from "./components/newPassword/Password";
import InstructionsNewPassword from "./components/newPassword/InstructionsNewPassword";
import SetNewPassword from "./components/newPassword/SetNewPassword";
import OurCompany from './components/OurCompany';


class App extends React.Component {
  render() {
    // const isLogin = this.props.cookies.get("isLogin");
    return (
      <Router>
        <Switch>
          <Route exact path={"/"} component={Logout} />
          <Route exact path={"/dashboard"} component={DashBoard} />
          <Route exact path={"/dashboardC"} component={DashBoardCommander} />
          <Route exact path={"/profile"} component={Profile} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/password"} component={Password} />
          <Route exact path={"/instructions_new_password"} component={InstructionsNewPassword} />
          <Route exact path={"/set_new_password/:id"} component={SetNewPassword} />
          <Route exact path={"/signupAll"} component={SignupAll} />
          <Route exact path={"/logout"} component={Logout} />
          <Route exact path={"/wow"} component={OurCompany} />

        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(store) {
  return {
    isLogin: store.isLogin
  };
}

export default withCookies(connect(mapStateToProps)(App));
