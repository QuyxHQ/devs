import { useEffect } from "react";

const Modal = ({ displayModal, setDisplayModal, children }: ModalProps) => {
  function handleOverlayClick(e: any) {
    if (e.target.classList.contains("modal-dialog")) setDisplayModal(false);
    return;
  }

  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.keyCode === 27 && displayModal) setDisplayModal(false);
    };

    if (displayModal) window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [displayModal]);

  return (
    <div
      className={`modal-dialog ${displayModal ? "d-flex" : "d-none"}`}
      onClick={handleOverlayClick}
    >
      <div className="modal-box">{children || <p>modal content here</p>}</div>
    </div>
  );
};

export default Modal;
