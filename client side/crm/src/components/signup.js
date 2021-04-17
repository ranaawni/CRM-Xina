import React, { Component } from "react";
import MainNav from "./navigations/mainNav";
import "../App.css";
import AuthContext from "./context/auth-context";

class SignUp extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.fullNameEle = React.createRef();
    this.userNameEle = React.createRef();
    this.passwordEle = React.createRef();
  }

  submitHandler = (event) => {
    event.preventDefault();
    const fullName = this.fullNameEle.current.value;
    const userName = this.userNameEle.current.value;
    const password = this.passwordEle.current.value;

    if (
      userName.trim().length === 0 ||
      password.trim().length === 0 ||
      fullName.trim().length === 0
    ) {
      return;
    }
    console.log(fullName, userName, password, "submitHandler in auth file");

    var request = {
      query: `
          mutation {
            createAdmin(adminInput: {fullName:"${fullName}",userName: "${userName}", password: "${password}"}) {
              _id
              userName
              fullName
            }
          }
        `,
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(request),
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
        
        console.log(resData);
      })
      .catch((err) => {
        console.log(err, "error in auth file line 50");
      });
  };

  render() {
    return (
      <div>
        <MainNav />
        <form className="auth-form" onSubmit={this.submitHandler}>
          <div className="form-control">
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" ref={this.fullNameEle} />
          </div>
          <div className="form-control">
            <label htmlFor="userName">User Name</label>
            <input id="userName" ref={this.userNameEle} />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={this.passwordEle} />
          </div>
          <div className="form-actions">
            <button type="submit">Submit</button>
            <a href="/signin">Switch to Sign in</a>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
