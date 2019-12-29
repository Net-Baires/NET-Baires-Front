import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
    autoClose: 4000,
    draggable: false,
    //etc you get the idea
});
export const errorToast = (message: string) => toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT
});