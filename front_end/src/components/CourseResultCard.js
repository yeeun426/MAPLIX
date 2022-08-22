// import { specialChars } from "@testing-library/user-event";
import styles from "./CommunityCard.module.css";
// import Modal from "./PostModal";
import React, { useState }from "react";


export default function SearchResultCard({card, setResult}) {

  
  const onClickPlace =()=> {
    if (window.confirm('경로에 추가하시겟습니까?')){
        setResult(card);
        alert("추가되었습니다")
    }
  }
  
  return (
    <div className={styles.SearchResultCard}>
      <div className={styles.search_container} onClick={onClickPlace}>    
        <div className={styles.search_title}>{card.p_name}</div>
        <div img_box>
            <ol>
                <ul className={styles.search_address}>{card.address}</ul>
                <ul>#{card.m_name}</ul>
                <ul>#{card.category}</ul>
                {/* <button onClick={onClickPlace}>추가하기</button> */}
            
            </ol>
            {/* <button type='submit' onClick={onClickLikeBtn}>즐겨찾기</button> */}
        </div>
      </div>
    </div>
  );
}