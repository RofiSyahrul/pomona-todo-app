import React, { Component } from "react";
import { connect } from "react-redux";
import { handleChange, handleSubmit } from "../../helpers/handleEvents";
import Checkbox from "../../components/Checkbox";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import { toggleTodo, editTodo, setEditToOFF } from "../../actions/data";

class EditTodo extends Component {
  constructor(props) {
    super(props);
    const { title, priority, note } = props;
    this.state = { title, priority, note };
    this.handleChange = handleChange.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
  }

  render() {
    const { title, priority, note } = this.state;
    const { id, isDone, toggleCheck, editTodo, cancelEdit } = this.props;
    return (
      <li className="list-group-item">
        <form onSubmit={() => editTodo({ id, isDone, title, priority, note })}>
          <div className="row d-flex align-items-center my-1">
            <div className="col-2 d-flex justify-content-center">
              <Checkbox {...{ id, isDone, toggleCheck }} />
            </div>
            <div className="col-10 col-sm-8">
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
            </div>
            <div className="col-12 col-sm-2 d-flex justify-content-center">
              <button
                className="btn text-success bg-transparent mx-1"
                type="submit"
              >
                <i className="fa fa-check-circle fa-lg"></i>
              </button>
              <button
                className="btn text-danger bg-transparent mx-1"
                onClick={cancelEdit}
              >
                <i className="fa fa-times fa-lg"></i>
              </button>
            </div>
          </div>
        </form>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleCheck: id => dispatch(toggleTodo({ id, isDone: !ownProps.isDone })),
  editTodo: newTodo => dispatch(editTodo(newTodo, ownProps)),
  cancelEdit: () => dispatch(setEditToOFF(ownProps.id))
});

export default connect(
  null,
  mapDispatchToProps
)(EditTodo);
