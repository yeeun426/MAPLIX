import { useEffect, useState } from "react";  
import MediaCourse from '../data/RecommendCourse.json';

const RecommendMediaCourse = ({id}) => {

    const [course, setCourse] = useState([]);
    //data를 배열로 선언

    useEffect(() => {
        MediaCourse.Recommend.map((course) => {
            if(id === course?.id) 
                setCourse(course);
        })
    }, [id])

    // console.log(course);
    // debugger

    return (
        <div className="RecommendMediaCourse">
            <div className="recommend_media_item">
                <img src={course?.course1?.img} alt=""/>
                <div className="recommend_media_txt">
                    <div className="recommend_media_name">{course?.course1?.name}</div>
                    <div className="recommend_media_location">{course?.course1?.location}</div>
                    <div className="recommend_media_content">{course?.course1?.content}</div>
                </div>
            </div>

            <div className="recommend_media_item">
                <img src={course?.course2?.img} alt=""/>
                <div className="recommend_media_txt">
                    <div className="recommend_media_name">{course?.course2?.name}</div>
                    <div className="recommend_media_location">{course?.course2?.location}</div>
                    <div className="recommend_media_content">{course?.course2?.content}</div>
                </div>
            </div>

            <div className="recommend_media_item">
                <img src={course?.course3?.img} alt=""/>
                <div className="recommend_media_txt">
                    <div className="recommend_media_name">{course?.course3?.name}</div>
                    <div className="recommend_media_location">{course?.course3?.location}</div>
                    <div className="recommend_media_content">{course?.course3?.content}</div>
                </div>
            </div>

            <div className="recommend_media_item">
                <img src={course?.course4?.img} alt=""/>
                <div className="recommend_media_txt">
                    <div className="recommend_media_name">{course?.course4?.name}</div>
                    <div className="recommend_media_location">{course?.course4?.location}</div>
                    <div className="recommend_media_content">{course?.course4?.content}</div>
                </div>
            </div>

            <div className="recommend_media_item">
                <img src={course?.course5?.img} alt=""/>
                <div className="recommend_media_txt">
                    <div className="recommend_media_name">{course?.course5?.name}</div>
                    <div className="recommend_media_location">{course?.course5?.location}</div>
                    <div className="recommend_media_content">{course?.course5?.content}</div>
                </div>
            </div>
        </div>
    )
}

export default RecommendMediaCourse;
