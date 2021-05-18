import { toast, ToastPosition, Flip } from 'react-toastify';

const options = {
  position: 'bottom-center' as ToastPosition,
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Flip
};

const toaster = {
  success: msg => {
    toast.success(`✓ ${msg}`, options);
  },
  error: msg => {
    toast.error(`✘ ${msg}`, options);
  },
  info: msg => {
    toast.info(`✉ ${msg}`, options);
  }
};

export default toaster;
