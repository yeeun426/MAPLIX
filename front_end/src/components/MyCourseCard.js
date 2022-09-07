import { specialChars } from "@testing-library/user-event";
import { useState } from "react";
import styles from "./CommunityCard.module.css";
import Modal from "./PostModal";
import axios from 'axios';




export default function CommunityCard({card, openModal}) {
  const id = window.localStorage.getItem("id");

  const [courseModal, setCourseModal] = useState(false);  

  const [course1, setCourse1] = useState([]);
  const [course2, setCourse2] = useState([]);
  const [course3, setCourse3] = useState([]);
  const [course4, setCourse4] = useState([]);
  const [course5, setCourse5] = useState([]);
  const [course6, setCourse6] = useState([]);
  const [course7, setCourse7] = useState([]);
  const [course8, setCourse8] = useState([]);
  const [course9, setCourse9] = useState([]);

  const clickCourseModal = (e) => {
    e.preventDefault();
    console.log("modal click!");

    setCourse1(card.my_course.split("/")[0]);
    setCourse2(card.my_course.split("/")[1]);
    setCourse3(card.my_course.split("/")[2]);
    setCourse4(card.my_course.split("/")[3]);
    setCourse5(card.my_course.split("/")[4]);
    setCourse6(card.my_course.split("/")[5]);
    setCourse7(card.my_course.split("/")[6]);
    setCourse8(card.my_course.split("/")[7]);
    setCourse9(card.my_course.split("/")[8]);

    console.log(course1, course2, course3);
    setCourseModal(!courseModal);
  }

  return (
    <div className={styles.MyCourseCard}>
      {/* <div className={styles.likeList_container} onClick={() => {setCourseModal(!courseModal)}}>     */}
      <div className={styles.likeList_container} onClick={clickCourseModal}>    
          <div className={styles.like_img}>
            이미지 넣을 공간
          </div> 

          <div className={styles.like_txt}>
            <div className={styles.like_name}>{card.mc_title}</div>
            <div img_box>
              <ol>
                  <ul>내용 : {card.mc_content}</ul>
              </ol>
            </div>
          </div>
      </div>
      {courseModal ?
      <div className={styles.mycourse_modal}>
        {card.mc_num}
        {card.mc_title}
        <div>
          {card.my_course}<br></br>
          <br></br>
          {course1}<br></br>
          {course2}<br></br>
          {course3}<br></br>
          {course4}<br></br>
          {course5}<br></br>
          {course6}<br></br>
          {course7}<br></br>
          {course8}<br></br>
          {course9}<br></br>
        </div>
      </div>
      : null}
    </div>
  );
}