import styled from "styled-components"

export const CourseResultCardStyle = styled.div`
    .modal-course-items {
        box-sizing: border-box;
        text-align: left;
    }

    .mci-title{
        font-size: 17px;
        font-family: 'yg-jalnan';
    }

    .modal-course-items ul{
        font-size: 14px;
        color: gray;
    }  

    .mci-address{
        color: #293D45 !important;
    }

    .mci-length{
        
        color: #000000 !important;
    }


`;

export const RecommendStyle = styled.div`
    background-color: #E0E3E8;
    position: relative;
    
    .recommend_course_area{
        margin-top: 25px;
    }

    .recommend_course_area button{
        width: 150px;
        font-family: 'yg-jalnan';
        font-size: 18px;
        cursor: pointer;
    }

    .recommend_course_area button:hover{
        background-color: rgb(0,0,0,5%);
    }

    .active_area_menu{
        background-color: rgb(0,0,0,5%);
    }

    .recommend_course_container{
        background-color: rgb(0,0,0,5%);
    }
    
    .recommend_course_list{
        display:none;
        width: 1060px;
        margin: auto;
        padding: 40px 0;
        box-sizing: border-box;
        white-space: pre-wrap;
    }

    .recommend_course_list.active{
        display:block;
    }

    .recommend_course_list .course_title{
        font-family: 'yg-jalnan';
        font-size: 17px;
        text-align: center;
        margin-top: 7px;
    }

    .recommend_course_item{
        margin-bottom: 40px;
        text-align: left;
    }

    .course_info{
        margin-bottom: 15px;
        white-space: pre-wrap;
    }

    .course_sub{
        font-size: 15px;
        color: gray;
    }

    .swiper-button-prev{
        left: 0px;
        right: auto;
        top: 20px;
        color: #395C3C;
    }

    .swiper-button-next{
        right: 0px;
        top: 20px;
        color: #395C3C;
    }
`;

export const MediaCardStyles= styled.div`
    word-break: keep-all;
    
    img{
        width: 110px;
    }

    .media_modal_items{
        font-size: 13px;
        font-family: 'yg-jalnan';
        width: 110px;
    }

`
