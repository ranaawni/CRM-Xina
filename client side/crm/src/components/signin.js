import React, { Component } from "react";
import MainNav from "./navigations/mainNav";
import "../App.css";
import AuthContext from "./context/auth-context";

class SignIn extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.userNameEle = React.createRef();
    this.passwordEle = React.createRef();
  }

  //handle form submit
  submitHandler = (event) => {
    event.preventDefault();
    const userName = this.userNameEle.current.value;
    const password = this.passwordEle.current.value;

    //check if the fields empty or not
    if (userName.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    // console.log(userName, password, "submitHandler in auth file");

    var requestLogin = {
      query: `
          query {
            login(userName: "${userName}", password: "${password}"){
              adminId
              token
              tokenExpiration
            }
          }
        `,
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestLogin),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!  in auth file line 42");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.adminId,
            resData.data.login.token.tokenExperation
          );
          //   window.location = "/home";
          console.log("hooooo");
        }

        console.log(resData);
      })
      .catch((err) => {
        console.log(err, "error in auth file line 50");
        alert("invalid user");
      });
  };

  render() {
    return (
      <div>
        <MainNav />
        <form className="auth-form" onSubmit={this.submitHandler}>
          <div className="form-control">
            <label htmlFor="userName">User Name</label>
            <input id="userName" ref={this.userNameEle} />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={this.passwordEle} />
          </div>
          <div className="form-actions">
            <button type="submit">Login</button>
            <a href="/signup">Switch to Signup</a>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
