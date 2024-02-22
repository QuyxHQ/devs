const Modal = ({ displayModal, setDisplayModal, children }: ModalProps) => {
  function handleOverlayClick(e: any) {
    if (e.target.classList.contains("modal-dialog")) setDisplayModal(false);
    return;
  }

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
