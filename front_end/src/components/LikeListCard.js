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
                  <ul>{card.l_num}</ul>
                  <ul>주소 : {card.address}</ul>
                  <ul>#{card.m_name} #{card.m_type} #{card.category}</ul>
              </ol>
          </div>
        </div>
    </div>

  );
}