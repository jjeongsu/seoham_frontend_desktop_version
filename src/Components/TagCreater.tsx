import { match } from "assert";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ITag, tagState, userInfoState } from "../atom";
import axios from "axios";
import { useQuery } from "react-query";
const BASE_URL =  `http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080`;
const TAGCOLOR = [
  "#C7AC98",
  "#E7C3B1",
  "#F7DECF",
  "#F1DCD6",
  "#FFEDDB",
]
function TagCreater(){
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [tagList, setTagList] = useState<ITag[]>([]);
  const taglist: any[] = (()=> {
    let newlist: any[] = [];
    tagList.map((t) => newlist.push(t.tagName));
    return newlist;
  })(); //기존 태그리스트에서 name만 모은 배열
  const [tags,setTags] = useRecoilState(tagState); //atom
  const [isOpenBox, setIsOpenBox] = useState<boolean>(false); //드롭박스 펼칠지 말지
  const [inputValue, setInputValue] = useState<string>(""); //인풋필드에 들어온 값
  const [matchedTagList, setMatchedTagList] = useState<string []>(); //드롭박스로 펼쳐질 태그 리스트
  const [tagLiIndex, setTagLiIndex] = useState<number>(-1);
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value; 
    console.log(newValue);
    setInputValue(newValue);
    if(newValue.length > 0){
      const chosenList = taglist?.filter((tl) => 
        tl.includes(newValue)
      );
      setMatchedTagList(chosenList);
      chosenList.length > 0 && setIsOpenBox(true);
    }else{
      setIsOpenBox(false);
    }
  }

  const handleValid = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValue);
    const tag = inputValue;
    let isDubble = false; //중복검사 확인
    tags.map( t => {
      if(t.text === tag){ 
        console.log("태그이름이 중복됩니다.");
        isDubble = true;
        return ;
      }
    });
    !isDubble && setTags((oldTags) => [
      { text: tag, id: tagList[Number(tag.slice(-1))-1].tagIdx},
      ...oldTags,
    ]);
    setInputValue("");
    setIsOpenBox(false);
  }

  const handleRemove = (e:React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget : targetbutton,
    } = e;
    const spanValue = targetbutton.previousElementSibling?.innerHTML?.slice(1);
    setTags((prevTags) => {
      const targetIndex = tags.findIndex( t => t.text === spanValue);
      return [
        ...prevTags.slice(0, targetIndex),
        ...prevTags.slice(targetIndex+1),
      ]
    });
  }

  const handleListClick =(e : React.MouseEvent<HTMLLIElement>) => {
    const { currentTarget } = e;
    console.log(currentTarget.outerText);
    setInputValue(currentTarget.outerText);
    setIsOpenBox(false);
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log(e.key);
    if(matchedTagList !== undefined){
      if(e.key === 'ArrowDown' && matchedTagList.length -1 > tagLiIndex){
        setTagLiIndex(prev => prev + 1);
      }
      else if(e.key === 'ArrowUp' && tagLiIndex >= 0){
        setTagLiIndex(prev => prev -1);
      }
      else if(e.key === 'Enter' && tagLiIndex >=0){
        setInputValue(matchedTagList[tagLiIndex]);
        setTagLiIndex(-1);
      }
    }
  }
  const { isLoading: taglistLoading, data: tagData } = useQuery(
    ["allTags"],
    () => FetchTagList()
  );
  useEffect(() =>{
    const TAGLIST: ITag[] = [];
    tagData?.data.result.map((item: ITag) => TAGLIST.push(item));

    console.log(TAGLIST);
    setTagList(TAGLIST);
  }, [tagData])
  function FetchTagList() {
    return axios({
      method: 'get',
      url: `${BASE_URL}/posts/tags`,
      headers: {
        "X-ACCESS-TOKEN": userInfo.logintoken,
      }
    })
  }
  console.log('taglist', taglist);
  console.log('현재 atom에 들어간 tag', tags);
  useEffect(()=>{
    setTags([]);
  },[])
  return(
    < >
      <div style={{display:"block", padding:"1vw" }}>
      {tags.map((t) => 
          <TagLi
            color={TAGCOLOR[Math.floor(Math.random() * 5)]}
          >
            <span>#{t.text}</span>
            <button onClick={handleRemove}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="#545FE8" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6672 0.344141C14.2235 -0.0995447 13.5068 -0.0995447 13.0631 0.344141L7.5 5.89591L1.93686 0.332765C1.49317 -0.110922 0.776451 -0.110922 0.332765 0.332765C-0.110922 0.776451 -0.110922 1.49317 0.332765 1.93686L5.89591 7.5L0.332765 13.0631C-0.110922 13.5068 -0.110922 14.2235 0.332765 14.6672C0.776451 15.1109 1.49317 15.1109 1.93686 14.6672L7.5 9.1041L13.0631 14.6672C13.5068 15.1109 14.2235 15.1109 14.6672 14.6672C15.1109 14.2235 15.1109 13.5068 14.6672 13.0631L9.1041 7.5L14.6672 1.93686C15.0995 1.50455 15.0995 0.776451 14.6672 0.344141Z" fill="white"/>
              </svg>
            </button>
          </TagLi>
      )}
      </div>
      <form onSubmit = {handleValid}>
        <TagInput 
          placeholder = "태그를 입력하세요"
          type="text"
          name="tag"
          onChange = {handleChange}
          value = {inputValue}
          onKeyDown={handleKeyDown}
        />
      </form>
      {isOpenBox && (
        <DropDownBox
        >
          {
            matchedTagList?.map( (tag, index) => (
              <DropDwonList
                key={index}
                isFocus={index === tagLiIndex ? true : false}
                onClick = {handleListClick}>{tag}</DropDwonList>
            ))
          }
        </DropDownBox>
      )}
    </>
  )
}

const DropDownBox = styled.ul`
  border: 2px solid black;
  margin-top: 0px;
  width: 215px;
  border-radius: 20px;
  border: 1px solid transparent;
  border-image-slice: 1;
  border-top: none;
  padding-left: 15px;
`;
const DropDwonList = styled.li<{isFocus?: boolean}>`
  list-style: none;
  padding: 5px 0px;
  color: ${props => props.isFocus ? '#F47C7C': props.theme.textColor};
  font-size: 13px;
  font-weight: ${props => props.isFocus ? 800: 300}
`;
const TagLi = styled.li`
  list-style: none;
  display: inline-block;
  height: 30px;
  background-color: ${(props) => props.color};
  padding: 7px;
  border-radius: 20px;
  margin: 5px 3px 0px 0px;
  color: #606060;
  font-weight: 600;
  font-size: 15px;
  span {
    margin-right: 1px;
    padding-left: 4px;
  };
  button {
    border: none;
    background-color: transparent;
    svg {
      width: 10px;
      height: 10px;
    }
  }
`;
const TagForm = styled.form`
  border: 1px solid black;
`
const TagInput = styled.input`
  width: 200px;
  height: 2.5em;
  padding: 7px 15px;
  border: 1px solid #EF9F9F;
  border-radius: 20px;
  color: ${(props) => props.theme.textColor};
  margin-top: 10px;
  &:focus {
    outline:none;
  }
  background-color: transparent;
`;

export default TagCreater;