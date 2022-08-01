import React from "react";
// import styles from "./PostModal.module.css";
// import { createPortal } from "react-dom";
import styled from 'styled-components';

function PostModal(props) {
    // function closeModal() {
    //     props.closeModal();
    //   }
    const {onClose} = props;

      return (
        <Container className="Modal">
          {/* <div className="modalBody" onClick={(e) => e.stopPropagation()}> */}
          <div className="modalBody">  
            모달창
            <button id="modalCloseBtn" onClick={()=> {onClose(false);}}>
              ✖
            </button>
            {/* {props.children} */}
          </div>
        </Container>
      );
};

const Container = styled.div `
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 99;
  box-shadow: rgb(0 0 0 / 5%) 0 0 0 999px;
`

export default PostModal;