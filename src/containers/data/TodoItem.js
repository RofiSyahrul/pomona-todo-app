import React from "react";
import { connect } from "react-redux";
import Checkbox from "../../components/Checkbox";
import Task from "../../components/Task";
import { PRIORITIES as priorities } from "../../constants";
import { toggleTodo, setEditToON, deleteTodo } from "../../actions/data";

function TodoItem(props) {
  let { id, title, priority, note, isDone } = props;
  const { toggleCheck, showEdit, deleteTodo } = props;
  note = `${note.substr(0, 100)}${note.length > 100 ? "..." : ""}`;
  const { text } = priorities[priority];
  return (
    <li className="list-group-item">
      <div className="row d-flex align-items-center">
        <div className="col-2 d-flex justify-content-center">
          <Checkbox {...{ id, isDone, toggleCheck }} />
        </div>
        <div className="col-10 col-sm-8">
          <div className="row">
            <Task {...{ title, isDone, priority: {text, number: priority} }} />
          </div>
          <div className="row">
            <div className="col-12 text-secondary">
              {isDone ? <del>{note}</del> : note}
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-2 d-flex justify-content-center">
          <button className="btn btn-success mx-1" onClick={() => showEdit(id)}>
            <i className="fa fa-pencil-square-o"></i>
          </button>
          <button className="btn btn-danger mx-1" onClick={deleteTodo}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
    </li>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleCheck: id => dispatch(toggleTodo({ id, isDone: !ownProps.isDone })),
  showEdit: id => dispatch(setEditToON(id)),
  deleteTodo: () => dispatch(deleteTodo(ownProps))
});

export default connect(
  null,
  mapDispatchToProps
)(TodoItem);
