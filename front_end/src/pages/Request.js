// src/pages/Request.js
import Layout from '../components/Layout';
import styles from '../components/Community.module.css';

function Request() {
    const SelectBox = () => {
        return (
            <select>
                <option key="drama" value="drama">드라마</option>
                <option key="movie" value="movie">영화</option>
                <option key="comedy" value="comedy">예능</option>
            </select>
        );
    };

    return (
        <Layout activeMenu="request">
        
        <div className={styles.postbox}>
                    컨텐츠유형 
                    <SelectBox></SelectBox>
                    <br></br>

                    컨텐츠 제목
                    <input ></input>
                    <br></br>

                    요청 내용 : 
                    <input className={styles.content}/>
                    <input type="file"/>
                    <br></br><br></br>
                    <button>업로드</button>
                
        </div>
        
        </Layout>
    );
}

export default Request;



