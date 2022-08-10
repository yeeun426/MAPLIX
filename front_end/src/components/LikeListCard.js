import { specialChars } from "@testing-library/user-event";
import { useState } from "react";
import styles from "./CommunityCard.module.css";
import Modal from "./PostModal";



export default function CommunityCard({card}) {
  

  return (
    <div className={styles.likeList_container} >  
        <div className={styles.like_img}>
          이미지 넣을 공간
        </div>  
        <div className={styles.like_txt}>
          <div className={styles.like_name}>{card.p_name}</div>
          <div img_box>
              <ol>
                  <ul>내용 : {card.l_num}</ul>
                  <ul>종류 : {card.address}</ul>
              </ol>
          </div>
        </div>
    </div>

  );
}