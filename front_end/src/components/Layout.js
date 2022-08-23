// src/components/Layout.js
import styles from './Layout.module.css';
// import Navbar from './Navbar';
import MypageSidebar from './MypageSidebar';

function Layout({ children, activeMenu }) {
  return (
    <div>
  
      <div className={styles.layout}>
        <MypageSidebar activeMenu={activeMenu}/>
        <div className={styles.contents}>{children}</div>
      </div>
      </div>
  );
}

export default Layout;