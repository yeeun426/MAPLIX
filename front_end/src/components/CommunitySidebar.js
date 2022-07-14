import { Link } from 'react-router-dom';
import styles from './MypageSidebar.module.css'; /////////
import {TiHome} from 'react-icons/ti';
import { FaRegCompass } from 'react-icons/fa';
import { MdSubscriptions } from 'react-icons/md';
import { BsUiRadios } from 'react-icons/bs';


function CommunitySideBar() {

    const filterArray = ['전체', '동행', '질문', '자유', '스크랩'];
    

    return (
        <div className={styles.menu}>
            <li>전체</li>
            <li>동행</li>
            <li>질문</li>
            <li>자유</li>
            <li>스크랩</li>
            <button><Link to="/community/writepost">글쓰기</Link></button>
            

        </div>
    );
}


export default CommunitySideBar;