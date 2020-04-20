import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 4000,
  draggable: false,
  //etc you get the idea
});
export const errorToast = (message: string, onClick: () => void = () => {}) =>
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "alert alert-danger",
    onClick: onClick,
  });
export const successToast = (message: string, onClick: () => void = () => {}) =>
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "alert alert-success",
    onClick: onClick,
  });
export const infoToast = (message: string, onClick: () => void = () => {}) =>
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "alert alert-primary",
    onClick: onClick,
  });
export const warningToast = (message: string, onClick: () => void = () => {}) =>
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "alert alert-warning",
    onClick: onClick,
  });
export const darkToast = (message: string, onClick: () => void = () => {}) =>
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "alert alert-dark",
    onClick: onClick,
  });
