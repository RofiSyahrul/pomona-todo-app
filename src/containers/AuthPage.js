import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import Register from "./auth/Register";
import Login from "./auth/Login";

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: "register", width: 500 };
  }

  componentDidMount() {
    window.onload = () => this.setWidth(window.screen.width);
    window.addEventListener("resize", () => this.setWidth(window.screen.width));
    if (localStorage.getItem("token")) this.props.redirectToTodo();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () =>
      this.setWidth(window.screen.width)
    );
  }

  setActiveTab = (e, tabName = "") => {
    e.preventDefault();
    this.setState({ activeTab: tabName });
  };

  setWidth = screenWidth => {
    this.setState({ width: screenWidth > 500 ? 500 : "95%" });
  };

  render() {
    const { activeTab, width } = this.state;
    const { message } = this.props;
    const token = localStorage.getItem("token");
    return (
      !token && (
        <div
          className="row align-items-center justify-content-center bg-info"
          style={{ height: "100vh", width: "100vw" }}
        >
          <div className="card" style={{ width }}>
            <div className="card-header bg-primary">
              {message && (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              )}
              <ul className="nav nav-tabs card-header-tabs w-100">
                <li className="nav-item w-50">
                  <a
                    href="/"
                    className={`text-center text-dark nav-link ${
                      activeTab === "register" ? "active" : ""
                    }`}
                    onClick={e => this.setActiveTab(e, "register")}
                  >
                    Register
                  </a>
                </li>
                <li className="nav-item w-50">
                  <a
                    href="/"
                    className={`text-center text-dark nav-link ${
                      activeTab === "login" ? "active" : ""
                    }`}
                    onClick={e => this.setActiveTab(e, "login")}
                  >
                    Login
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="row justify-content-between d-flex align-items-center my-2 mx-2">
                <div className="col-3 col-sm-2 text-left">
                  <img alt="rho-phi" src="/rho-pi.ico" width="60" height="60" />
                </div>
                <div
                  className="col-9 col-sm-10 text-primary text-right h4"
                  style={{ wordWrap: "break-word" }}
                >
                  {activeTab === "login" && (
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  )}
                  {activeTab === "login" ? "Login " : "Register "} to Pomona
                  Todo App
                </div>
              </div>

              {activeTab === "login" ? <Login /> : <Register />}
              <p className="mt-5 mb-3 text-muted text-center">&copy; Rofi</p>
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  redirectToTodo: () => dispatch(push("/todo"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);
