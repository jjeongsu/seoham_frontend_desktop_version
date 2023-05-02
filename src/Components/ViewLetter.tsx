import {
  LetterPaper,
  LetterContent,
  PlusBtn,
  ContentDiv,
} from "../styles/LetterTestCss";
import { Letters_tag1, Letters_tag2, LetterType } from "../dummydata";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { letterState, currentViewLetter,LetterInfo, userInfoState } from "../atom"; // react-quill에서 넘어오는 버전으로 수정해서 다시 만들기
import styled from "styled-components";

interface propsType {
  letterId: number;
  //setTagId:Funtion; 도 추가하기(api 호출에 필요할듯)
}

const TagBtn = styled.div`
    background: ${(props) => props.color};
    border-radius: 30px;
    padding: 5px;
    margin: 0 5px;
    color: black;
`

function ViewLetter({ letterId }: propsType) {
  console.log("얍", typeof letterId, letterId);
  const [plus, setPlus] = useState(false);
  const [Letter, setLetter] = useRecoilState(letterState);
  const [currentLetter, setCurrentLetter] = useRecoilState(currentViewLetter);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const BASE_URL = "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080"
  useEffect(() => {
    fetch(`${BASE_URL}/posts/${letterId}`, {
      method: "GET",
      headers: {
        "X-ACCESS-TOKEN": userInfo.logintoken,
      }
    })
    .then((res)=>res.json())
    .then((res)=>{
      setCurrentLetter(res.result)
      console.log(currentLetter)
    })
        // fetch(`${BASE_URL}/posts/tags/${tagID}`, {
    //   method: "GET",
    //   headers: {
    //     "X-ACCESS-TOKEN": userInfo.logintoken,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     res.result.map((item: ILetter) => LETTERLIST.push(item));
    //     setLetters([...LETTERLIST]);
    //   });
    // return [...LETTERLIST];
  }, [])
  useEffect(() => {
    setPlus(false);
  }, [letterId]);
  const onClickPlus = () => {
    setPlus(true);
    console.log("plus");
  };
  console.log(plus);

  return (
  <div>
    <div style={{position:"relative", width:"100%", height:"86vh"}}>
        {/* <LetterPaper src='/img/autumn.png'/>   */}
        <LetterPaper paper={(currentLetter.paper)}/>
        <LetterContent paper={Number(currentLetter.paper)}>
            <p className='sender'><span>{currentLetter.sender}</span>님에게서 온 편지</p>
            {/* <p className='content'>{currentLetter.content}</p> */}

            {/* content, button 둘 다 styled-component로 수정해서 props 전달받을 수 있게 수정하기 */}
            {/* <div className='content' dangerouslySetInnerHTML={{__html:Letter}}></div> */}
            <ContentDiv clickprops={plus} dangerouslySetInnerHTML={{__html:Letter}}></ContentDiv>
            <PlusBtn clickprops={plus} onClick={onClickPlus}>더보기</PlusBtn> 
            <p className='date'>{currentLetter.date}</p>
        </LetterContent>
    </div>
    <div style={{display:"flex", justifyContent:"center", paddingBottom:"3px"}}>
        {
            currentLetter.tagIdx.map((id, index) => (
                <TagBtn color={currentLetter.tagColor[index]} key={id}>{currentLetter.tagName[index]}</TagBtn>
            ))
        }                
    </div>
  </div>
  );
}

export default ViewLetter;
