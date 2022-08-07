import React from "react";
// import styles from "./PostModal.module.css";
// import { createPortal } from "react-dom";
import styled from 'styled-components';

function PostModal(props) {
    // function closeModal() {
    //     props.closeModal();
    //   }
    const {onClose} = props;
    const {card} = props;

      return (
        <Container className="Modal">
          {/* <div className="modalBody" onClick={(e) => e.stopPropagation()}> */}
          <div className="modalBody">  
            모달창
            <button id="modalCloseBtn" onClick={()=> {onClose(false);}}>
              ✖
            </button>
            {/* {props.children} */}
            <ol>
              <ul>{card.cm_title}</ul>
              <ul>{card.cm_type}</ul>
              <ul>{card.cm_content}</ul>
              <ul>{card.writer}</ul>
              <ul>{card.wr_date}</ul>
            </ol>

          </div>
        </Container>
      );
};

const Container = styled.div `
  position: fixed;
  width : 30%;
  height : 70%;
  align-items: center;
  z-index: 99;
  box-shadow: rgb(0 0 0 / 5%) 0 0 0 999px;
  background-color: azure;
`

export default PostModal;