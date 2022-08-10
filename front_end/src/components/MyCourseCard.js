import { specialChars } from "@testing-library/user-event";
import { useState } from "react";
import styles from "./CommunityCard.module.css";
import Modal from "./PostModal";



export default function CommunityCard({card, openModal}) {
  const [courseModal, setCourseModal] = useState(false);

  return (
    <div className={styles.MyCourseCard}>
      <div className={styles.likeList_container} onClick={() => {setCourseModal(!courseModal)}}>    
          <div className={styles.like_img}>
            이미지 넣을 공간
          </div> 

          <div className={styles.like_txt}>
            <div className={styles.like_name}>{card.mc_title}</div>
            <div img_box>
              <ol>
                  <ul>내용 : {card.my_course}</ul>
              </ol>
            </div>
          </div>
      </div>
      {courseModal ?
      <div className={styles.mycourse_modal}>
        엥
      </div>
      : null}
    </div>
  );
}