import React, { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div role="dialog" aria-modal="true" style={backdrop}>
      <div style={modalStyle}>
        {children}
        <button onClick={onClose} aria-label="Close modal">
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

const backdrop: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const modalStyle: React.CSSProperties = {
  background: "white",
  padding: 20,
  borderRadius: 8,
  minWidth: 300,
};

export default function ModalPortalDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ padding: 16 }}>
      <h3>Modal (portal + ESC + focus lock basics)</h3>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <p>Modal content</p>
        </Modal>
      )}
    </div>
  );
}
