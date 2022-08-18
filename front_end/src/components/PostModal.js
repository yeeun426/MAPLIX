import React, {useEffect, useState} from "react";
import styled from 'styled-components';

function PostModal(props) {

  const [modal, setModal] = useState([]);

  const {clickId} = props;
  const {onClose} = props;
  const {card} = props;
  // console.log(card)

  useEffect(() => {
      if(card.cm_num === clickId) {
        console.log(card.cm_num)
        console.log(clickId)
        setModal(card)
      }else {
        console.log("음"+ card.cm_num)
      }

      console.log(modal)
    }, [modal])


      return (
        <>
        {Object.keys(modal).length !== 0 &&
        <Container className="Modal">
          
          <div className="modalBody">  
            모달창
            <button id="modalCloseBtn" onClick={()=> {onClose(false);}}>
              ✖
            </button>

            <ol>
              <ul>{modal.cm_title}</ul>
              <ul>{modal.cm_type}</ul>
              <ul>{modal.cm_content}</ul>
              <ul>{modal.writer}</ul>
              <ul>{modal.wr_date}</ul>
            </ol>
          </div>
        </Container>
      }
    </>
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