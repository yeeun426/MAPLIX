import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MediaCardStyles } from "./styled.js";

export default function MediaCard({card, openModal}) {

    const navigate = useNavigate(); // Link 같은 역할
    const [activeSearchCate, setActiveSearchCate] = useState('title'); // title이랑 area클릭하는거..?

    const onClickMedia = () => {
        navigate(`/search/title/${card.m_name}`);
      }

    return (
        <MediaCardStyles onClick={onClickMedia}>
            <div className="media_modal_items">
                <img src={'/poster/poster_' + card.m_num + '.jpg'}></img>
                <div>{card.m_name}</div>
            </div>
        </MediaCardStyles>
    );
}
