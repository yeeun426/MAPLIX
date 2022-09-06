// src/pages/Stamp.js
import Layout from '../components/Layout';
import styles from '../components/Community.module.css';
import styles2 from "./Community.module.css";
import { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WriteStamp from '..//components/WriteStamp';
import Modal from "../components/PostModal";
// import MyCourseCard from "..//components/MyCourseCard";


const initialState = {
  m_type: "",
  media_name: "",
};

// stamp 테이블 안에 저장된 poster 경로 사용 -> 이거 아닌 거 같음
const init_poster = {
  poster: "",
};

// media 테이블에 poster 경로를 같이 저장하고 그걸 불러오도록 해야 될 듯
const init_m_num = {
  m_num: "",
};
// function Stamp {
const Stamp = () => {
    const id = window.localStorage.getItem("id");

    const [state, setState] = useState(initialState);
    const {m_type, media_name} = state;
    
    const [setposter, setPoster] = useState(init_poster);
    const {poster} = setposter;

    const [mnum, setMNum] = useState(init_m_num);
    const {m_num} = mnum;

    const [modal, setModal] = useState(false);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const res = axios.post("http://localhost:8000/api/stamp", {
        media_name,
        id,
        m_type
      })
      .then((res) => {
        alert("success!")
        console.log(res.data[0])
        setPoster({poster: res.data[0].poster})
        setMNum({m_num: res.data[0].m_num})
        setState(res.data[0]);
        setPost(res.data);
        console.log(poster, m_num);
      })
    }

    const [post, setPost] = useState([]);

    const clickPoster1 = (e) => {
      e.preventDefault();
      console.log("poster1 click!")
      const stamp = window.localStorage.getItem("stamp1");
      const num = 1;
      const res = axios.post("http://localhost:8000/api/stampcheck", {
        id,
        m_num,
        poster,
        num
      })
      .then((res) => {
        // alert("success!")
        console.log(res.data[0])
        // if (res.data[0].record_title1 == undefined) {
          window.localStorage.setItem('poster', poster);
          window.localStorage.setItem('part', 1);
          window.localStorage.setItem('m_num', m_num);  
          // document.location.href = '/mypage/writestamp';
        // }
        // else {
          // const record_title1 = res.data[0].record_title1;
          // const record_content1 = res.data[0].record_content1;

          window.localStorage.setItem('record_title', res.data[0].record_title1);
          window.localStorage.setItem('record_content', res.data[0].record_content1);
          document.location.href = '/mypage/writestamp';
          // alert(record_title1 + record_content1);
        // }
        // setPoster({poster: res.data[0].poster})
        // setMNum({m_num: res.data[0].m_num})
        // console.log(poster, m_num);
      })
      
      // if (stamp == true) {
       
      // }
      // else {
      //   window.localStorage.setItem('poster', poster);
      //   window.localStorage.setItem('part', 1);
      //   window.localStorage.setItem('m_num', m_num);  
      //   document.location.href = '/mypage/writestamp';
      // }

    }
    
  return (
    <>
     {modal === true ? <Modal open={Modal} closeModal={() => {setModal(false);}} /> : null}
    <div className={styles2.main_container}>
    <Layout activeMenu="stamp">
      <div className={styles2.title_like}>도장깨기</div>

      <div className={styles.stamp_item}>
          <label htmlFor='m_type'>컨텐츠 분류</label>
          <select name="m_type" id="m_type" onChange={handleInputChange} vlaue={m_type}>
              <option value="none">기록할 컨텐츠 분류를 선택해주세요.</option>
              <option value="드라마">드라마</option>
              <option value="영화">영화</option>
              <option value="예능">예능</option>
          </select>
      </div>
      <div className={styles.stamp_item}>
        <div>컨텐츠 검색</div>
        <form onSubmit={handleSubmit}>
          <input  name="media_name" vlaue={media_name} onChange={handleInputChange}type="text" placeholder="기록할 컨텐츠 제목을 검색하세요." />
          <button type='submit'>검색</button>
        </form>
      </div>

      <div className={styles.like_list}>
        {post.map((card, index) => {
          return (
            
            <div>
            {/* div onClick={() => console.log("커뮤니티에서", card.cm_num)}> */}
            <WriteStamp key={card.s_num} card={card} 
                          openModal={ () => setModal(true)} />
            
            {/* 모달 이걸로해보기 */}
            {/* https://github.com/marinakim44/mern-img-modal/blob/master/client/src/App.js */}
            </div>
          );
        })}
      </div>
      
    </Layout>
    </div>
    </>
  );
}


export default Stamp;