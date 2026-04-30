import React from "react";
import ConfirmModal from "./ConfirmModal";

function Modal({
  isOpen,
  mode,
  title,
  description,
  setTitle,
  setDescription,
  onClose,
  onSubmit,
  originalTask
}) {
  const [confirm, setConfirm] = React.useState({
    open: false,
    type: null,
  });

  if (!isOpen) return null;

  // 🔥 shared change checker
  const checkChanges = () => {
    let hasChanges = false;

    if (mode === "edit" && originalTask) {
      hasChanges =
        title !== originalTask.title ||
        description !== originalTask.description;
    }

    if (mode === "create") {
      hasChanges = title !== "" || description !== "";
    }

    return hasChanges;
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        if (checkChanges()) {
          setConfirm({ open: true, type: "cancel" });
          return;
        }
        onClose();
      }}
    >
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
              onClick={() => {
                if (checkChanges()) {
                  setConfirm({ open: true, type: "cancel" });
                  return;
                }
                onClose();
              }}
            >
              Cancel
            </button>
          </form>
        )}

        {/* CONFIRMATION MODAL */}
        <ConfirmModal
          isOpen={confirm.open}
          message="Are you sure you want to cancel?"
          onConfirm={() => {
            onClose();
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