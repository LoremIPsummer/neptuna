import { toast } from "react-toastify";

const toastrConf = {
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export enum ToastOptions {
  SUCCESS = "success",
  ERROR = "error",
}

const showToast = (option: ToastOptions, message: string): void => {
  switch (option) {
    case ToastOptions.SUCCESS: {
      toast.success(message, toastrConf);
      break;
    }
    case ToastOptions.ERROR: {
      toast.error(message, toastrConf);
      break;
    }
  }
};

export default showToast;
