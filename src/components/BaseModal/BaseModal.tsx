import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Theme } from "../../context/ThemeContext";
import { useTheme } from "../../hooks/useTheme";
import { BaseModalProps } from "../proptypes";
import "./BaseModal.scoped.scss";

export function BaseModal({ data, closeModal, isShown }: BaseModalProps) {
  const { theme } = useTheme();

  const handleClose = () => closeModal();

  return (
    <Modal
      show={isShown}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      className="neptuna-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{data.body}</Modal.Body>
      {(data.OkText || data.CancelText) && (
        <Modal.Footer>
          {data.OkText && data.OkMethod && (
            <Button
              variant={theme === Theme.Default ? "primary" : "dark"}
              onClick={() => {
                if (data.OkMethod) data.OkMethod();
                closeModal();
              }}
            >
              {data.OkText}
            </Button>
          )}
          {data.CancelText && data.CancelMethod && (
            <Button
              variant={theme === Theme.Default ? "primary" : "dark"}
              onClick={() => {
                if (data.CancelMethod) data.CancelMethod();
                closeModal();
              }}
            >
              {data.CancelText}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default BaseModal;
