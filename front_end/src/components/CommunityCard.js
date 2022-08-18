// import { specialChars } from "@testing-library/user-event";
import styles from "./CommunityCard.module.css";
// import Modal from "./PostModal";
import {useEffect, useState} from "react"; 


export default function CommunityCard({card}) {

  // const onClickModal = (e) => {
  //   console.log('시작')
  //     const clickId = Number (e.currentTarget.id)
  // }

  return (
    <div className={styles.card_container} id={card.cm_num}>    
        <div className={styles.card_title}>{card.cm_title}</div>
        <div className={styles.card_details}>
            <ol>
                <ul style={{"margin-bottom":"10px"}}>[{card.cm_type}] {card.cm_content}</ul>
                {/* <ul>종류 : {card.cm_type}</ul> */}
            </ol>

            <div className={styles.img_item}>
              임시 이미지
            </div>
        </div>

    </div>

  );
}