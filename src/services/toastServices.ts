import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
    autoClose: 4000,
    draggable: false,
    //etc you get the idea
});
export const errorToast = (message: string) => toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'alert alert-danger'
});
export const successToast = (message: string) => toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'alert alert-success'
});
export const infoToast = (message: string) => toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'alert alert-primary'
});
export const warningToast = (message: string) => toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'alert alert-warning'
});