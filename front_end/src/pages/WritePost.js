// src/pages/writepost.js
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import CommunitySideBar from '../components/CommunitySidebar';
import styles from '../components/Community.module.css';

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
// import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';


const initialState = {
  cm_title: "",
  cm_content: "",
  writer: "",
  cm_type: "",
  cm_image: "",
};

const WritePost = () => {
  const [state, setState] = useState(initialState);

  const {cm_title, cm_content, writer, cm_type, cm_image} = state;

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cm_title || !cm_content || !writer || !cm_type || !cm_image) {
      // toast.error("Please provide value into each input field");
    } else {
      axios
      .post("http://localhost:8000/community/writepost", {
        cm_title,
        cm_content,
        writer,
        cm_type,
        cm_image
      })
      .then(() => {
        setState({cm_title: "", cm_content: "", writer: "", cm_type: "", cm_image: ""});
      })
      // .catch((err) => toast.error(err.response.data));
    setTimeout(() => history.push("/community"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{marginTop: "100px"}}>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center"
      }}
      onSubmit={handleSubmit}
      >
        <label htmlFor='cm_title'>Title</label>
        <input
        type="text"
        id="cm_title"
        name="cm_title"
        placeholder='제목'
        vlaue={cm_title}
        onChange={handleInputChange}
        />
        <br></br>

        <label htmlFor='cm_content'>내용</label>
        <input className={styles.content}
        type="text"
        id="cm_content"
        name="cm_content"
        placeholder='내용'
        vlaue={cm_content}
        onChange={handleInputChange}
        />
        <br></br>

        <label htmlFor='writer'>작성자</label>
        <input
        type="text"
        id="writer"
        name="writer"
        placeholder='작성자'
        vlaue={writer}
        onChange={handleInputChange}
        />
        <br></br>

        <label htmlFor='cm_type'>유형</label>
        <select name="cm_type" onChange={handleInputChange} vlaue={cm_type} id="cm_type">
             <option value="동행">동행</option>
             <option value="질문">질문</option>
             <option value="자유">자유</option>
         </select>
        <br></br>

        {/* <input type="file" id="file" accept='image/*' onChange={handleChangeFile} multiple="multiple" /> */}

        <label htmlFor='cm_image'>이미지</label>
        <input 
        type="text"
        id="cm_image"
        name="cm_image"
        placeholder='이미지'
        vlaue={cm_image}
        onChange={handleInputChange}
        />
        <br></br>

        <input type="submit" value="등록" />        
      </form>
    </div>
  );
};
export default WritePost;