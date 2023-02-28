import { match } from "assert";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { tagState } from "../atom";

function TagCreater(){
  const taglist = ['apple', 'banana', 'cinamon','alice']; //이미 만들어진 태그들
  const [tags,setTags] = useRecoilState(tagState);
  const [isOpenBox, setIsOpenBox] = useState<boolean>(false); //드롭박스 펼칠지 말지
  const [inputValue, setInputValue] = useState<string>(""); //인풋필드에 들어온 값
  const [matchedTagList, setMatchedTagList] = useState<string []>(); //드롭박스로 펼쳐질 태그 리스트
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value; 
    console.log(newValue);
    setInputValue(newValue);
    if(newValue.length > 0){
      const chosenList = taglist.filter((tl) => 
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
      { text: tag, id: Date.now()},
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
  return(
    <>
      <div>
      {tags.map((t) => 
          <TagLi>
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
          type="text"
          name="tag"
          onChange = {handleChange}
          value = {inputValue}
        />
      </form>
      {isOpenBox && (
        <DropDownBox>
          {
            matchedTagList?.map( (tag, index) => (
              <DropDwonList>{tag}</DropDwonList>
            ))
          }
        </DropDownBox>
      )}
    </>
  )
}

const DropDownBox = styled.ul`
  border: 2px solid black;
`;
const DropDwonList = styled.li`
  list-style: none;
`;
const TagLi = styled.li`
  list-style: none;
  display: inline-block;
  height: 20px;
  background-color: #C5C9FA;
  padding: 7px;
  border-radius: 20px;
  margin: 0px 3px 3px 0px;
  color: #545FE8;
  font-size: 15px;
  span {
    margin-right: 1px;
    padding-left: 4px;
  };
  button {
    border: none;
    background-color: transparent;
    color: #545FE8;
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
  width: 90%;
  height: 20px;
  padding: 7px 15px;
  border: 1px solid #545FE8;
  border-radius: 20px;
  border: 1px solid transparent;
  border-image: linear-gradient(to right, violet 0%, #545FE8 100%);
  border-image-slice: 1;
  color: #545FE8;
  margin-top: 10px;
  &:focus {
    outline:none;
  }
`;

export default TagCreater;