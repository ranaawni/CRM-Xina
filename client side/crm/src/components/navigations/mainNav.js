import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/auth-context";
import "./navigation.css";



const MainNav = (props) => (
  

  <AuthContext.Consumer>
    {(context) => {
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>EasyEvent</h1>
          </div>
          <nav className="main-navigation__items">
            <ul>
              {context.token && (
                <li>
                  <NavLink to="/home">Home</NavLink>
                </li>
              )}
              {context.token && (
                <li>
                  <NavLink to="/orders">Orders</NavLink>
                </li>
              )}

              {!context.token && (
                <li>
                  <NavLink to="/signup">Sign up</NavLink>
                </li>
              )}

{context.token && (
                <li>
                  <NavLink to={"/settings/ "+ context.adminId} >
                    Settings
                  </NavLink>
                </li>
              )}

              {context.token && (
                <li>
                  <NavLink to="/" onClick={context.logout}>
                    Log Out
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default MainNav;
