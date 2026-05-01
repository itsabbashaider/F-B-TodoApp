function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <p>{message}</p>

        <div className="confirm-actions">
          <button className="Yes" onClick={onConfirm}>
            Yes
          </button>
          <button className="No" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;