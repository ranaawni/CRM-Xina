import React, { Component } from "react";
import Modal from "./modal/modal";
import Back from "./modal/back";
import orderList from "./OrderList";
import AuthContext from "./context/auth-context";
import "../App.css";

class OrderList extends Component {
  state = {
    creating: false,
    orders: [],
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.serviceElRef = React.createRef();
    this.dateElRef = React.createRef();
  }

  componentDidMount = () => {
    this.fetchOrders();
  };

  startCreateOrder = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const service = this.serviceElRef.current.value;
    const date = this.dateElRef.current.value;

    if (service.trim().length === 0 || date.trim().length === 0) {
      return;
    }

    const order = { service, date };
    console.log(order);
    var request = {
      query: `
            mutation {
              createOrder(orderInput: {service:"${service}", date: "${date}"}) {
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
        this.fetchOrders();
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  modalCancleHandler = () => {
    this.setState({ creating: false });
  };

  //to fetch orders
  fetchOrders() {
    // this.setState({ isLoading: true });
    const request = {
      query: `
          query {
            orders {
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
        console.log(resData, "all orders");
        const orders = resData.data.orders;
        this.setState({ orders: orders });
        
      })
      .catch((err) => {
        console.log(err);
      
      });
  }

  deleteOrder = (orderId) => {
    const request = {
      query: `
            mutation {
                deleteOrder(orderId:"${orderId}"){
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
        console.log(resData, "order");
        const orders = resData.data.orders;
        this.setState({ orders: orders });
        // if (this.isActive) {
        //   ;
        // }
      })
      .catch((err) => {
        console.log(err);
        // if (this.isActive) {
        //   this.setState({ isLoading: false });
        // }
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.creating && <Back />}
        {this.state.creating && (
          <Modal
            title="add order"
            canCancle
            canConfirm
            onCancle={this.modalCancleHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Service</label>
                <input type="text" id="service" ref={this.serviceElRef} />
              </div>

              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.context.token && (
          <div className="orders-control">
            <button className="btn" onClick={this.startCreateOrder}>
              Add Orders
            </button>
          </div>
        )}
        <orderList orders={this.state.orders} />
      </React.Fragment>
    );
  }
}

export default OrderList;
