import React, { Component } from "react";
import { connect } from "react-redux";
import SelectInput from "../../components/SelectInput";
import { loadTodos } from "../../actions/data";

class SearchTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { status: props.status };
    this.options = [
      { value: "all", label: "All" },
      { value: "done", label: "Completed" },
      { value: "undone", label: "Not completed" }
    ];
  }

  handleChange = e => {
    this.setState({ status: e.target.value }, () => {
      this.props.filter(this.state.status);
    });
  };

  render() {
    return (
      <SelectInput
        label="Filter by status"
        title="Select status"
        name="status"
        values={this.options}
        activeValue={this.state.status}
        onChange={this.handleChange}
      />
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  filter: status =>
    dispatch(loadTodos({ page: 1, status, title: ownProps.title }))
});

export default connect(
  null,
  mapDispatchToProps
)(SearchTodo);
