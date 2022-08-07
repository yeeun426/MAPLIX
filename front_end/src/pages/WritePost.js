// src/pages/writepost.js
// import Navbar from '../components/Navbar';
// import Layout from '../components/Layout';
// import CommunitySideBar from './CommunitySidebar';
import styles from '../components/Community.module.css';
import write from '../img/write.png';

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


import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const initialState = {
  cm_title: "",
  cm_content: "",
  writer: "",
  cm_type: "",
};

const WritePost = () => {
  const [state, setState] = useState(initialState);
  const [img, setImg] = useState({cm_image: ""});

  const {cm_title, cm_content, writer, cm_type} = state;
  const {cm_image} = img;

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    const cm_image = img;
    // formData.append('file', img);
    console.log(cm_image);
    // console.log(formData);
    
    if (!cm_title || !cm_content || !writer || !cm_type || !cm_image) {
      // toast.error("Please provide value into each input field");
    } else {
      const res = axios.post("http://localhost:8000/community/writepost", {
        cm_title,
        cm_content,
        writer,
        cm_type,
        cm_image
        // formData
      })
      .then((res) => {
        setState({cm_title: "", cm_content: "", writer: "", cm_type: ""});
        setImg({cm_image: ""});
        alert("글이 게시되었습니다.")
        history('/community');
      })
      console.log(res);
      // .catch((err) => toast.error(err.response.data));
    setTimeout(() => history.push("/community"), 500);
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
    <div style={{padding:"30px", "background-color":"#E0E3E8"}}>
      <div className={styles.write_container}>
        <div style={{display:"flex"}}>
          <img src={write} alt = "write" style={{width:'30px'}}/>
          <span>글쓰기</span>
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
            <label htmlFor='cm_title'>제목</label>
            <input
            type="text"
            id="cm_title"
            name="cm_title"
            placeholder='제목'
            vlaue={cm_title}
            onChange={handleInputChange}
            />
          </div>

          <div className={styles.write_item}>
            <label htmlFor='cm_content'>내용</label>
            <input className={styles.content}
            type="text"
            id="cm_content"
            name="cm_content"
            placeholder='내용'
            vlaue={cm_content}
            onChange={handleInputChange}
            />
          </div>

          <div className={styles.write_item}>
            <label htmlFor='writer'>작성자</label>
            <input
            type="text"
            id="writer"
            name="writer"
            placeholder='작성자'
            vlaue={writer}
            onChange={handleInputChange}
            />
          </div>

          <div className={styles.write_item}>
            <label htmlFor='cm_type'>유형</label>
            <select name="cm_type" onChange={handleInputChange} vlaue={cm_type} id="cm_type">
                <option value="동행">동행</option>
                <option value="질문">질문</option>
                <option value="자유">자유</option>
            </select>
          </div>

        <div className={styles.write_item}>
          <label htmlFor='cm_image'>이미지</label>
          <input type="file" id="file" accept='image/*' onChange={handleImgChange} multiple={false} />
        </div>
        <br></br>

          <input className={styles.btn_submit} type="submit" value="등록" />        
        </form>
      </div>
    </div>
  );
};
export default WritePost;