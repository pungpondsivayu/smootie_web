import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

// ใช้ type แทน interface
type AlertMessageProps = SweetAlertOptions & {
  type: "success" | "error" | "warning" | "info" | "question"; // ประเภทของ Alert
};

const AlertMessage = async (
  options: AlertMessageProps
): Promise<SweetAlertResult<any>> => {
  const {
    type,
    title,
    text,
    showCancelButton = false,
    showConfirmButton = true,
    confirmButtonText = "OK",
    cancelButtonText = "Cancel",
    timer = type === "question" ? 0 : 1500,
    ...rest

  } = options;

  return await Swal.fire({
    icon: type,
    title,
    text,
    showCancelButton,
    showConfirmButton,
    confirmButtonText,
    cancelButtonText,
    timer,
    ...rest,
  });
};


export default AlertMessage;
