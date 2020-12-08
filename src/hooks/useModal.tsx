import { useState } from "react";
import { BaseModalProps } from "../components/proptypes";
import { BaseModal } from "../components";
import React from "react";

export const useModal = () => {
  const initModal = {
    data: {
      title: "",
      body: "",
      okMethod: () => {},
      cancelMethod: undefined,
      CancelText: undefined,
      OkMethod: undefined,
      OkText: "",
    },
    isShown: false,
    closeModal: () => {},
  };

  const [modalState, setModalState] = useState(initModal as BaseModalProps);

  return {
    isShown: modalState.isShown,
    data: modalState.data,
    showModal: (data: BaseModalProps["data"]) => {
      setModalState({
        data: data,
        isShown: true,
        closeModal: () =>
          setModalState({
            data: initModal.data,
            isShown: false,
            closeModal: () => {},
          }),
      });
      console.log(data);
    },
    Modal: () => (
      <BaseModal
        data={modalState.data}
        closeModal={modalState.closeModal}
        isShown={modalState.isShown}
      />
    ),
  };
};

export default useModal;
