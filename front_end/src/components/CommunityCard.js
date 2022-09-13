// import { specialChars } from "@testing-library/user-event";
import styles from "./CommunityCard.module.css";
// import Modal from "./PostModal";
import {useEffect, useState} from "react"; 


export default function CommunityCard({card}) {

  // const onClickModal = (e) => {
  //   console.log('시작')
  //     const clickId = Number (e.currentTarget.id)
  // }

  const handleImgError = (e) => {
    e.preventDefault();
    e.target.src = "/favicon.ico"
  }

  return (
    <div className={styles.card_container} id={card.cm_num}>    
        <div className={styles.card_title}>{card.cm_title}</div>
        <div className={styles.card_details}>
            <ol>
                <ul style={{"margin-bottom":"10px"}}>[{card.cm_type}] {card.cm_content}</ul>
                {/* <ul>종류 : {card.cm_type}</ul> */}
            </ol>

            <div className={styles.img_item}>
              <img className={styles.img_item} src={'http://localhost:8000' + card.cm_image} onError={handleImgError}></img>
            </div>
        </div>

    </div>

  );
}