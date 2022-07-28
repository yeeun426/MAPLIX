// import { specialChars } from "@testing-library/user-event";
import styles from "./CommunityCard.module.css";
import Modal from "./PostModal";



export default function CommunityCard({card}) {
  

  return (
    <div className={styles.card_container} >    
        <h2>{card.cm_title}</h2>
        <div img_box>
            <ol>
                <ul>내용 : {card.cm_content}</ul>
                <ul>종류 : {card.cm_type}</ul>
            </ol>
        </div>

    </div>

  );
}