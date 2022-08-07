// // src/pages/Request.js
// import Layout from '../components/Layout';
// import styles from '../components/Community.module.css';

// function Request() {
//     const SelectBox = () => {
//         return (
//             <select>
//                 <option key="drama" value="drama">드라마</option>
//                 <option key="movie" value="movie">영화</option>
//                 <option key="comedy" value="comedy">예능</option>
//             </select>
//         );
//     };

//     return (
//         <Layout activeMenu="request">
        
//         <div className={styles.postbox}>
//                     컨텐츠유형 
//                     <SelectBox></SelectBox>
//                     <br></br>

//                     컨텐츠 제목
//                     <input ></input>
//                     <br></br>

//                     요청 내용 : 
//                     <input className={styles.content}/>
//                     <input type="file"/>
//                     <br></br><br></br>
//                     <button>업로드</button>
                
//         </div>
        
//         </Layout>
//     );
// }

// export default Request;



// src/pages/writepost.js
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import CommunitySideBar from './CommunitySidebar';
import styles from '../components/Community.module.css';
import styles_two from './MyPage.module.css';
// function WritePost(){

  
//     console.log("글쓰기")
//     return(
//         <div>
//             {/* <Navbar/> */}
//             <div className={styles.sidebar}>
//                 <CommunitySideBar/>
//             </div>
//             <div className={styles.postbox}>
//                 제목 : 
//                 <input />
//                 <br></br><br></br>

//                 내용 : 
//                 <input className={styles.content}/>
//                 <input type="file"/>
//                 <br></br><br></br>
//                 <button>업로드</button>
//             </div>
//         </div>
//     );
// }

// export default WritePost;


import { useEffect, useState} from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';
import {RiQuestionnaireFill} from 'react-icons/ri';

const initialState = {
  media_name: "",
  r_content: "",
  id: "",
  m_type: "",
};

const Request = () => {
  const [state, setState] = useState(initialState);
  const [img, setImg] = useState({r_image: ""});

  const {media_name, r_content, id, m_type} = state;
  const {r_image} = img;

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    const r_image = img;
    // formData.append('file', img);
    console.log(r_image);
    // console.log(formData);
    
    if (!media_name || !r_content || !id || !m_type || !r_image) {
      // toast.error("Please provide value into each input field");
    } else {
      const res = axios.post("http://localhost:8000/mypage/request", {
        media_name,
        r_content,
        id,
        m_type,
        r_image
        // formData
      })
      .then((res) => {
        setState({media_name: "", r_content: "", id: "", m_type: ""});
        setImg({r_image: ""});
        alert("success!")
      })
      console.log(res);
      // .catch((err) => toast.error(err.response.data));
    setTimeout(() => history.push("/mypage"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleImgChange = (e) => {
    console.log(e.target.files[0].name);
    setImg(e.target.files[0].name);
  }


  return (
    // <div style={{marginTop: "100px"}}>
  <div style={{padding:"30px", "background-color":"#E0E3E8"}}>
    <div className={styles.write_container}>
      <div style={{display:"flex"}}>
      <RiQuestionnaireFill  className={styles_two.icon}/>
      <span>요청하기</span>
    </div>
      <form 
        className={styles.form_container}
      // style={{
      //   margin: "auto",
      //   padding: "15px",
      //   maxWidth: "400px",
      //   alignContent: "center"
      // }}
      onSubmit={handleSubmit}
      >
        <div className={styles.write_item}>
          <label htmlFor='media_name'>Title</label>
          <input
          type="text"
          id="media_name"
          name="media_name"
          placeholder='제목'
          vlaue={media_name}
          onChange={handleInputChange}
          />
        </div>

        <div className={styles.write_item}>
          <label htmlFor='r_content'>내용</label>
          <input className={styles.content}
          type="text"
          id="r_content"
          name="r_content"
          placeholder='내용'
          vlaue={r_content}
          onChange={handleInputChange}
          />
        </div>

        <div className={styles.write_item}>
          <label htmlFor='id'>ID</label>
          <input
          type="text"
          id="id"
          name="id"
          placeholder='ID'
          vlaue={id}
          onChange={handleInputChange}
          />
        </div>

        <div className={styles.write_item}>
          <label htmlFor='m_type'>유형</label>
          <select name="m_type" onChange={handleInputChange} vlaue={m_type} id="m_type">
              <option value="드라마">드라마</option>
              <option value="영화">영화</option>
              <option value="예능">예능</option>
          </select>
        </div>

        {/* <input ref={logoImgInput} type='file' className='imgInput' id='logoImg' accept='image/*' name='file' onChange={onImgChange}/> */}

        {/* <input type="file" id="file" accept='image/*' onChange={handleImgChange} multiple={false} /> */}

        {/* <label htmlFor='r_image'>이미지</label>
        <input 
        type="text"
        id="r_image"
        name="r_image"
        placeholder='이미지'
        vlaue={r_image}
        onChange={handleInputChange}
        /> */}
        <br></br>

        <input className={styles.btn_submit} type="submit" value="등록" />        
      </form>
    </div>
  </div>
  );
};
export default Request;