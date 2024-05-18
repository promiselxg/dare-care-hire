import Swal from "sweetalert2";
import host from "./host";
import axios from "axios";

export const handleDeleteBtn = (id, route) => {
  Swal.fire({
    title: "Please confirm action.",
    text: "Do you want to delete this item?",
    showCancelButton: true,
    confirmButtonText: "Delete",
    showLoaderOnConfirm: true,
    confirmButtonColor: "#d33",
    preConfirm: async () => {
      try {
        const { data } = await axios.delete(`${host.url}/${route}/${id}`);
        if (data?.message !== "Record deleted successfully") {
          Swal.showValidationMessage(`${data?.message}`);
        }
      } catch (error) {
        Swal.showValidationMessage(`
            Request failed: ${error}
          `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "",
        text: "Item deleted successfully.",
        icon: "success",
        confirmButtonText: "Ok",
        showCancelButton: false,
      }).then((status) => {
        if (status.isConfirmed) {
          window.location.reload();
        }
      });
    }
  });
};
