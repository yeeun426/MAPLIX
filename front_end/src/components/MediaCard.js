import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import styles from "./CommunityCard.module.css";

export default function MediaCard({card, openModal}) {

    const navigate = useNavigate(); // Link 같은 역할
    const [activeSearchCate, setActiveSearchCate] = useState('title'); // title이랑 area클릭하는거..?

    const onClickMedia = () => {
        navigate(`/search/title/${card.m_name}`);
      }

    return (
        <div className={styles.like_list} onClick={onClickMedia} >
            <div className={styles.like_img}>
                <img className={styles.like_img} src={'/poster/poster_' + card.m_num + '.jpg'}></img>
            </div> 

            <div className={styles.like_txt}>
                <div className={styles.like_name}>{card.m_name}</div>
            </div>
        </div>
    );
}
