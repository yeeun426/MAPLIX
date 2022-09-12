import { specialChars } from "@testing-library/user-event";
import { useState } from "react";
import styles from "./CommunityCard.module.css";
import Modal from "./PostModal";
import axios from 'axios';
import styled from 'styled-components';

export default function CommunityCard({card, openModal}) {
  const id = window.localStorage.getItem("id");

  const [courseModal, setCourseModal] = useState(false);  

  const[course, setCourse] = useState([]);
  // const [course1, setCourse1] = useState([]);
  // const [course2, setCourse2] = useState([]);
  // const [course3, setCourse3] = useState([]);
  // const [course4, setCourse4] = useState([]);
  // const [course5, setCourse5] = useState([]);
  // const [course6, setCourse6] = useState([]);
  // const [course7, setCourse7] = useState([]);
  // const [course8, setCourse8] = useState([]);
  // const [course9, setCourse9] = useState([]);

  const clickCourseModal = (e) => {
    e.preventDefault();
    console.log("modal click!");
    setCourse(card.my_course.split("/"))
    // debugger
    // setCourse1(card.my_course.split("/")[0]);
    // setCourse2(card.my_course.split("/")[1]);
    // setCourse3(card.my_course.split("/")[2]);
    // setCourse4(card.my_course.split("/")[3]);
    // setCourse5(card.my_course.split("/")[4]);
    // setCourse6(card.my_course.split("/")[5]);
    // setCourse7(card.my_course.split("/")[6]);
    // setCourse8(card.my_course.split("/")[7]);
    // setCourse9(card.my_course.split("/")[8]);

    // console.log(course1, course2, course3);
    setCourseModal(!courseModal);
  }

  const handleImgError = (e) => {
    e.preventDefault();
    e.target.src = "/favicon.ico"
  }

  return (
    <div className={styles.MyCourseCard}>
      {/* <div className={styles.likeList_container} onClick={() => {setCourseModal(!courseModal)}}>     */}
      <div className={styles.likeList_container} onClick={clickCourseModal}>    
          <div className={styles.like_img}>
          <img className={styles.like_img} src={'http://localhost:8000' + card.mc_image} onError={handleImgError}></img>
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
      <ModalOverlayStyle>
        <div className="mycourse_modal">
        <hr/>
        <div style={{display: 'flex', justifyContent:"space-between"}}>
          <div></div>
          <div className="mycourse_modal_title">{card.mc_title}</div>
          <button onClick={()=>{setCourseModal(false)}}>✖</button>
        </div>

          <div>
            {course.map((course, index)=>(
            <div key={index} className = "mycourse_items">
              <CourseNum>
                  {index+1}
              </CourseNum>
              <CourseList>
                {course}
              </CourseList>
            </div>
            ))}
          </div>
        </div>
      </ModalOverlayStyle>
      :null}

      {/* {courseModal ?
      <ModalOverlayStyle>
        
      <div className="mycourse_modal">
        <div className="mycourse_modal_title">{card.mc_title}</div>
        <div>
          <div className = "mycourse_items">
            <CourseNum backColor="#F7EA70">
                1
            </CourseNum>

            <CourseList>
              {course1}
            </CourseList>
          </div>
          <div>
            <CourseNum>
                2
            </CourseNum>

            <CourseList>
              {course2}
            </CourseList>
          </div>

          <div>
            <CourseNum backColor="#F7EA70">
                3
            </CourseNum>

            <CourseList>
              {course3}
            </CourseList>
          </div>
          
          <div>
            <CourseNum>
                4
            </CourseNum>

            <CourseList>
              {course4}
            </CourseList>
          </div>
          <div>{course5}</div>
          <div>{course6}</div>
          <div>{course7}</div>
          <div>{course8}</div>
          <div>{course9}</div>
        </div> 
        <button onClick={()=>{setCourseModal(false)}}>닫아</button>
      </div>
      </ModalOverlayStyle>
      : null} */}
    </div>
  );
}

export const ModalOverlayStyle = styled.div`
  z-index: 999;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.5);

  .mycourse_items{
    display: flex;
    margin-top: 10px;
    gap: 9px;
    place-content: center;
  }
  
  .mycourse_modal::-webkit-scrollbar{
    display:none;
  }

  .mycourse_modal{    
    -ms-overflow-style: none;
    background-color: #e0edf1;
    width: 400px;
    height: 530px;
    box-shadow: 5px 3px 5px #0000003d;
    border-radius: 30px;
    border-top-left-radius: 0px;
    left: 82%;
    z-index: 1;
    padding: 15px;
    box-sizing: border-box;  
  }

  .mycourse_modal hr{
    border: none;
    border-left: 2px solid darkgray;
    /* width: 1px; */
    height: 473px;
    background: transparent;
    position: absolute;
    z-index: -1;
    left: 40.8%;
    top: 125px;
  }

  .mycourse_modal_title{
    font-family: 'yg-jalnan';
    font-size: 18px;
  }
`

const CourseNum = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 22px;
  font-weight: bold;
  background-color: #F7EA70;
`

const CourseList = styled.div`
  width: fit-content;
  background-color: white;
  border-radius: 10px;
  box-shadow: 3px 3px 3px #80808075;
  font-family: 'yg-jalnan';
  width: 270px;
  padding: 10px 20px;
  font-size: 14px;
  height: 40px;
  text-align: left;
  box-sizing: border-box;
`