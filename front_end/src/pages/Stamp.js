// src/pages/Stamp.js
import Layout from '../components/Layout';
import styles from '../components/Community.module.css';
import { useEffect, useState} from 'react';
import axios from 'axios';

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

const Stamp = () => {
    const id = window.localStorage.getItem("id");

    const [state, setState] = useState(initialState);
    const {m_type, media_name} = state;
    
    const [setposter, setPoster] = useState(init_poster);
    const {poster} = setposter;

    const [mnum, setMNum] = useState(init_m_num);
    const {m_num} = mnum;

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
        console.log(poster, m_num);
      })
    }

  return (
    <Layout activeMenu="stamp">
      <div className={styles.title_like}>도장깨기</div>

      <div className={styles.write_item}>
          <label htmlFor='m_type'>유형</label>
          <select name="m_type" id="m_type" onChange={handleInputChange} vlaue={m_type}>
              <option value="none">기록할 컨텐츠 분류를 선택해주세요.</option>
              <option value="드라마">드라마</option>
              <option value="영화">영화</option>
              <option value="예능">예능</option>
          </select>
      </div>
      <div className={styles.write_item}>
        <form onSubmit={handleSubmit}>
          <input  name="media_name" vlaue={media_name} onChange={handleInputChange}type="text" placeholder="기록할 컨텐츠 제목을 검색하세요." />
          <button type='submit'>검색</button>
        </form>
      </div>
      {
        (function() {
          if (m_num == undefined) return 0;
          else  
            return (
              <div className={styles.form_container}>
                {poster}<br></br>
                <img src={'/poster/poster_' + m_num + '.jpg'} width='300px' height='400px'></img>
              </div>
            );
        })()
      }
    </Layout>
  );
}


export default Stamp;