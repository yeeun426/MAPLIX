// src/pages/WriteStamp.js
import Layout from '../components/Layout';
import styles from '../components/Community.module.css';
import styles2 from "./CommunityCard.module.css";
import { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function WriteStamp({card, openModal}) {
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


    // 데이터 가져오기
  const loadPost = async () => {
    const response = await axios.post('http://localhost:8000/api/stampcheck'
    , {id, m_num, poster}
    );
    console.log(response.data[0]);
    if (response.data[0].record_title1 != undefined) 
      return setRecord1(true);    
  };

  const loadPost2 = async () => {
    const response = await axios.post('http://localhost:8000/api/stampcheck'
    , {id, m_num, poster}
    );
    console.log(response.data[0]);
    if (response.data[0].record_title2 != undefined) 
      return setRecord2(true);
  };

  const loadPost3 = async () => {
    const response = await axios.post('http://localhost:8000/api/stampcheck'
    , {id, m_num, poster}
    );
    console.log(response.data[0]);
    if (response.data[0].record_title3 != undefined) 
      return setRecord3(true);
  };

  const loadPost4 = async () => {
    const response = await axios.post('http://localhost:8000/api/stampcheck'
    , {id, m_num, poster}
    );
    console.log(response.data[0]);
    if (response.data[0].record_title4 != undefined) 
      return setRecord4(true);
  };

  // 현재상태값, 그 상태값을 갱신해주는 함수 / post 초기값 ( 빈배열 )
  const [record1, setRecord1] = useState();
  const [record2, setRecord2] = useState();
  const [record3, setRecord3] = useState();
  const [record4, setRecord4] = useState();

  // 컴포넌트가 렌더링 될때마다 특정 작업 실행되도록
  useEffect(()=> {
      loadPost();
      loadPost2();
      loadPost3();
      loadPost4();
    }, [] );


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRecord({ ...record, [name]: value });
    };

    const handleSubmit = (e) => {
      console.log(record_title, record_content);
      e.preventDefault();
      const part = window.localStorage.getItem("part");
      console.log("PART" + part);
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
        // document.location.href = '/mypage/stamp'
        if (part == 1) {
          setRecord1(true);
        }
        else if (part == 2) {
          setRecord2(true);
        }
        else if (part == 3) {
          setRecord3(true);
        }
        else if (part == 4) {
          setRecord4(true);
        }
        setStampModal(false);
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
        if (res.data[0].record_title1 != undefined) {
          console.log(res.data[0].record_title1, res.data[0].record_content1);
          setRecord({record_title: res.data[0].record_title1, record_content: res.data[0].record_content1});
          console.log(record)
        }
        else {
          setRecord({record_title: "", record_content: ""});
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
        if (res.data[0].record_title2 != undefined) {
          setRecord({record_title: res.data[0].record_title2, record_content: res.data[0].record_content2});
        }
        else {
          setRecord({record_title: "", record_content: ""});
        }
      })
      setStampModal(!stampModal);
    }

    const clickPoster3 = (e) => {
      e.preventDefault();
      console.log("poster3 click!");
      const part = 3;
      window.localStorage.setItem('part', 3);

      const res = axios.post("http://localhost:8000/api/stampcheck", {
        id,
        m_num,
        poster,
        part
      })
      .then((res) => {
        if (res.data[0].record_title3 != undefined) {
          setRecord({record_title: res.data[0].record_title3, record_content: res.data[0].record_content3});
        }
        else {
          setRecord({record_title: "", record_content: ""});
        }
      })
      setStampModal(!stampModal);
    }

    const clickPoster4 = (e) => {
      e.preventDefault();
      console.log("poster4 click!");
      const part = 4;
      window.localStorage.setItem('part', 4);

      const res = axios.post("http://localhost:8000/api/stampcheck", {
        id,
        m_num,
        poster,
        part
      })
      .then((res) => {
        if (res.data[0].record_title4 != undefined) {
          setRecord({record_title: res.data[0].record_title4, record_content: res.data[0].record_content4});
        }
        else {
          setRecord({record_title: "", record_content: ""});
        }
      })
      setStampModal(!stampModal);
    }


  return (
    <div>
      <div className={styles.stamp_form_container}>
      {
        (function() {
          if (record1 == true) return (<img src={'/poster/poster_' + m_num + '_1.jpg'} id = "after_img" onClick={clickPoster1}></img>);
          else return (<img src={'/poster/poster_' + m_num + '_1.jpg'} id = "before_img" onClick={clickPoster1}></img>);
        })()
      }
      {
        (function() {
          console.log(record2)
          if (record2 == true) return (<img src={'/poster/poster_' + m_num + '_2.jpg'} id = "after_img" onClick={clickPoster2}></img>);
          else return (<img src={'/poster/poster_' + m_num + '_2.jpg'} id = "before_img" onClick={clickPoster2}></img>);
        })()
      }
      {
        (function() {
          if (record3 == true) return (<img src={'/poster/poster_' + m_num + '_3.jpg'} id = "after_img" onClick={clickPoster3}></img>);
          else return (<img src={'/poster/poster_' + m_num + '_3.jpg'} id = "before_img" onClick={clickPoster3}></img>);
        })()
      }
      {
        (function() {
          if (record4 == true) return (<img src={'/poster/poster_' + m_num + '_4.jpg'} id = "after_img" onClick={clickPoster4}></img>);
          else return (<img src={'/poster/poster_' + m_num + '_4.jpg'} id = "before_img" onClick={clickPoster4}></img>);
        })()
      }
      </div>
      {stampModal ?
      <div className={styles2.stamp_modal}>
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
            value={record.record_title}
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
            value={record.record_content}
            onChange={handleInputChange}
            />
          </div>
          <input className={styles.btn_submit} type="submit" value="등록" />        

        </form>
            
      </div>
      : null}
    </div>    
  );
  
}