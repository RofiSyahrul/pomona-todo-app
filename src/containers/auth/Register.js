import React, { Component } from "react";
import { connect } from "react-redux";
import { handleChange, handleSubmit } from "../../helpers/handleEvents";
import { register } from "../../actions/auth";
import TextInput from "../../components/TextInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import "../../stylesheets/floating-labels.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "", loading: false };
    this.handleChange = handleChange.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
  }

  render() {
    const { name, email, password, loading } = this.state;
    const { register } = this.props;
    return (
      <form
        className="form-signin"
        onSubmit={e => this.handleSubmit(e, 'loading', register, this.state)}
      >
        <TextInput
          type="text"
          name="name"
          value={name}
          label="Name"
          onChange={this.handleChange}
          autoFocus
          required
        />
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
          autoComplete="new-password"
          required
        />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Register
          </button>
        )}
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  register: (user = {}, cb) => dispatch(register(user, cb))
});

export default connect(
  null,
  mapDispatchToProps
)(Register);
