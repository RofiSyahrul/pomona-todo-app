import React, { Component } from "react";
import { connect } from "react-redux";
import { handleChange, handleSubmit } from "../../helpers/handleEvents";
import { login } from "../../actions/auth";
import TextInput from "../../components/TextInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import "../../stylesheets/floating-labels.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", loading: false };
    this.handleChange = handleChange.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
  }

  render() {
    const { email, password, loading } = this.state;
    const { login } = this.props;
    return (
      <form
        className="form-signin"
        onSubmit={e => this.handleSubmit(e, login, this.state)}
      >
        <TextInput type="text" name="ro" value="" label="" required readOnly />
        <TextInput
          type="email"
          name="email"
          value={email}
          label="Email address"
          onChange={this.handleChange}
          autoComplete="username"
          required
        />
        <TextInput
          type="password"
          name="password"
          value={password}
          label="Password"
          onChange={this.handleChange}
          required
          autoComplete="current-password"
        />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
        )}
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (user = {}, cb) => dispatch(login(user, cb))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
