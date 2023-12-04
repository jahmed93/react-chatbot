import React from 'react';

const Modal = ({ title, children, modalOpen = false, setModalOpen }) => {
  return (
    <div>
      <input
        value={modalOpen}
        type="checkbox"
        checked={modalOpen}
        onChange={() => setModalOpen(!modalOpen)}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="relative modal-box bg-slate-100">
          <label
            onClick={() => setModalOpen(!modalOpen)}
            className="absolute cursor-pointer right-4 top-4"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{title}</h3>
          <div className="py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
