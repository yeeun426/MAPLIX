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
    const [list, setList] = useState(false);
    const [click, setClick] = useState(false);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setClick(true);
      console.log(m_type, media_name)
      if (m_type == "") {
        alert("컨텐츠 분류를 선택해주세요")
      }
      else if (media_name == "") {
        alert("컨텐츠 제목을 입력해주세요")
      }
      else {
        const res = axios.post("http://localhost:8000/api/stamp", {
          media_name,
          id,
          m_type
        })
        .then((res) => {
          console.log(res.data.length)
          if (res.data.length === 1){
            setPoster({poster: res.data[0].poster})
            setMNum({m_num: res.data[0].m_num})
            setState(res.data[0]);
            setPost(res.data);
            console.log(poster, m_num);
          }
          else if (res.data.length > 1){
            setList(!list)
            setPost(res.data);
            console.log(post[0])
          }
          else {
            setPoster(false)
            setPost(res.data);
            console.log(poster);
          }
        })
      }
    }
    const [post, setPost] = useState([]);

    const onClickMedia = (e) => {
      setState({media_name: e.target.id})
      const media_name = e.target.id
      const res = axios.post("http://localhost:8000/api/stamp", {
          media_name,
          id,
          m_type
        })
        .then((res) => {
            console.log(res.data[0])
            setPoster({poster: res.data[0].poster})
            setMNum({m_num: res.data[0].m_num})
            setState(res.data[0]);
            setPost(res.data);
            console.log(poster, m_num);
        })
    }
    console.log(post.length, click)
  return (
    <>
     {modal === true ? <Modal open={Modal} closeModal={() => {setModal(false);}} /> : null}
    <div className={styles2.main_container}>
    <Layout activeMenu="stamp">
      <div className={styles2.title_like}>도장깨기</div>

      <div className={styles.stamp_item1}>
          <label htmlFor='m_type'>컨텐츠 분류</label>
          <select name="m_type" id="m_type" onChange={handleInputChange} vlaue={m_type}>
              <option value="none">기록할 컨텐츠 분류를 선택해주세요.</option>
              <option value="드라마">드라마</option>
              <option value="영화">영화</option>
              <option value="예능">예능</option>
          </select>
      </div>
      <div className={styles.stamp_item2}>
        <div>컨텐츠 검색</div>
        <form onSubmit={handleSubmit}>
          <input  name="media_name" value={media_name} onChange={handleInputChange}type="text" placeholder="기록할 컨텐츠 제목을 검색하세요." />
          <button type='submit'>검색</button>
        </form>
      </div>

      {post.length === 1 ? 
      <div className={styles.like_list}>
        {post.map((card, index) => {
          return (
            
            <div className={styles.stamp_modal}>
            {/* div onClick={() => console.log("커뮤니티에서", card.cm_num)}> */}
            <WriteStamp key={card.s_num} card={card} 
                          openModal={ () => setModal(true)} />
            
            {/* 모달 이걸로해보기 */}
            {/* https://github.com/marinakim44/mern-img-modal/blob/master/client/src/App.js */}
            </div>
          );
        })}
      </div>
      : post.length > 1 ?
        <div className ={styles.media_list}>
              {post.map((card, index)=>(
              <div id={card.m_name} className = {styles.media_title} onClick={onClickMedia}>
                  {card.m_name}
              </div>
              ))}
        </div>
      : post.length === 0 && click == true?
      <div className={styles.none_wrapper}>
        <span className={styles.none_title}>'{media_name}'</span>
        <span className={styles.none_result_title}>에 대한 도장깨기가 없습니다.</span>
        <div className={styles.none_result_txt}>
          단어의 철자가 정확한지 확인해 보세요.<br />
          한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.<br />
          검색어의 단어 수를 줄이거나,<br/> 보다 일반적인 검색어로 다시 검색해 보세요.<br />
          두 단어 이상의 검색어인 경우,<br/> 띄어쓰기를 확인해 보세요.<br />
          키워드 수를 줄여보세요.
        </div>
        <div styles={{fontSize: "18px"}}>Contact Us</div>
        <span>원하는 드라마, 영화, 예능의 도장깨기가 없다면 </span>
        <span className={styles.none_result_request}>'요청하기'</span>
        <span>를 이용하세요</span>
        <Link to='/mypage/request'>
          <button>요청하기</button>
        </Link>
      </div>
      : null
    }
    </Layout>
    </div>
    </>
  );
}


export default Stamp;