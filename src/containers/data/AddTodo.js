import React, { Component } from "react";
import { connect } from "react-redux";
import { handleChange, handleSubmit } from "../../helpers/handleEvents";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import { addTodo } from "../../actions/data";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", priority: 0, note: "", addLoading: false };
    this.handleChange = handleChange.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
  }

  render() {
    const { title, priority, note, addLoading } = this.state;
    const { addTodo, cancelAdd } = this.props;
    return (
      <div className="card my-3">
        <div className="card-header h5">Add todo</div>
        <div className="card-body">
          <form
            onSubmit={e =>
              this.handleSubmit(e, 'addLoading', addTodo, this.state)
            }
          >
            <div className="row">
              <div className="col-sm-7 col-12">
                <TextInput
                  type="text"
                  name="title"
                  label="Task title"
                  value={title}
                  onChange={this.handleChange}
                  autoFocus
                  required
                />
              </div>
              <div className="col-sm-5 col-12">
                <SelectInput
                  label="Priority"
                  title="Choose priority"
                  name="priority"
                  values={[1, 2, 3]}
                  activeValue={priority}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <TextInput
                  type="textarea"
                  name="note"
                  label="Note"
                  value={note}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group row justify-content-center">
              <div className="col-5 mx-2 d-flex justify-content-center">
                {addLoading ? (
                  <LoadingSpinner />
                ) : (
                  <button type="submit" className="btn btn-success btn-block">
                    <i className="fa fa-check mx-1" /> Ok
                  </button>
                )}
              </div>
              <div className="col-5 mx-2 d-flex justify-content-center">
                <button
                  className="btn btn-warning btn-block"
                  onClick={cancelAdd}
                >
                  <i className="fa fa-times mx-1" /> Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addTodo: (todo = {}, cb) => dispatch(addTodo(todo, cb))
});

export default connect(
  null,
  mapDispatchToProps
)(AddTodo);
