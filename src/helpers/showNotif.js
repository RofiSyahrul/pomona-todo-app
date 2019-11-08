import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ReactSwal = withReactContent(Swal);

export function showNotif({text, type}) {
  if (text && type) {
    ReactSwal.fire({
      title: text,
      icon: type,
      timer: 2000
    });
  }
}