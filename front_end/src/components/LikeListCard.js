import { specialChars } from "@testing-library/user-event";
import { useState } from "react";
import styles from "./CommunityCard.module.css";
import Modal from "./PostModal";



export default function CommunityCard({card}) {
  

  return (
    <div className={styles.card_container} >    
        <h2>{card.p_name}</h2>
        <div img_box>
            <ol>
                <ul>내용 : {card.l_num}</ul>
                <ul>종류 : {card.address}</ul>
            </ol>
        </div>

    </div>

  );
}