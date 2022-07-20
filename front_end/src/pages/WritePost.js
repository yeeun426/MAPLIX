// src/pages/writepost.js
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import CommunitySideBar from './CommunitySidebar';
import styles from '../components/Community.module.css';
import axios from "axios";
import React, {useState, useEffect} from 'react';
import {useHistory, useParams, Link} from 'react-router-dom';

function WritePost(){

  
    console.log("글쓰기")
    return(
        <div>
            {/* <Navbar/> */}
            <div className={styles.sidebar}>
                <CommunitySideBar/>
            </div>
            <div className={styles.postbox}>

                제목 : 
                <input />
                <br></br><br></br>

                내용 : 
                <input className={styles.content}/>
                <input type="file"/>
                <br></br><br></br>

                <button>업로드</button>
            </div>
        </div>
    );
}

export default WritePost;