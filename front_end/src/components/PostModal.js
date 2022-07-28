import React from "react";
import styles from "./PostModal.module.css";
import { createPortal } from "react-dom";

function PostModal(props) {
    function closeModal() {
        props.closeModal();
      }
     
      return (
        <div className="Modal" onClick={closeModal}>
          <div className="modalBody" onClick={(e) => e.stopPropagation()}>
            <button id="modalCloseBtn" onClick={closeModal}>
              ✖
            </button>
            {/* {props.children} */}
          </div>
        </div>
      );
};

export default PostModal;