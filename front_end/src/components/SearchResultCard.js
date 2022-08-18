// import { specialChars } from "@testing-library/user-event";
import styles from "./CommunityCard.module.css";
// import Modal from "./PostModal";
import React, { useState }from "react";


export default function SearchResultCard({card}) {
  const [detail, setDetail] = useState(false); 
  
  const onClickPlace =()=> {
      setDetail(true);
  }
    // const onClickLikeBtn = () => {
    //     fetch(`${API.carts}/${lecture_id}`, {
    //       method: 'POST',
    //       headers: {
    //         Authorization: getToken(),
    //       },
    //     }).then(res => {
    //       setIsLiked(res.status === 201);
    //       getCardListData();
    //     });
    // };

  return (
    <div className={styles.SearchResultCard}>
      <div className={styles.search_container} onClick={onClickPlace}>    
        <div className={styles.search_title}>{card.p_name}</div>
        <div img_box>
            <ol>
                <ul className={styles.search_address}>{card.address}</ul>
                <ul>#{card.m_name}</ul>
                <ul>#{card.category}</ul>
            
            </ol>
            {/* <button type='submit' onClick={onClickLikeBtn}>즐겨찾기</button> */}
        </div>
      </div>

      {detail ?
      <div className={styles.search_detail} onClick={()=>{setDetail(false)}}>
          <div className={styles.sm_img}>
            임시 사진
          </div>
          <div className={styles.sm_title}>{card.p_name}</div>
          <ul>{card.address}</ul>
          <ul>#{card.m_name}</ul>
          <ul>#{card.category}</ul>
      </div>
      : null}
    </div>
  );
}