import React, { Component } from "react";
import { connect } from "react-redux";
import { handleChange } from "../../helpers/handleEvents";
import TextInput from "../../components/TextInput";
import { loadTodos } from "../../actions/data";

class SearchTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
    this.handleChange = handleChange.bind(this);
  }

  handleKeyUp = () => {
    this.props.search(this.state.title)
  };

  render() {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  search: title =>
    dispatch(loadTodos({ page: 1, status: ownProps.status, title }))
});
