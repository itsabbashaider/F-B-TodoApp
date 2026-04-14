import React from "react";
import Buttons from "./Buttons";
import ConfirmModal from "./ConfirmModal";

function Modal({
  isOpen,
  mode,
  title,
  description,
  setTitle,
  setDescription,
  onClose,
  onSubmit
}) {

  const [confirm, setConfirm] = React.useState({
    open: false,
    type: null,
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal" 
        onClick={(e) => e.stopPropagation()} 
      >

        {/* VIEW MODE */}
        {mode === "view" && (
          <div className="modal-view">
            <h2>{title}</h2>
            <p>{description}</p>

            <div className="modal-actions">
              <button className="Neutral-1" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* CREATE / EDIT MODE */}
        {(mode === "create" || mode === "edit") && (
          <form onSubmit={onSubmit}>
            <h2>
              {mode === "edit" ? "Edit Task" : "Create Task"}
            </h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            <button className="Primary" type="submit">
              {mode === "edit" ? "Update" : "Create"}
            </button>

            <button
              className="Neutral"
              type="button"
              onClick={() =>
                setConfirm({ open: true, type: "cancel" })
              }
            >
              Cancel
            </button>
          </form>
        )}

        {/* CONFIRMATION MODAL */}
        <ConfirmModal
          isOpen={confirm.open}
          message={
            confirm.type === "delete"
              ? "Are you sure you want to delete?"
              : "Are you sure you want to cancel?"
          }
          onConfirm={() => {
            if (confirm.type === "cancel") {
              onClose(); 
            }

            setConfirm({ open: false, type: null });
          }}
          onCancel={() =>
            setConfirm({ open: false, type: null })
          }
        />

      </div>
    </div>
  );
}

export default Modal;