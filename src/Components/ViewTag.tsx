import { useState } from "react"
import { ViewTagGrid, TagWrap, SettingWrap, MyBtn} from "../styles/MaintestCss"
import { TagList } from "../dummydata"
import Tag from "./Tag"
import { useNavigate } from "react-router-dom";
import ThemeChangeBtn from "./ThemeChangeBtn";
import ThemeChangeToggle from "./ThemeChangeToggle";

interface propsType {
    setTag:Function;
    //setTagId:Funtion; 도 추가하기(api 호출에 필요할듯)
}
function ViewTag({setTag}:propsType){
    const onClickMypage = () => {
        console.log("mypage")
    }
    const onClickSetting = () => {
        console.log("setting")
    }
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/")
    }
    return(
            <ViewTagGrid>
                {/* 게시판 페이지로 돌아가기 */}
                <button onClick={onClick} style={{background:"transparent", border:"none", marginLeft:"20px", marginTop:"20px"}}><img src="/img/left-arrow.png" style={{width:"12px", height:"12px"}}/></button>

                {/* 태그 선택 파트 */}
                <h1 style={{textAlign: "center", fontSize: "x-large", fontWeight:"bold"}}>서함</h1>
                <TagWrap>
                    {/* {
                        TagList.map((tag) => (
                            <Tag name={tag}>
                                {tag}
                            </Tag>
                        ))
                    } */}
                    {
                    TagList.map((tag) => (
                        <Tag key={tag[1]} tagName={tag[0].toString()} tagColor={tag[2].toString()} tagId={Number(tag[1])} setTag={setTag}/>
                    ))
                    }
                </TagWrap>
                <SettingWrap>
                    <MyBtn onClick={onClickMypage}>
                        <div>
                            <svg  viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="100" cy="100" r="99" fill="white" stroke="#BABABA" strokeWidth="2"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M88.9344 110.246C72.1782 110.246 58.3579 122.816 56.3882 139.04C56.1219 141.233 57.9384 143.033 60.1475 143.033H139.852C142.062 143.033 143.878 141.233 143.612 139.04C141.642 122.816 127.822 110.246 111.066 110.246H88.9344Z" fill="#FAD4D4"/>
                                <circle cx="100" cy="77.4591" r="22.9508" fill="black" fillOpacity="0.4"/>
                                <circle cx="100" cy="77.4591" r="22.9508" fill="#FAD4D4"/>
                            </svg>
                        </div>
                    </MyBtn>
                    <MyBtn onClick={onClickSetting}>
                        <div>
                            <img style={{width:"20px", height:"20px"}} src="/img/settings.png"/>
                        </div>
                    </MyBtn>
                    <ThemeChangeToggle />
                </SettingWrap>
            </ViewTagGrid>
    )
}

export default ViewTag