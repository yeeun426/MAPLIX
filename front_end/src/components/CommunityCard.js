// import { specialChars } from "@testing-library/user-event";
import styles from "./CommunityCard.module.css";
// import Modal from "./PostModal";
import {useState} from "react"; 


export default function CommunityCard({card}) {
  const [modal, setModal] = useState([]);

  const onClickModal = (e) => {
    console.log('시작')
    // Object.entries(card).map((item) => {
      if(e.currentTarget.id === card.cm_num) {
        // setModal({
        //   id: card.cm_num,
        //   title: card.cm_title,
        // });
        console.log(card.cm_num)
      }
    // })
    console.log("끝")      
    // debugger
  }

  return (
    <div className={styles.card_container} id={card.cm_num} onClick={onClickModal} >    
        <div className={styles.card_title}>{card.cm_title}</div>
        <div className={styles.card_details}>
            <ol>
                <ul style={{"margin-bottom":"10px"}}>[{card.cm_type}] {card.cm_content}</ul>
                {/* <ul>종류 : {card.cm_type}</ul> */}
            </ol>

            <div className={styles.img_item}>
              임시 이미지
            </div>
        </div>

    </div>

  );
}