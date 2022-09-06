// src/pages/WriteStamp.js
import Layout from '../components/Layout';
import styles from '../components/Community.module.css';
import styles2 from "./CommunityCard.module.css";
import { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function WriteStamp({card, openModal}) {
// const WriteStamp = () => {
    const id = window.localStorage.getItem("id");

    const poster = card.poster;
    const m_num = card.m_num;

    const initialRecord = {
      record_title: "",
      record_content: "",
    };

    const [stampModal, setStampModal] = useState(false);
    
    console.log(id, poster, m_num);

    const [record, setRecord] = useState(initialRecord);
    const {record_title, record_content} = record;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRecord({ ...record, [name]: value });
    };

    const handleSubmit = (e) => {
      console.log(record_title, record_content);
      e.preventDefault();
      const part = window.localStorage.getItem("part");

      const res = axios.post("http://localhost:8000/api/writestamp", {
        id,
        m_num,
        poster,
        part,
        record_title,
        record_content,
      })
      .then((res) => {
        alert("success!")
        console.log(res.data[0])
      })
    }

    const clickPoster1 = (e) => {
      e.preventDefault();
      console.log("poster1 click!");
      const part = 1;
      window.localStorage.setItem('part', 1);

      const res = axios.post("http://localhost:8000/api/stampcheck", {
        id,
        m_num,
        poster,
        part
      })
      .then((res) => {
        // console.log(res.data[0].record_title1);
        if (res.data[0].record_title1 != 'null') {
          // const record_title = res.data[0].record_title1;
          // const record_content = res.data[0].record_content1;
          // console.log(record_title, record_content);

          setRecord({record_title: res.data[0].record_title1, record_content: res.data[0].record_content1});
        }
      })
      setStampModal(!stampModal);
    }

    const clickPoster2 = (e) => {
      e.preventDefault();
      console.log("poster2 click!")
      const part = 2
      window.localStorage.setItem('part', 2);

      const res = axios.post("http://localhost:8000/api/stampcheck", {
        id,
        m_num,
        poster,
        part
      })
      .then((res) => {
        // console.log(res.data[0].record_title1);
        if (res.data[0].record_title2 != 'null') {
          // const record_title = res.data[0].record_title1;
          // const record_content = res.data[0].record_content1;
          // console.log(record_title, record_content);

          setRecord({record_title: res.data[0].record_title2, record_content: res.data[0].record_content2});
        }
      })
      setStampModal(!stampModal);
    }

    const clickPoster3 = (e) => {
      e.preventDefault();
      console.log("poster1 click!");
      const part = 3;
      window.localStorage.setItem('part', 3);

      const res = axios.post("http://localhost:8000/api/stampcheck", {
        id,
        m_num,
        poster,
        part
      })
      .then((res) => {
        // console.log(res.data[0].record_title1);
        if (res.data[0].record_title3 != 'null') {
          // const record_title = res.data[0].record_title1;
          // const record_content = res.data[0].record_content1;
          // console.log(record_title, record_content);

          setRecord({record_title: res.data[0].record_title3, record_content: res.data[0].record_content3});
        }
      })
      setStampModal(!stampModal);
    }

    const clickPoster4 = (e) => {
      e.preventDefault();
      console.log("poster3 click!");
      const part = 4;
      window.localStorage.setItem('part', 4);

      const res = axios.post("http://localhost:8000/api/stampcheck", {
        id,
        m_num,
        poster,
        part
      })
      .then((res) => {
        // console.log(res.data[0].record_title1);
        if (res.data[0].record_title4 != 'null') {
          // const record_title = res.data[0].record_title1;
          // const record_content = res.data[0].record_content1;
          // console.log(record_title, record_content);

          setRecord({record_title: res.data[0].record_title4, record_content: res.data[0].record_content4});
        }
      })
      setStampModal(!stampModal);
    }

    


  return (
    <Layout activeMenu="stamp">
      <div className={styles.stamp_form_container}>
                {/* <div>{poster}</div> */}
                <img src={'/poster/poster_' + m_num + '_1.jpg'} className={styles.img_item} onClick={clickPoster1}></img>
                <img src={'/poster/poster_' + m_num + '_2.jpg'} className={styles.img_item} onClick={clickPoster2}></img>
                <img src={'/poster/poster_' + m_num + '_3.jpg'} className={styles.img_item} onClick={clickPoster3}></img>
                <img src={'/poster/poster_' + m_num + '_4.jpg'} className={styles.img_item} onClick={clickPoster4}></img>
              </div>
      <div className={styles.title_like}>도장깨기</div>
      {stampModal ?
      <div className={styles2.mycourse_modal}>
        글쓰기
        <form 
          className={styles.form_container}
          onSubmit={handleSubmit}
        >
          <div className={styles.write_item}>
            <label htmlFor='record_title'>제목</label>
            <input
            type="text"
            id="record_title"
            name="record_title"
            placeholder='제목'
            vlaue={record.record_title}
            onChange={handleInputChange}
            />
          </div>

          <div className={styles.write_item}>
            <label htmlFor='record_content'>내용</label>
            <input className={styles.content}
            type="text"
            id="record_content"
            name="record_content"
            placeholder='내용'
            vlaue={record.record_content}
            onChange={handleInputChange}
            />
          </div>

          <input className={styles.btn_submit} type="submit" value="등록" />        

        </form>
            
      </div>
      : null}
    </Layout>
    
  );
  
}


// export default WriteStamp;