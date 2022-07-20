import { specialChars } from "@testing-library/user-event";
import styles from "./CommunityCard.module.css";

export default function CommunityCard({card}) {



  return (
    <div  className={styles.card_container} onClick={ () => console.log(1)}>
        <h2>{card.cm_title}</h2>
    
        <div img_box>
            <ol>
                <ul>내용 : {card.cm_content}</ul>
                <ul>종류 : {card.cm_type}</ul>
            </ol>
        </div>
        
        <img className={styles.postimg} src="C:/Users/044/Desktop/profile.jpg" alt=""/>
        <button >좋아요 {card.cm_likeCount}</button>
    </div>
    // <>
    //   <header className="card_header">
    //     <h1>{title}</h1>
    //   </header>
    //   <figure className="image_box">
    //     <img src={image} />
    //   </figure>
    //   <div className="card_info">
    //     <span>제조사: {content}</span>
    //     <span>종류: {type}</span>
    //     <span>모델명: {like}</span>
    //     {/* <span>아키텍쳐: {spec.architecture}</span>
    //     <span>메모리: {spec.vram}</span> */}
    //   </div>
    // </>
  );
}