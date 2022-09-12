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

    const handleImgError = (e) => {
      e.preventDefault();
      e.target.src = "/favicon.ico"
    }

      return (
        <>
        {Object.keys(modal).length !== 0 &&
        <Container className="Modal">
          
          <div className="modalBody"> 
            <div id="closeContainer">
              <button id="modalCloseBtn" onClick={()=> {onClose(false);}}>
                ✖
              </button>
            </div>

            <ol>
              <ul className="modal-title">{modal.cm_title}</ul>
              <ul className="modal-type">{modal.cm_type}</ul>
              <ul className="modal-writer">{modal.writer}</ul>
              <ul className="modal-date">{modal.wr_date}</ul>
              <div style={{display:"flex", justifyContent: "space-between"}}>
                <div className="modal-img"><img className="modal-img" src={'http://localhost:8000' + modal.cm_image} onError={handleImgError} width="190px" height="190px"></img></div>
                <div className="modal-body">{modal.cm_content}</div>
              </div>
            </ol>
          </div>
        </Container>
      }
    </>
      );
};

const Container = styled.div `
  position: fixed;
  width: 500px;
  height: 470px;
  z-index: 99;
  box-shadow: rgb(0 0 0 / 20%) 0 0 0 999px;
  background-color: white;
  left: 40%;
  top: 22%;
  border-radius: 10px;

  #closeContainer{
    width: 100%;
    height: 40px;
    background-color: #395C3C;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .modalBody button{
    float: right;
    font-size: 16px;
    color: white;
    padding: 8px 12px;
  }

  .modalBody ul{
    font-size: 14px;
  }

  .modalBody ol {
    padding: 25px 20px;
    text-align: left;
  }

  .modal-title{
    font-size: 20px !important;
    word-break: keep-all;
    font-weight: 500;
  }

  .modal-date{
    margin-bottom:20px;
  }

  .modal-type{
    color: gray;
  }

  .modal-img{
    border: 1px solid black;
    height: 190px;
    width: 190px;
  }
  
  .modal-body{
    width: 250px;
  }
`

export default PostModal;