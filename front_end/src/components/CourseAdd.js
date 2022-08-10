import React, { useState } from "react";
import styled from 'styled-components';
import styles from './CourseAdd.module.css';

import click from '../img/click.png';

function CourseAdd() {
    const [modal1, setModal1] = useState(false);
    const [changeNum1, setChangeNum1] = useState(false);

    const [modal2, setModal2] = useState(false);
    const [changeNum2, setChangeNum2] = useState(false);

    const [modal3, setModal3] = useState(false);
    const [changeNum3, setChangeNum3] = useState(false);

    const [modal4, setModal4] = useState(false);
    const [changeNum4, setChangeNum4] = useState(false);

    const [modal5, setModal5] = useState(false);
    const [changeNum5, setChangeNum5] = useState(false);

    const [modal6, setModal6] = useState(false);
    const [changeNum6, setChangeNum6] = useState(false);
    
    const [modal7, setModal7] = useState(false);
    const [changeNum7, setChangeNum7] = useState(false);
    
    const [modal8, setModal8] = useState(false);
    const [changeNum8, setChangeNum8] = useState(false);

    const [modal9, setModal9] = useState(false);
    const [changeNum9, setChangeNum9] = useState(false);

    return(
        <div className={styles.course_make}>
            <div className="course_list">
                <CourseNum className="add-course" onClick={() => {setModal1(!modal1)}} top = "3%">
                    {!changeNum1 ? "+" : "1"}
                </CourseNum>

                {!changeNum1 ?
                <img src={click} alt="" />
                : null}

                <CourseList listTop="2%">
                    빈칸
                </CourseList>

                { modal1 ? 
                <ModalCourse ModalTop="3%">
                    <div onClick={()=>{setModal1(false); setChangeNum1(true)}}>
                        모달
                    </div> 
                </ModalCourse>
                : null }
            </div>

            {changeNum1 ?
            <div className="course_list">
                <CourseNum className="add-course" onClick={() => {setModal2(!modal2)}}  backColor="#F7EA70" top = "14%">
                    {!changeNum2 ? "+" : "2"}
                </CourseNum>

                <CourseList listTop="13%">
                    빈칸
                </CourseList>

                { modal2 ? 
                <ModalCourse ModalTop = "14%">
                    <span onClick={()=>{setModal2(false); setChangeNum2(true)}}>모달</span> 
                </ModalCourse>
                : null }
            </div>
            : null}

            {changeNum1 && changeNum2 ?
            <div className="course_list">
                <CourseNum className="add-course" onClick={() => {setModal3(!modal3)}} top="25%">
                    {!changeNum3 ? "+" : "3"}
                </CourseNum>

                <CourseList listTop="24%">
                    빈칸
                </CourseList>

                { modal3 ? 
                <ModalCourse ModalTop = "25%">
                    <span onClick={()=>{setModal3(false); setChangeNum3(true)}}>모달</span> 
                </ModalCourse>
                : null }
            </div>
            :null}

            {changeNum1 && changeNum2 && changeNum3 ?
            <div className="course_list">
                <CourseNum className="add-course" backColor="#F7EA70" onClick={() => {setModal4(!modal4)}} top="36%">
                    {!changeNum4 ? "+" : "4"}
                </CourseNum>

                <CourseList listTop="35%">
                    빈칸
                </CourseList>

                { modal4 ? 
                <ModalCourse ModalTop="36%">
                    <span onClick={()=>{setModal4(false); setChangeNum4(true)}}>모달</span> 
                </ModalCourse>
                : null }
            </div>
            :null}

            {changeNum1 && changeNum2 && changeNum3 && changeNum4 ?
            <div className="course_list">
                <CourseNum className="add-course" onClick={() => {setModal5(!modal5)}} top="47%">
                    {!changeNum5 ? "+" : "5"}
                </CourseNum>

                <CourseList listTop="46%">
                    빈칸
                </CourseList>

                { modal5 ? 
                <ModalCourse ModalTop="47%">
                    <span onClick={()=>{setModal5(false); setChangeNum5(true)}}>모달</span> 
                </ModalCourse>
                : null }
            </div>
            :null}

            {changeNum1 && changeNum2 && changeNum3 && changeNum4 && changeNum5 ?
            <div className="course_list">
                <CourseNum className="add-course" backColor="#F7EA70" onClick={() => {setModal6(!modal6)}} top="58%">
                    {!changeNum6 ? "+" : "6"}
                </CourseNum>

                <CourseList listTop="57%">
                    빈칸
                </CourseList>

                { modal6 ? 
                <ModalCourse ModalTop="58%">
                    <span onClick={()=>{setModal6(false); setChangeNum6(true)}}>모달</span> 
                </ModalCourse>
                : null }
            </div>
            :null}

            {changeNum1 && changeNum2 && changeNum3 && changeNum4 && changeNum5 && changeNum6 ?
            <div className="course_list">
                <CourseNum className="add-course" onClick={() => {setModal7(!modal7)}} top="69%">
                    {!changeNum7 ? "+" : "7"}
                </CourseNum>

                <CourseList listTop="68%">
                    빈칸
                </CourseList>

                { modal7 ? 
                <ModalCourse ModalTop="53%">
                    <span onClick={()=>{setModal7(false); setChangeNum7(true)}}>모달</span> 
                </ModalCourse>
                : null }
            </div>
            :null}

            {changeNum1 && changeNum2 && changeNum3 && changeNum4 && changeNum5 && changeNum6 && changeNum7?
            <div className="course_list">
                <CourseNum className="add-course" backColor="#F7EA70" onClick={() => {setModal8(!modal8)}} top="80%">
                    {!changeNum8 ? "+" : "8"}
                </CourseNum>

                <CourseList listTop="79%">
                    빈칸
                </CourseList>

                { modal8 ? 
                <ModalCourse ModalTop="53%">
                    <span onClick={()=>{setModal8(false); setChangeNum8(true)}}>모달</span> 
                </ModalCourse>
                : null }
            </div>
            :null}

            {changeNum1 && changeNum2 && changeNum3 && changeNum4 && changeNum5 && changeNum6 && changeNum7 && changeNum8 ?
            <div className="course_list">
                <CourseNum className="add-course" onClick={() => {setModal9(!modal9)}} top="91%">
                    {!changeNum9 ? "+" : "9"}
                </CourseNum>

                <CourseList listTop="90%">
                    빈칸
                </CourseList>

                { modal9 ? 
                <ModalCourse ModalTop="53%">
                    <span onClick={()=>{setModal9(false); setChangeNum9(true)}}>모달</span> 
                </ModalCourse>
                : null }
            </div>
            :null}
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
        background-color: #e0edf1;
        width: 280px;
        height: 430px;
        border-radius: 30px;
        box-shadow: 3px 3px 3px #80808075;

        position: absolute;
        top: ${(props)=>props.ModalTop};
        left: 100%;
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
    `
export default CourseAdd;