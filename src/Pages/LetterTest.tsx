import MainMenu from './mainTest'
import styled, {keyframes} from 'styled-components';
import ViewLetterList from '../Components/ViewLetterList';
import ViewTag from '../Components/ViewTag';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Letters_tag1, Letters_tag2, LetterType } from '../dummydata';
import { LetterPaper, LetterContent, PlusBtn } from '../styles/LetterTestCss';

import { useRecoilSnapshot, useRecoilState } from "recoil";
import { letterState } from "../atom"; // react-quill에서 넘어오는 버전으로 수정해서 다시 만들기
import ViewLetter from '../Components/ViewLetter';



const DividedPage = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    width: 100%;
`
const move = keyframes`
    from{
        width: 100%;
    }
    to{
        width: 50%;
    }
`
const MenuBar = styled.div`
    display: flex;
    justify-direction: row;

    width: 50%;
    animation: ${move} 0.3s linear;
`
const Opacity = keyframes`
    from{
        opacity: 0;
        width: 0%;
        visibility: hidden;
    }
    to{
        opacity: 1;
        width: 50%;
        visibility: visible;
    }
`
const LetterPage = styled.div`
    text-align: center;
    width: 50%;
    visibility: hidden;
    img{
        height: 80vh;
    }
    animation-duration: 2s;
    animation-name: ${Opacity};
    animation-fill-mode: forwards;
`
const BackBtn = styled.button`
    display: block;
    background-color: transparent;
    margin-left: 32px;
    margin-top: 15px;
    border: 0;
    img{
        width: 16px;
        height: 16px;
        &:hover{
            border-radius:9999px;
            background-color: gray;
        }
    }
`

function LetterTest(){
    const location = useLocation();
    const navigate = useNavigate();
    // const [tagName, setTagName] = useState(location.state.tagName) //이게 setTagId가 되는게 좋을지도? 아직 api 연결을 안해봐서 어떤게 더 나은지는 잘 모르겠어요
    // const [tagId, setTagId] = useState(location.state.tagId) //이것도 추가하는 방향으로 나중에 수정
    const [tag, setTag] = useState([location.state.tagName, location.state.tagId, location.state.tagColor])
    const [Letter, setLetter] = useRecoilState(letterState)
    const [plus, setPlus] = useState(false);
    console.log("편지 확인 페이지에서의 리스트: ", tag)
    console.log("letter Id:", location.state.letterId)
    console.log("letterId 타입: ", typeof(Number(location.state.letterId)))
    // const letterId = Number(location.state.letterId)
    // 이건 지금 letterId가 더미데이터 상에서 중복돼서 발생하는 문제로 보임
    // 백엔드에서는 letterId도 독립적인 상태니까 currentLetter에 넣어주는 형식으로 작성해도 괜찮을듯
    // 그리고 api 연결하면 이런 무식한 map 방식으로 id 찾기는 안해도 되니까 더더욱 괜찮을지도???? 
    // 이건 희망회로 돌려본다
    const onClickBack = () => {
        navigate("/home");
    }
    return(
        <div>
            {/* 분할 애니메이션 테스트입니다. */}
            <DividedPage>
                <MenuBar>
                    <ViewTag setTag={setTag}/>
                    <ViewLetterList tagName={tag[0]} tagId={tag[1]} tagColor={tag[2]}/>
                </MenuBar>
                <LetterPage>
                    <BackBtn onClick={onClickBack}><img src='/img/left-arrow.png'/></BackBtn>
                    <ViewLetter letterId={Number(location.state.letterId)}/>
                </LetterPage>
            </DividedPage>
        </div>
    )
}

export default LetterTest;
