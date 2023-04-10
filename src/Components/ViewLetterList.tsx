import { ViewLetterListGrid, Test, TagNameBar, NullTagDiv, LetterBtn } from "../styles/MaintestCss"
import { Letters_tag1, Letters_tag2, LetterType } from "../dummydata";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from '../assets/logo.svg';
import styled from "styled-components";
import { currentLettersState, currentTagState, ITag } from "../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchLetterList } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { sortByNew, sortByOld } from "../sort";
import { on } from "events";

//안쓸거임 나중에 삭제하기
interface propsType {
    tagName: string;
    tagId: number;
    tagColor: string;
}

//select로 편지조회시 넘겨받을 편지 데이터
export interface ILetter  {
    "postIdx": number,
    "sender": string,
    "date": string,
    "letterIdx": number,
}

function ViewLetterList(){
	const [sorting, setSorting] = useState("");
  const navigate = useNavigate();
  //선택된 태그 불러오기
  const currentTag = useRecoilValue<ITag>(currentTagState);
  const tagID = currentTag.tagIdx;
  //선택된 태그에 해당하는 편지 불러오기
  const {isLoading:letterlistLoading, data: letterlistData} = useQuery<ILetter []>(["allLetters", tagID],()=>fetchLetterList(tagID));
	const [LetterList, setLetterList ]= useRecoilState(currentLettersState); //편지 상태 
  //letterListData에 태그-편지 리스트셋이 담김.
  console.log("태그이름",currentTag.tagName, "해당하는 편지 세트", letterlistData);
  const onClickLetter = (e:any) => {
		const letterId = e.target.id;
		console.log("id::::::", letterId);
		navigate("/letter", {state: {letterId}})
  }
  console.log(Letters_tag1)
	const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
		const sort = e.target.value;
		let sortedLetterList = [];
		setSorting(e.target.value);
		if(sort === 'by_new'){
			sortedLetterList = sortByNew([...LetterList]);
		}else if(sort === 'by_old'){ sortedLetterList = sortByOld([...LetterList])}
		else if(sort === 'by_sender'){
			//보낸이별 -> 어떻게 할지,..?
      //제일 왼쪽으로 보내자
		}
		setLetterList([...sortedLetterList]);
	}
return(
  <div style={{width:"50%"}}>
  {/* 선택된 태그 출력 파트 */}
  {
    currentTag.tagName == null ?
    <NullTagDiv>
      <span style={{width:"50%"}}><Logo /></span>
      <p>안녕하세요. 추억을 보관하는 서함입니다.</p>
      <p>태그를 선택해주세요.</p>
    </NullTagDiv>
    :
    <ViewLetterListGrid>
      <TagNameBar color={currentTag.tagColor}>
          <p># {currentTag.tagName}</p>
      </TagNameBar>
      <div>
        <img style={{width:"20px", marginBottom:"-5px", marginRight:"2px"}} src="/img/filter.png"/>
        <Filter onChange ={handleSelect} value={sorting}>
          <option value='by_new'>최신순</option>
          <option value='by_old'>오래된순</option>
          <option value='by_sender'>보낸이별</option>
        </Filter>
				{sorting === "by_sender"? "보낸이별로 보여줄 편지 리스트": null}
      </div>

      <div style={{marginTop:"5px", width:"100%", height:"78vh", overflow:"auto", display:"flex", flexDirection:"column", alignItems:"center"}}>
				{/* 여기다가작성  LetterList로 접근*/}
					{LetterList.map((letter, index) => (
						<LetterBtn key={letter.letterIdx} onClick={onClickLetter} id={letter.letterIdx.toString()}>
							<p className="sender">{letter.sender}</p>
							<p className="date">{letter.date}</p>
						</LetterBtn>
					))}
      </div>
      </ViewLetterListGrid>
			}
	</div>
  )
};

export default ViewLetterList

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