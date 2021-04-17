import React, { Component } from "react";
import AuthContext from "./context/auth-context";

class Settings extends Component {
  state = {
    fullName: "",
    userName: "",
  };
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.userNameElRef = React.createRef();
    this.fullNameElRef = React.createRef();
  }

  retrieveData(adminId) {
    var token = this.context.token;
    var id = this.props._id;
    const request = {
      query: `
            query {
              adminOne(adminId:"${id}") {
                fullName
                userName
              }
            }
          `,
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData, "every thing about one admin");
        //   const orders = resData.data.orders;
        //   this.setState({ orders: orders });
        // if (this.isActive) {
        //   this.setState({ events: events, isLoading: false });
        // }
      })
      .catch((err) => {
        console.log(err);
        // if (this.isActive) {
        //   this.setState({ isLoading: false });
        // }
      });

    // .then(response => {
    //     // we put it to fill the input fields
    //   this.setState({
    //                 adminName : response.data[0].adminName,
    //                 adminpassword: response.data[0].adminpassword,
    //                 userType : response.data[0].userType
    //             })

    // })

    // .catch((error) => {
    //   console.log(error);
    // })
  }

  update = (adminId) => {
    this.setState({ creating: false });
    const userName = this.userNameElRef.current.value;
    const fullName = this.fullNameElRef.current.value;

    if (userName.trim().length === 0 || fullName.trim().length === 0) {
      return;
    }

    const admin = { userName, fullName };
    console.log(admin);
    var request = {
      query: `
            mutation {
              editAdmin(adminId:"${adminId}", userName:"${userName}", fullName:"${fullName}") {
                _id
                 service
                 date
              }
            }
          `,
    };

    var token = this.context.token;

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        // this.setState(prevState => {
        //   const updatedEvents = [...prevState.events];
        //   updatedEvents.push({
        //     _id: resData.data.createEvent._id,
        //     title: resData.data.createEvent.title,
        //     description: resData.data.createEvent.description,
        //     date: resData.data.createEvent.date,
        //     price: resData.data.createEvent.price,
        //     creator: {
        //       _id: this.context.userId
        //     }
        //   });
        //   return { events: updatedEvents };
        // });
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.retrieveData();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.update}>
          <label>User Name</label>
          <input
            name="userName"
            value={this.state.userName}
            ref={this.userNameElRef}
          />

          <label>Full Name</label>
          <input
            name="fullName"
            value={this.state.fullName}
            ref={this.fullNameElRef}
          ></input>

          <button type="submit"> Edit </button>
        </form>
      </div>
    );
  }
}

export default Settings;
