// src/pages/Home.js
import Layout from '../components/Layout';

function MyPage() {
    console.log("마이페이지");
  return (
    
    <Layout activeMenu="mypage">
      <div>
        <div>즐겨찾기</div>
      </div>
    </Layout>
  );
}

export default MyPage;