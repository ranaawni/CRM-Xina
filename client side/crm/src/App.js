import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthContext from "./components/context/auth-context";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import HomePage from "./components/homePage";
import OrderList from "./components/orders";
import "./App.css";
import MainNav from "./components/navigations/mainNav";
import Settings from "./components/settings"

class App extends Component {
  state = {
    token: null,
    adminId: null,
  };

  login = (token, adminId, tokenExperation) => {
    this.setState({ token: token, adminId: adminId });
  };

  logout = () => {
    this.setState({ token: null, adminId: null });
  };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              adminId: this.state.adminId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <MainNav />
            <main className="main-content">
              <Switch>
                {!this.state.token && <Redirect from="/" to="/signin" exact />}
                {this.state.token && <Redirect from="/" to="/home" exact />}
                {!this.state.token && (
                  <Redirect from="/home" to="/signin" exact />
                )}
                {!this.state.token && (
                  <Redirect from="/orders" to="/signin" exact />
                )}
                {!this.state.token && (
                  <Redirect from="/settings" to="/signin"  />
                )}
                {this.state.token && <Redirect from="/signin" to="/home" />}

                {!this.state.token && (
                  <Route path="/signin" component={SignIn} />
                )}

                {!this.state.token && (
                  <Route path="/signup" component={SignUp} />
                )}
                {this.state.token && (
                  <Route path="/orders" component={OrderList} />
                )}
                 {this.state.token && (
                  <Route path="/settings" component={Settings} />
                )}
                {this.state.token && (
                  <Route path="/home" component={HomePage} />
                )}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
