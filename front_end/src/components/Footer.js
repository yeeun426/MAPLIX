import React from "react";
import styled from "styled-components";
import {SiInstagram} from "react-icons/si";
import {SiFacebook} from "react-icons/si";
export default function Footer() {
    return(
        <FooterStyle>
            <span>entj</span>

            <div className="footer-icon">
                <SiInstagram color="white" size="18px"/>
                <SiFacebook color="white" size="18px"/>
            </div>
        </FooterStyle>
    )
}

const FooterStyle = styled.div`
    background-color: #395C3C;
    display: flex;
    height: 50px;
    padding: 0 100px;
    justify-content: space-between;
    align-items: center;

    span{
        font-weight: bold;
        color: white;
    }

    .footer-icon{
        gap: 10px;
        display: flex;
    }
`;