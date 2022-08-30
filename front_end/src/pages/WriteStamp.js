// src/pages/WriteStamp.js
import Layout from '../components/Layout';
import styles from '../components/Community.module.css';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const initialRecord = {
  record_title: "",
  record_content: "",
};


const WriteStamp = () => {
    const id = window.localStorage.getItem("id");
    const poster = window.localStorage.getItem("poster");
    const part = window.localStorage.getItem("part");
    const m_num = window.localStorage.getItem("m_num");
    const record_title_ex = window.localStorage.getItem("record_title");
    const record_content_ex = window.localStorage.getItem("record_content");

    console.log(record_title_ex, record_content_ex);
    
    console.log(id, poster, part, m_num);

    const [record, setRecord] = useState(initialRecord);
    const {record_title, record_content} = record;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRecord({ ...record, [name]: value });
    };

    const handleSubmit = (e) => {
      console.log(record_title, record_content);
      e.preventDefault();
      
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
        // if (part == 1) {
        //   window.localStorage.setItem('stamp1', true);
        // }
        // else if (part == 2) {
        //   window.localStorage.setItem('stamp2', true);
        // }
        // else if (part == 3) {
        //   window.localStorage.setItem('stamp3', true);
        // }
        // if (part == 4) {
        //   window.localStorage.setItem('stamp4', true);
        // }
        console.log(res.data[0])
      })
    }

  return (
    <Layout activeMenu="stamp">
      <div className={styles.title_like}>도장깨기</div>
      {
        (function() {
          if (record_title_ex == undefined) {
            return (
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
                  vlaue={record_title}
                  onChange={handleInputChange}
                  />
                </div>

                <div className={styles.write_item}>
                  <label htmlFor='records_content'>내용</label>
                  <input className={styles.content}
                  type="text"
                  id="record_content"
                  name="record_content"
                  placeholder='내용'
                  vlaue={record_content}
                  onChange={handleInputChange}
                  />
                </div>

                <input className={styles.btn_submit} type="submit" value="등록" />        

              </form>
            )
          }
          else {
            return (
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
                      vlaue={record_title_ex}
                      onChange={handleInputChange}
                      />
                </div>

                <div className={styles.write_item}>
                  <label htmlFor='records_content'>내용</label>
                  <input className={styles.content}
                  type="text"
                  id="record_content"
                  name="record_content"
                  placeholder='내용'
                  vlaue={record_content_ex}
                  onChange={handleInputChange}
                  />
                </div>

                <input className={styles.btn_submit} type="submit" value="수정" />        
              </form>
            )
          }
        })()
      }
      
    </Layout>
    
  );
  
}


export default WriteStamp;