import { specialChars } from "@testing-library/user-event";
import { useState } from "react";
import styles from "./CommunityCard.module.css";
import Modal from "./PostModal";



export default function CommunityCard({card}) {
  

  return (
    <div className={styles.likeList_container} >  
        <div className={styles.like_img}>
          <img className={styles.like_img} src={'/location/location_' + card.l_image + '.png'}></img>
        </div>  
        <div className={styles.like_txt}>
          <div className={styles.like_name}>{card.p_name}</div>
          <div img_box>
              <ol>
                  <ul>{card.l_num}</ul>
                  <ul>{card.address}</ul>
                  <ul>#{card.m_name} #{card.m_type} #{card.category}</ul>
              </ol>
          </div>
        </div>
    </div>

  );
}