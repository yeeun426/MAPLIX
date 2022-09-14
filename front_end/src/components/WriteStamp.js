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
    const [stampRecordModal, setStampRecordModal] = useState(false);
    
    console.log(id, poster, m_num);

    const [record, setRecord] = useState(initialRecord);
    const {record_title, record_content} = record;
    
    const [img, setImg] = useState({file: null, fileName:""});
    const [record_image, setRecordImg] = useState(null);

    const [part, setPart] = useState(0);

    // 데이터 가져오기
  const loadPost = async () => {
    const response = await axios.post('http://localhost:8000/api/stampcheck'
    , {id, m_num, poster}
    );
    if (response.data[0].record_image1 != undefined) 
      return setRecord1(true);
  };

  const loadPost2 = async () => {
    const response = await axios.post('http://localhost:8000/api/stampcheck'
    , {id, m_num, poster}
    );
    if (response.data[0].record_image2 != undefined) 
      return setRecord2(true);
  };

  const loadPost3 = async () => {
    const response = await axios.post('http://localhost:8000/api/stampcheck'
    , {id, m_num, poster}
    );
    if (response.data[0].record_image3 != undefined) 
      return setRecord3(true);
  };

  const loadPost4 = async () => {
    const response = await axios.post('http://localhost:8000/api/stampcheck'
    , {id, m_num, poster}
    );
    if (response.data[0].record_image4 != undefined) 
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

    const handleImgChange = (e) => {
      setImg({file: e.target.files[0], fileName: e.target.value});
      console.log(img)
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('image', img.file);
      formData.append('id', id);
      formData.append('m_num', m_num);
      formData.append('poster', poster);
      formData.append('part', part);
      formData.append('record_title', record_title);
      formData.append('record_content', record_content);
      
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      // console.log(img.file)
      if (img.file == null) {
        alert("이미지를 등록해주세요.")
      }
      else {
        axios.post("http://localhost:8000/api/writestamp", formData, config)
        .then((response) => {
          if (part == 1) {
            alert("도장깨기 #1 글 작성 완료")
            setRecord1(true);
          }
          else if (part == 2) {
            alert("도장깨기 #2 글 작성 완료")
            setRecord2(true);
          }
          else if (part == 3) {
            alert("도장깨기 #3 글 작성 완료")
            setRecord3(true);
          }
          else if (part == 4) {
            alert("도장깨기 #4 글 작성 완료")
            setRecord4(true);
          }
          setStampModal(false);
        })
      }
    }

    const clickPoster1 = (e) => {
      e.preventDefault();
      console.log("poster1 click!");
      setPart(1)
      window.localStorage.setItem('part', 1);

      if (record1 != true) {
        setStampRecordModal(false);
        setStampModal(!stampModal);
      }
      else if (record1 == true) {
        const res = axios.post("http://localhost:8000/api/stampcheck", {
          id,
          m_num,
          poster,
          part
        })
        .then((res) => {
          setStampModal(false);
          setRecord({record_title: res.data[0].record_title1, record_content: res.data[0].record_content1});
          setRecordImg(res.data[0].record_image1);
          setStampRecordModal(!stampRecordModal);
        })
      }
    }

    const clickPoster2 = (e) => {
      e.preventDefault();
      console.log("poster2 click!")
      setPart(2)
      window.localStorage.setItem('part', 2);

      if (record2 != true) {
        setStampRecordModal(false);
        setStampModal(!stampModal);
      }
      else if (record2 == true) {
        const res = axios.post("http://localhost:8000/api/stampcheck", {
          id,
          m_num,
          poster,
          part
        })
        .then((res) => {
          setStampModal(false);
          setRecord({record_title: res.data[0].record_title2, record_content: res.data[0].record_content2});
          setRecordImg(res.data[0].record_image2);
          setStampRecordModal(!stampRecordModal);
        })
      }
    }

    const clickPoster3 = (e) => {
      e.preventDefault();
      console.log("poster3 click!");
      setPart(3)
      window.localStorage.setItem('part', 3);

      if (record3 != true) {
        setStampRecordModal(false);
        setStampModal(!stampModal);
      }
      else if (record3 == true) {
        setStampModal(false);
        const res = axios.post("http://localhost:8000/api/stampcheck", {
          id,
          m_num,
          poster,
          part
        })
        .then((res) => {
          setRecord({record_title: res.data[0].record_title3, record_content: res.data[0].record_content3});
          setRecordImg(res.data[0].record_image3);
          setStampRecordModal(!stampRecordModal);
        })
      }
    }

    const clickPoster4 = (e) => {
      e.preventDefault();
      console.log("poster4 click!");
      setPart(4)
      window.localStorage.setItem('part', 4);

      if (record4 != true) {
        setStampRecordModal(false);
        setStampModal(!stampModal);
      }
      else if (record4 == true) {
        setStampModal(false);
        const res = axios.post("http://localhost:8000/api/stampcheck", {
          id,
          m_num,
          poster,
          part
        })
        .then((res) => {
          // setStampModal(false);
          setRecord({record_title: res.data[0].record_title4, record_content: res.data[0].record_content4});
          setRecordImg(res.data[0].record_image4);
          setStampRecordModal(!stampRecordModal);
        })
      }
    }

    const updateRecord = (e) => {
      e.preventDefault();
      setStampRecordModal(false);
      setStampModal(!stampModal);
    }

  return (
    <div>
      <div className={styles.stamp_form_container}>
      {
            function() {
              if (poster == undefined) return (
                <div className={styles.none_wrapper}>
              <span className={styles.none_title}>'{card.m_name}'</span>
              <span className={styles.none_result_title}>에 대한 검색결과가 없습니다.</span>
              <div className={styles.none_result_txt}>
                단어의 철자가 정확한지 확인해 보세요.<br />
                한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.<br />
                검색어의 단어 수를 줄이거나,<br/> 보다 일반적인 검색어로 다시 검색해 보세요.<br />
                두 단어 이상의 검색어인 경우,<br/> 띄어쓰기를 확인해 보세요.<br />
                키워드 수를 줄여보세요.
              </div>
              <div styles={{fontSize: "18px"}}>Contact Us</div>
              <span>원하는 드라마, 영화, 예능의 가 없다면 </span>
              <span className={styles.none_result_request}>'요청하기'</span>
              <span>를 이용하세요</span>
              <Link to='/mypage/request'>
                <button>요청하기</button>
              </Link>
            </div>
              )
            }
          }
        <ul id="stamp_title">{card.m_name}</ul>
        <div className={styles.stamp_img_pieces}>
        {
          (function() {
            if (record1 == true) return (<img src={'/poster/poster_' + m_num + '_1.jpg'} id = "after_img" onClick={clickPoster1}></img>);
            else if (record1 != true) return (<img src={'/poster/poster_' + m_num + '_1.jpg'} id = "before_img" onClick={clickPoster1}></img>);
          })()
        }
        {
          (function() {
            if (record2 == true) return (<img src={'/poster/poster_' + m_num + '_2.jpg'} id = "after_img" onClick={clickPoster2}></img>);
            else if (record2 != true)return (<img src={'/poster/poster_' + m_num + '_2.jpg'} id = "before_img" onClick={clickPoster2}></img>);
          })()
        }
        {
          (function() {
            if (record3 == true) return (<img src={'/poster/poster_' + m_num + '_3.jpg'} id = "after_img" onClick={clickPoster3}></img>);
            else if (record3 != true)return (<img src={'/poster/poster_' + m_num + '_3.jpg'} id = "before_img" onClick={clickPoster3}></img>);
          })()
        }
        {
          (function() {
            if (record4 == true) return (<img src={'/poster/poster_' + m_num + '_4.jpg'} id = "after_img" onClick={clickPoster4}></img>);
            else if (record4 != true) return (<img src={'/poster/poster_' + m_num + '_4.jpg'} id = "before_img" onClick={clickPoster4}></img>);
          })()
        }
        </div>
      </div>
      {stampModal ?
      <div className={styles2.stamp_modal}>
        <ul id="stamp_title">도장깨기 글쓰기 #{part} <button id="modalCloseBtn" onClick={() => setStampModal(false)}>✖</button></ul>
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
            // value={record.record_title}
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
            // value={record.record_content}
            onChange={handleInputChange}
            />
          </div>
          
          <input type="file" id="file" accept='image/*' onChange={handleImgChange} multiple={false} file={img.file} fileName={img.fileName}/>

          <input className={styles.btn_submit} type="submit" value="등록" />        

        </form>
            
      </div>
      : null}

      {stampRecordModal ?
      <div className={styles2.stamp_modal}>
        <ul id="stamp_title">도장깨기 #{part} <button id="modalCloseBtn" onClick={() => setStampRecordModal(false)}>✖</button></ul>
        <div className={styles.form_container}>
          
          <img  className={styles2.sm_img} src={'http://localhost:8000' + record_image}></img>
          <div className={styles.write_item}>
            {/* <label htmlFor='record_title'>제목</label> */}
            <ul id="stamp_record_title">{record.record_title}</ul>
          </div>

          <div className={styles.write_item}>
            {/* <label htmlFor='record_content'>내용</label> */}
            <ul id="stamp_record_content">{record.record_content}</ul>
          </div>
          <br></br>
          <button className={styles.btn_submit} onClick={updateRecord}>수정</button>
        </div>
        
      </div>
      : null}
    </div>    
  );
  
}