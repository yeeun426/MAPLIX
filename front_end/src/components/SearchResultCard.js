// import { specialChars } from "@testing-library/user-event";
import styles from "./CommunityCard.module.css";
// import Modal from "./PostModal";



export default function SearchResultCard({card}) {
  
    // const onClickLikeBtn = () => {
    //     fetch(`${API.carts}/${lecture_id}`, {
    //       method: 'POST',
    //       headers: {
    //         Authorization: getToken(),
    //       },
    //     }).then(res => {
    //       setIsLiked(res.status === 201);
    //       getCardListData();
    //     });
    // };

  return (
    <div className={styles.card_container} >    
        <h2>{card.p_name}</h2>
        <div img_box>
            <ol>
                <ul>{card.address}</ul>
                <ul>#{card.m_name}</ul>
                <ul>#{card.category}</ul>
            
            </ol>
            {/* <button type='submit' onClick={onClickLikeBtn}>즐겨찾기</button> */}
        </div>

    </div>

  );
}