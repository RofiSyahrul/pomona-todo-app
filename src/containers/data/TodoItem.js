import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
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
      <div className="row d-flex align-items-center my-1">
        <div className="col-2 d-flex justify-content-center">
          <Checkbox {...{ id, isDone, toggleCheck }} />
        </div>
        <div className="col-10 col-sm-8" onDoubleClick={showEdit}>
          <div className="row d-flex align-items-center">
            <Task
              {...{ title, isDone, priority: { text, number: priority } }}
            />
          </div>
          <div
            className="row d-flex align-items-end"
            style={{ height: "3rem", overflowY: "auto" }}
          >
            <div className="col-12 text-secondary">
              {isDone ? <del>{note}</del> : note}
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-2 d-flex justify-content-center">
          <button
            className="btn text-success bg-transparent mx-1"
            onClick={showEdit}
          >
            <i className="fa fa-pencil-square-o fa-lg"></i>
          </button>
          <button
            className="btn text-danger bg-transparent mx-1"
            onClick={deleteTodo}
          >
            <i className="fa fa-trash fa-lg"></i>
          </button>
        </div>
      </div>
    </li>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleCheck: id => dispatch(toggleTodo({ id, isDone: !ownProps.isDone })),
  showEdit: () => dispatch(setEditToON(ownProps.id)),
  deleteTodo: () => {
    Swal.fire({
      title: "Are you sure to delete it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        dispatch(deleteTodo(ownProps));
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'Your todo is safe :)',
          'error'
        )
      }
    });
  }
});

export default connect(
  null,
  mapDispatchToProps
)(TodoItem);
