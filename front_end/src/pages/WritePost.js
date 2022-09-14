import styles from '../components/Community.module.css';
import write from '../img/write.png';

import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const initialState = {
  cm_title: "",
  cm_content: "",
  cm_type: "",
};

const WritePost = () => {
  const writer = window.localStorage.getItem("nick_name");

  const [state, setState] = useState(initialState);
  const [img, setImg] = useState({file: null, fileName:""});

  const {cm_title, cm_content, cm_type} = state;
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cm_title == "") {
      alert("제목을 입력해주세요.")
    }
    else if (cm_content == "") {
      alert("내용을 입력해주세요.")
    }
    else if (cm_type == "") {
      alert("유형을 선택해주세요.")
    }
    else {
      if (img.file == null){
        axios.post("http://localhost:8000/api/community/writepost", {cm_title, cm_content, writer, cm_type})
        .then((response) => {
          console.log(response);
        })
      }
      else {
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }

        const formData = new FormData();
        formData.append('image', img.file);
        formData.append('cm_content', cm_content);
        formData.append('cm_title', cm_title);
        formData.append('writer', writer);
        formData.append('cm_type', cm_type);

        axios.post("http://localhost:8000/api/community/writepostimg", formData, config)
        .then((response) => {
          console.log(response);
          document.location.href = '/community'
        })
      }
    } 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleImgChange = (e) => {
    setImg({file: e.target.files[0], fileName: e.target.value});
    console.log(img)
  };


  return (
    <div style={{padding:"30px", "background-color":"#E0E3E8", "flex":"auto"}}>
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
            value={cm_title}
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
            value={cm_content}
            onChange={handleInputChange}
            />
          </div>

          <div className={styles.write_item}>
            <label htmlFor='cm_type'>유형</label>
            <select name="cm_type" onChange={handleInputChange} value={cm_type} id="cm_type">
                <option value="none">커뮤니티 카테고리를 선택해주세요.</option>
                <option value="동행">동행</option>
                <option value="질문">질문</option>
                <option value="자유">자유</option>
            </select>
          </div>

        <div className={styles.write_item}>
          <label htmlFor='cm_image'>이미지</label>
          <input type="file" id="file" accept='image/*' onChange={handleImgChange} multiple={false} file={img.file} fileName={img.fileName}/>
        </div>
        <br></br>

          <input className={styles.btn_submit} type="submit" value="등록" />        
        </form>
      </div>
    </div>
  );
};
export default WritePost;