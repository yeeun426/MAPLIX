import { specialChars } from "@testing-library/user-event";
import { useState } from "react";
import styles from "./CommunityCard.module.css";
import Modal from "./PostModal";



export default function CommunityCard({card, openModal}) {
  

  return (
    <div className={styles.card_container} onClick={openModal}>    
        <h2>{card.mc_title}</h2>
        <div img_box>
            <ol>
                <ul>내용 : {card.my_course}</ul>
                
            </ol>
        </div>

    </div>

  );
}