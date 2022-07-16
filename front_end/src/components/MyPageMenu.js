import { Link } from 'react-router-dom';
import styles from './Menu.module.css';
import {TiHome} from 'react-icons/ti';
import { FaRegCompass } from 'react-icons/fa';
import { MdSubscriptions } from 'react-icons/md';


function Menu({ activeMenu }) {
    console.log('현재 활성화된 메뉴 : ', activeMenu);
  return (
    <div className={styles.menu}>
      <Link
        to="/Mypage"
        className={activeMenu === '회원정보수정' ? styles.focused : styles.link}
      >
        <TiHome className={styles.icon} />회원정보수정
      </Link>
      <Link
        to="/Favorite"
        className={activeMenu === 'favorite' ? styles.focused : styles.link}
      >
        <FaRegCompass className={styles.icon} />
        즐겨찾기
      </Link>
      <Link
        to="/Stamp"
        className={activeMenu === 'stamp' ? styles.focused : styles.link}
      >
        <MdSubscriptions className={styles.icon} />
        도장깨기
      </Link>
      <Link
        to="/MyCourse"
        className={activeMenu === 'MyCourse' ? styles.focused : styles.link}
      >
        <MdSubscriptions className={styles.icon} />
        내 경로
      </Link>
      <Link
        to="/RequestInfo"
        className={activeMenu === 'RequestInfo' ? styles.focused : styles.link}
      >
        <MdSubscriptions className={styles.icon} />
        요청하기
      </Link>
      <Link
        to="/Counsel"
        className={activeMenu === 'counsel' ? styles.focused : styles.link}
      >
        <MdSubscriptions className={styles.icon} />
        1:1 상담
      </Link>
    </div>
  );
}


export default Menu;