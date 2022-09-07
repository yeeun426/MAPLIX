import React from "react";
import styled from 'styled-components';
import Spinner from '../img/Spinner.gif';

export const Loading = () => {
    return (
        <Background>
            <img src={Spinner} alt="로딩중" width="5%" />
        </Background>
    )
}

export default Loading

const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 100%;
    background: #ffffffb7;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;