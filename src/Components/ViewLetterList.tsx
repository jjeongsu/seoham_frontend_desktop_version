import { ViewLetterListGrid, Test, TagNameBar, NullTagDiv } from "../styles/MaintestCss"
import { Letters_tag1, Letters_tag2, LetterType } from "../dummydata";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from '../assets/logo.svg';
import styled from "styled-components";
// import LetterBtn from "./LetterBtn";

interface propsType {
    tagName: string;
    tagId: number;
    tagColor: string;
}

const Filter = styled.select`
    margin-top: 10px;
    padding: 5px 30px 5px 10px;
    border-radius: 10px;
    outline: 0 none;
`

const LetterBtnCss = styled.button`
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    padding: 10px 30px;
    width: 90%;
    // height: 160px;
    margin: 5px;
    border-radius: 10px;
    border: 0;
    &:hover,
    &:active{
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    }
    .sender{
        align-self: flex-start;
        font-weight: bold;
        background: transparent;
        color: black;
    }
    .date{
        align-self: flex-end; 
        background: transparent;
        color: black;
    }
`

function ViewLetterList({tagName, tagId, tagColor}:propsType){
    console.log("??", tagName, tagId)
    const navigate = useNavigate();
    const onClickLetter = (e:any) => {
        const letterId = e.target.id;
        console.log("id::::::", letterId)
        navigate("/letter", {state: {letterId, tagName, tagId, tagColor}})
    }
    console.log(Letters_tag1)

    return(
        <div style={{width:"50%"}}>
        {/* 선택된 태그 출력 파트 */}
            {
                tagName == null ?
                    <NullTagDiv>
                        <span style={{width:"50%"}}><Logo /></span>
                        <p>안녕하세요. 추억을 보관하는 서함입니다.</p>
                        <p>태그를 선택해주세요.</p>
                    </NullTagDiv>
                    
                    :
                    <ViewLetterListGrid>
                        <TagNameBar color={tagColor}>
                            <p># {tagName}</p>
                        </TagNameBar>
                        <div>
                            <img style={{width:"20px", marginBottom:"-5px", marginRight:"2px"}} src="/img/filter.png"/>
                            <Filter>
                                <option>최신순</option>
                                <option>오래된순</option>
                                <option>보낸이별</option>
                            </Filter>
                        </div>
                        <div style={{marginTop:"5px", width:"100%", height:"78vh", overflow:"auto", display:"flex", flexDirection:"column", alignItems:"center"}}>
                        {
                            // 일단 여기 고쳐야함 - tag id 넘겨서 편지 리스트를 받는 api로 변경
                            tagId == 1 ?
                                Letters_tag1.map((letter) => (
                                    // <LetterBtn key={index} letter={letter}>
                                    //     <Test>얍</Test>                                
                                    // </LetterBtn>
                                    <LetterBtnCss key={letter.id} onClick={onClickLetter} id={(letter.id).toString()}>
                                        {/* background랑 color는 다크모드에서의 css 무시용 */}
                                        <p className="sender">{letter.sender}</p>
                                        <p className="date">{letter.date}</p>
                                    </LetterBtnCss>
                                ))
                                :
                                tagId == 2 ?
                                Letters_tag2.map((letter) => (
                                    // <LetterBtn key={index} letter={letter}>
                                    //     <Test>얍</Test>                                
                                    // </LetterBtn>
                                    <LetterBtnCss key={letter.id} onClick={onClickLetter} id={(letter.id).toString()}>
                                        <p className="sender">{letter.sender}</p>
                                        <p className="date">{letter.date}</p>
                                    </LetterBtnCss>
                                )):
                                null
                        }
                        </div>
                    </ViewLetterListGrid>
            } 

        </div>
    )
}

export default ViewLetterList