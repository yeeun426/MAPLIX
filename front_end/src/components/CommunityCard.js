// import { specialChars } from "@testing-library/user-event";
import styles from "./CommunityCard.module.css";
// import Modal from "./PostModal";



export default function CommunityCard({card}) {
  

  return (
    <div className={styles.card_container} >    
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