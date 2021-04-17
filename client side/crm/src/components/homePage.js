import React, { Component } from "react";
import MainNav from "./navigations/mainNav";
import AuthContext from "./context/auth-context";
import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
class HomePage extends Component {
  state = {
    admins: [],
    orders: [],
  };

  static contextType = AuthContext;

  componentDidMount = () => {
    this.allAdmins();
    this.allOrders();
  };
  allAdmins = () => {
    const request = {
      query: `
                query {
                  admins {
                    _id
                    fullName
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
        console.log(resData, "all admins");
        const admins = resData.data.admins;
        console.log(admins.length, "count");
        this.setState({ admins: admins });
        const adminNum = this.state.admins.length;
        console.log(adminNum, "admiiiiin");
        this.state.data.push(adminNum);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //All Orders
  allOrders = () => {
    const request = {
      query: `
                query {
                  orders {
                    _id
                    service
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
        console.log(resData, "all orders");
        const orders = resData.data.orders;
        console.log(orders.length, "count order");
        this.setState({ orders: orders });
        const orderNum = this.state.orders.length;
        console.log(orderNum, "ordeeeeer");
        this.state.data.push(orderNum);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillUnmount = () => {
    const data = [];
    this.setState({ data: data });
  };

  render() {
    var newData = [];
    newData.push({ name: "Admins", Numbers: this.state.admins.length });
    newData.push({ name: "Orders", Numbers: this.state.orders.length });
    return (
      <div>
        <MainNav />
        <div style={{ textAlign: "center" }}>
          <h1>Number of Orders and Admins </h1>
          <div className="App">
            <BarChart
              width={1000}
              height={500}
              data={newData}
              margin={{
                top: 10,
                right: 30,
                left: 100,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="Numbers"
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
