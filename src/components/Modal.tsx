import { ReactElement } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactElement;
}

export default function Modal(props: ModalProps) {
  return (
    <div
      className={`${"modal"} ${props.open ? "display-block" : "display-none"}`}
    >
      <div className="modal-main">
        <div className="modal-body">{props.children}</div>
        <div className="btn-container">
          <button
            type="button"
            className="btn bg-indigo-600 p-2 rounded-md text-white hover:bg-indigo-900"
            onClick={props.onClose}
          >
            Κλείσιμο
          </button>
        </div>
      </div>
    </div>
  );
}
