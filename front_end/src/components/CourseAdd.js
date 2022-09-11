import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import styles from './CourseAdd.module.css';
import axios from "axios";
import '../pages/Course.css'
import Pagination from '../components/Pagination';

import click from '../img/click.png';
import addcourse from '../img/addcourse.png'

import CourseResultCard from './CourseResultCard'
import MapContainer from '../components/MapContainer';


// ㅈㄴ 노답버전

const CourseAdd = (props) => {

    const id = window.localStorage.getItem("id");

    const {activeCate} = props;
    const {cardList} = props;
    const {courselist} = props;

    // 첫 페이지 들어오면 즐겨찾기 true로 초기값
    // 필터 클릭은 course.js에서 -> 필터 클릭하면 그 activecate 혹은 filtered값을 courseAdd.js로 넘겨주기
    // courseAdd.js는 course에서 온 필터값 기반으로 api 요청
    // 이때 api는 즐겨찾기 결과 값 + 

    const [modal1, setModal1] = useState(false);
    const [changeNum1, setChangeNum1] = useState(false);
    const [result1, setResult1] = useState([]);

    const [modal2, setModal2] = useState(false);
    const [changeNum2, setChangeNum2] = useState(false);
    const [result2, setResult2] = useState([]);

    const [modal3, setModal3] = useState(false);
    const [changeNum3, setChangeNum3] = useState(false);
    const [result3, setResult3] = useState([]);

    const [modal4, setModal4] = useState(false);
    const [changeNum4, setChangeNum4] = useState(false);
    const [result4, setResult4] = useState([]);

    const [modal5, setModal5] = useState(false);
    const [changeNum5, setChangeNum5] = useState(false);
    const [result5, setResult5] = useState([]);

    const [modal6, setModal6] = useState(false);
    const [changeNum6, setChangeNum6] = useState(false);
    const [result6, setResult6] = useState([]);
    
    const [modal7, setModal7] = useState(false);
    const [changeNum7, setChangeNum7] = useState(false);
    const [result7, setResult7] = useState([]);
    
    const [modal8, setModal8] = useState(false);
    const [changeNum8, setChangeNum8] = useState(false);
    const [result8, setResult8] = useState([]);

    const [modal9, setModal9] = useState(false);
    const [changeNum9, setChangeNum9] = useState(false);
    const [result9, setResult9] = useState([]);


    const [count, setCount] = useState(0);

    

    useEffect(() => {
        if (Object.values(result1).length > 0){
            setModal1(false); setChangeNum1(true)
            // setCourselist(courselist => [...courselist, {one : result1} ]);
            courselist[0] = result1;
            setCount(1);
        }
        console.log(courselist);
        
    }, [result1])

    useEffect(() => {
        if (Object.values(result2).length > 0){
            setModal2(false); setChangeNum2(true)
            // setCourselist(courselist => [...courselist, {two: result2}]);
            courselist[1] = result2;
            setCount(2);
        }
    }, [result2])

    useEffect(() => {
        if (Object.values(result3).length > 0){
            setModal3(false); setChangeNum3(true)
            // setCourselist(courselist => [...courselist, {three: result3}]);
            courselist[2] = result3;
            setCount(3);
        }
    }, [result3])

    useEffect(() => {
        if (Object.values(result4).length > 0){
            setModal4(false); setChangeNum4(true)
            // setCourselist(courselist => [...courselist, {four: result4}]);
            courselist[3] = result4;
            setCount(4);
        }
    }, [result4])

    useEffect(() => {
        if (Object.values(result5).length > 0){
            setModal5(false); setChangeNum5(true)
            // setCourselist(courselist => [...courselist, {five: result5}]);
            courselist[4] = result5;
            setCount(5);
        }
    }, [result5])

    useEffect(() => {
        if (Object.values(result6).length > 0){
            setModal6(false); setChangeNum6(true)
            // setCourselist(courselist => [...courselist, {six: result6}]);
            courselist[5] = result6;
            setCount(6);
        }
    }, [result6])

    useEffect(() => {
        if (Object.values(result7).length > 0){
            setModal7(false); setChangeNum7(true)
            // setCourselist(courselist => [...courselist, {seven: result7}]);
            courselist[6] = result7;
            setCount(7);
        }
    }, [result7])

    useEffect(() => {
        if (Object.values(result8).length > 0){
            setModal8(false); setChangeNum8(true)
            // setCourselist(courselist => [...courselist, {eight: result8}]);
            courselist[7] = result8;
            setCount(8);
        }
    }, [result8])

    useEffect(() => {
        if (Object.values(result9).length > 0){
            setModal9(false); setChangeNum9(true)
            // setCourselist(courselist => [...courselist, {nine: result9}]);
            courselist[8] = result9;
            setCount(9);
        }
    }, [result9])

    const ClickedCate = () => {
        
        return(
            <div>
                { activeCate && activeCate.map((obj) => {
                    if (obj.flag === true)
                    return <span key={obj.category}>#{obj.realCate}&nbsp;</span> 
                })}
            </div>
        )
    }  
    const initialMyCourse = {
        mc_title: "",
        mc_content: "",
      };

    const [myCourse, setMyCourse] = useState(initialMyCourse);
    const {mc_title, mc_content} = myCourse;
    const [courseCreateModal, setcourseCreateModal] = useState(false);


    const courseCreate = (e) => {
        e.preventDefault();
        console.log("course create!!!");
        console.log(result1.p_name);
        // console.log(courselist.length);
        console.log(count);
        if (id === undefined) return alert("로그인 후 이용 가능합니다."), document.location.href = '/login';
        else return (
            setcourseCreateModal(!courseCreateModal)
        )
      }

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMyCourse({ ...myCourse, [name]: value });
      };
  
      const handleSubmit = (e) => {
        e.preventDefault();
        const course1 = result1.p_name;
        const course2 = result2.p_name;
        const course3 = result3.p_name;
        const course4 = result4.p_name;
        const course5 = result5.p_name;
        const course6 = result6.p_name;
        const course7 = result7.p_name;
        const course8 = result8.p_name;
        const course9 = result9.p_name;

        const res = axios.post("http://localhost:8000/api/coursecreate", {
          id,
          mc_title,
          mc_content,
          count,
          course1,
          course2,
          course3,
          course4,
          course5,
          course6,
          course7,
          course8,
          course9
        })
        .then((res) => {
          alert("success!")
        })
      }

      const [courseSea, setCourseSea] = useState(false);


        //cardList
        const [postsPerPage, setPostsPerPage] = useState(4); //페이지 당 게시물 수 
        const [currentPage, setCurrentPage] = useState(1); //현재 페이지 번호

        const indexOfLast = currentPage * postsPerPage; //postsPerPage : 총 데이터를 postsPerPage만큼 등분해서 보여줍니다.
        const indexOfFirst = indexOfLast - postsPerPage;
        const currentPosts = (posts) => {
        let currentPosts = 0;
        currentPosts = cardList.slice(indexOfFirst, indexOfLast);
        return currentPosts;
        };

    // const ResultCard = (e) => {
    //     return(
    //         <div className="modal_course_list">
    //             {cardList.map((card, index) => {
    //                 return (
    //                     <div card = {card}>
    //                         <CourseResultCard key={card.like_num} card={card} setResult={setResult1}/>
    //                     </div>
    //                 );
    //             })}      
    //         </div>
    //     )
    // }

    const courseModalClick = (e) => {
        if(document.getElementsByClassName('modalOn').length !== 0) {
            document.getElementsByClassName('modalOn')[0].classList.remove('modalOn') 
        }
        // debugger
        e.target.parentElement.lastChild.classList.add('modalOn')
    }

    return(
        <div className={styles.course_make}>
            <div className="course_list">
                {/* <CourseNum className="add-course" onClick={() => {setModal1(!modal1)}} top = "3%"> */}
                <CourseNum className="add-course" onClick={courseModalClick} top = "3%">
                    {!changeNum1 ? "+" : "1"}
                </CourseNum>

{/* 1 --------------------------------- */}
                {!changeNum1 ?
                <img src={click} alt="" />
                : null}

                <CourseList listTop="2%">
                    {result1 &&
                    <div>
                        <div className="course-add-title">{result1.p_name}</div>
                        <div className="course-add-cate">▶{result1.category}</div>
                    </div>
                    }
                </CourseList>

                {/* { modal1 ?  */}
                <ModalCourse ModalTop="3%">
                    {/* <div onClick={()=>{setModal1(false); setChangeNum1(true)}}>모달</div> */}
                    <ClickedCate/>
                    <div className="modal_course_list">
                        
                        {currentPosts(cardList).map((card, index) => {
                            return (
                                <div className="modal_course_container" card = {card}>
                                    <CourseResultCard key={card.l_num} card={card} setResult={setResult1}/>
                                </div>
                            );
                        })}      
                    </div>
                <Pagination
                postsPerPage={postsPerPage}
                totalPosts={cardList.length}
                paginate={setCurrentPage}
                />
                    
                </ModalCourse>
                {/* : null } */}
            </div>

{/* 2 --------------------------------- */}
            {changeNum1 ?
            <div className="course_list">
                <CourseNum className="add-course" onClick={courseModalClick} backColor="#F7EA70" top = "14%">
                    {!changeNum2 ? "+" : "2"}
                </CourseNum>

                <CourseList listTop="13%">
                    <div className="course-add-title">{result2.p_name}</div>
                    <div className="course-add-cate">▶{result2.category}</div>
                </CourseList>

                {/* { modal2 ?  */}
                <ModalCourse ModalTop = "14%">
                    {/* <span onClick={()=>{setModal2(false); setChangeNum2(true)}}>모달</span>  */}
                    <ClickedCate/>
                    <div className="modal_course_list">
                        {cardList.map((card, index) => {
                            return (
                                <div className="modal_course_container" card = {card}>
                                    <CourseResultCard key={card.l_num} card={card} setResult={setResult2}/>
                                </div>
                            );
                        })}      
                    </div>
                </ModalCourse>
                {/* : null } */}
            </div>
            : null}

{/* 3 --------------------------------- */}
            {changeNum1 && changeNum2 ?
            <div className="course_list">
                <CourseNum className="add-course" onClick={courseModalClick} top="25%">
                    {!changeNum3 ? "+" : "3"}
                </CourseNum>

                <CourseList listTop="24%">
                    <div className="course-add-title">{result3.p_name}</div>
                    <div className="course-add-cate">▶{result3.category}</div>
                </CourseList>

                {/* { modal3 ?  */}
                <ModalCourse ModalTop = "25%">
                    {/* <span onClick={()=>{setModal3(false); setChangeNum3(true)}}>모달</span>  */}
                    <ClickedCate/>
                    {/* <ResultCard /> */}
                    <div className="modal_course_list">
                        {cardList.map((card, index) => {
                            return (
                                <div className="modal_course_container" card = {card}>
                                    <CourseResultCard key={card.l_num} card={card} setResult={setResult3}/>
                                </div>
                            );
                        })}      
                    </div>
                </ModalCourse>
                {/* : null } */}
            </div>
            :null}

{/* 4 --------------------------------- */}            

            {changeNum1 && changeNum2 && changeNum3 ?
            <div className="course_list">
                <CourseNum className="add-course" backColor="#F7EA70" onClick={courseModalClick} top="36%">
                    {!changeNum4 ? "+" : "4"}
                </CourseNum>

                <CourseList listTop="35%">
                    <div className="course-add-title">{result4.p_name}</div>
                    <div className="course-add-cate">▶{result4.category}</div>
                </CourseList>

                <ModalCourse ModalTop="36%">
                    {/* <span onClick={()=>{setModal4(false); setChangeNum4(true)}}>모달</span>  */}
                    <ClickedCate/>
                    {/* <ResultCard /> */}
                    <div className="modal_course_list">
                        {cardList.map((card, index) => {
                            return (
                                <div className="modal_course_container" card = {card}>
                                    <CourseResultCard key={card.l_num} card={card} setResult={setResult4}/>
                                </div>
                            );
                        })}      
                    </div>
                </ModalCourse>
            </div>
            :null}

{/* 5 --------------------------------- */}            

            {changeNum1 && changeNum2 && changeNum3 && changeNum4 ?
            <div className="course_list">
                <CourseNum className="add-course" onClick={courseModalClick} top="47%">
                    {!changeNum5 ? "+" : "5"}
                </CourseNum>

                <CourseList listTop="46%">
                    <div className="course-add-title">{result5.p_name}</div>
                    <div className="course-add-cate">▶{result5.category}</div>
                </CourseList>

                <ModalCourse ModalTop="47%">
                    <ClickedCate/>
                    <div className="modal_course_list">
                        {currentPosts(cardList).map((card, index) => {
                            return (
                                <div className="modal_course_container" card = {card}>
                                    <CourseResultCard key={card.l_num} card={card} setResult={setResult5}/>
                                </div>
                            );
                        })}      
                    </div>
                </ModalCourse>
            </div>
            :null}

{/* 6 --------------------------------- */}

            {changeNum1 && changeNum2 && changeNum3 && changeNum4 && changeNum5 ?
            <div className="course_list">
                <CourseNum className="add-course" backColor="#F7EA70" onClick={courseModalClick} top="58%">
                    {!changeNum6 ? "+" : "6"}
                </CourseNum>

                <CourseList listTop="57%">
                    <div className="course-add-title">{result6.p_name}</div>
                    <div className="course-add-cate">▶{result6.category}</div>
                </CourseList>

                <ModalCourse ModalTop="58%">
                    {/* <span onClick={()=>{setModal6(false); setChangeNum6(true)}}>모달</span>  */}
                    <ClickedCate/>
                    {/* <ResultCard /> */}
                    <div className="modal_course_list">
                        {cardList.map((card, index) => {
                            return (
                                <div className="modal_course_container" card = {card}>
                                    <CourseResultCard key={card.l_num} card={card} setResult={setResult6}/>
                                </div>
                            );
                        })}      
                    </div>
                </ModalCourse>
            </div>
            :null}

{/* 7 --------------------------------- */}

            {changeNum1 && changeNum2 && changeNum3 && changeNum4 && changeNum5 && changeNum6 ?
            <div className="course_list">
                <CourseNum className="add-course" onClick={courseModalClick} top="69%">
                    {!changeNum7 ? "+" : "7"}
                </CourseNum>

                <CourseList listTop="68%">
                    <div className="course-add-title">{result7.p_name}</div>
                    <div className="course-add-cate">▶{result7.category}</div>
                </CourseList>

                <ModalCourse ModalTop="53%">
                    <ClickedCate/>
                    <div className="modal_course_list">
                        {cardList.map((card, index) => {
                            return (
                                <div className="modal_course_container" card = {card}>
                                    <CourseResultCard key={card.l_num} card={card} setResult={setResult7}/>
                                </div>
                            );
                        })}      
                    </div>
                    
                </ModalCourse>
            </div>
            :null}

{/* 8 --------------------------------- */}

            {changeNum1 && changeNum2 && changeNum3 && changeNum4 && changeNum5 && changeNum6 && changeNum7?
            <div className="course_list">
                <CourseNum className="add-course" backColor="#F7EA70" onClick={courseModalClick} top="80%">
                    {!changeNum8 ? "+" : "8"}
                </CourseNum>

                <CourseList listTop="79%">
                    <div className="course-add-title">{result8.p_name}</div>
                    <div className="course-add-cate">▶{result8.category}</div>
                </CourseList>

                <ModalCourse ModalTop="53%">
                    <ClickedCate/>
                    <div className="modal_course_list">
                        {cardList.map((card, index) => {
                            return (
                                <div className="modal_course_container" card = {card}>
                                    <CourseResultCard key={card.l_num} card={card} setResult={setResult8}/>
                                </div>
                            );
                        })}      
                    </div>
                </ModalCourse>
            </div>
            :null}

{/* 9 --------------------------------- */}

            {changeNum1 && changeNum2 && changeNum3 && changeNum4 && changeNum5 && changeNum6 && changeNum7 && changeNum8 ?
            <div className="course_list">
                <CourseNum className="add-course" onClick={courseModalClick} top="91%">
                    {!changeNum9 ? "+" : "9"}
                </CourseNum>

                <CourseList listTop="90%">
                    <div className="course-add-title">{result9.p_name}</div>
                    <div className="course-add-cate">▶{result9.category}</div>
                </CourseList>

                <ModalCourse ModalTop="53%">
                    <ClickedCate/>
                    <div className="modal_course_list">
                        {cardList.map((card, index) => {
                            return (
                                <div className="modal_course_container" card = {card}>
                                    <CourseResultCard key={card.l_num} card={card} setResult={setResult9}/>
                                </div>
                            );
                        })}      
                    </div>
                </ModalCourse>
            </div>
            :null}


            <button className={styles.course_sea_btn} onClick={()=>{setCourseSea(true);}} >코스 확인하기</button>
            <button className={styles.course_create_btn} onClick={courseCreate}><img src={addcourse} alt="addcourse" /></button>
            {courseCreateModal ?
            <div className={styles.course_modal}>
                글쓰기
                <form onSubmit={handleSubmit}>
                    <div className={styles.course_modal_title}>
                        <label htmlFor='mc_title'>제목</label>
                        <input
                        type="text"
                        id="mc_title"
                        name="mc_title"
                        placeholder='제목'
                        value={myCourse.mc_title}
                        onChange={handleInputChange}
                        />
                    </div>

                    <div className={styles.course_modal_container}>
                        <label htmlFor='mc_content'>내용</label>
                        <input className={styles.content}
                        type="text"
                        id="mc_content"
                        name="mc_content"
                        placeholder='내용'
                        value={myCourse.mc_content}
                        onChange={handleInputChange}
                        />
                    </div>
                    <input className={styles.btn_submit} type="submit" value="등록" />        
                </form>
            </div>
            : null}
        </div>
    )
}

    const CourseNum = styled.button`
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        font-size: 22px;
        font-weight: bold;
        background-color: ${(props)=>props.backColor || "#79bc82"};
        top: ${(props)=>props.top};
        left: 6%;
    `

    const ModalCourse = styled.div`
        display: none;
        background-color: #e0edf1;
        width: 280px;
        height: 560px;
        border-radius: 30px;
        box-shadow: 3px 3px 3px #80808075;
        z-index: 3;
        position: absolute;
        top: ${(props)=>props.ModalTop};
        left: 100%;

        .modal_course_container{
            box-sizing: border-box;
            padding: 10px 20px;
            text-align: left;
        }

        .modal_course_container:hover{
            background-color: #bccbc494;
            cursor: pointer;
        }

    `
    const CourseList = styled.div`
        background-color: white;
        width: 213px;
        height: 80px;
        border-radius: 30px;
        box-shadow: 3px 3px 3px #80808075;

        position: absolute;
        top: ${(props)=>props.listTop};
        left: 25%;

        .course-add-title{
            padding-top: 15px;
            font-family: 'yg-jalnan';
        }  
        
        .course-add-cate{
            font-size: 15px;
        }
    `
export default CourseAdd;