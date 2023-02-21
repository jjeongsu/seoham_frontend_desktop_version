import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { tagState } from "../atom";

interface IForm {
  tag: string;
}
interface IValue {
  value: string | null;
}
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

const TagContainer = styled.div`
  width: 45vw;
`;
const ErrorMessage = styled.div`
  font-size: 10px;
  color:red;
  padding-left: 15px;
`
const DropDownBox = styled.ul`
  
`;
const DropDownItem = styled.li`
  
`;
const TAGLIST = ['birthday', 'christmas', 'hello'];

function CreateTag(){
  const {register, handleSubmit, setValue, formState: {errors}, watch} = useForm<IForm>();
  const [inputValue, setInputValue] = useState<string>();
  const [isHaveInputValue, setIsHaveInputValue] = useState<boolean>(false)
  const [dropDownList, setDropDownList] = useState(TAGLIST);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  const [tags,setTags] = useRecoilState(tagState);
  console.log(errors);
  const handleValid = ({ tag }: IForm) => {
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
    setValue("tag", "");
    console.log(tags); //아톰에 담긴 전체 태그리스트 확인
  };

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

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    console.log(typeof(e.target.value));
    setInputValue(e.target.value);
    setIsHaveInputValue(true);
  }
  const handleDropDownKey = () => {
    //input 있을때만
    
  };
  const showDropDownList = () => {
    if( inputValue === ''){
      setIsHaveInputValue(false);
    }
  }
  const clickDropDownItem = (clickedItem: string ) => {
    setInputValue(clickedItem);
    setIsHaveInputValue(false);
  }
  useEffect(showDropDownList, [inputValue]);
  return (
    <TagContainer>
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
      <form onSubmit={handleSubmit(handleValid)}>
        <TagInput 
          {
            ...register("tag", {
              required: "태그는 하나이상 입력되어야 합니다.",
              minLength: 2,
              maxLength: 10,
              validate: 
              {
                noSibal: (value) => value.includes("sibal") ? "욕은 안되요" : true,
                noSpaceBar: (value) => value.includes(" ") ? "공백은 태그에 포함될 수 없습니다." : true,
              },
            })
          }
          placeholder="태그를 입력해 주세요"
          onChange={handleChange}
          value = {inputValue}
        />

        { isHaveInputValue && (
          <DropDownBox>
            {
              dropDownList.length === 0 && (
                <DropDownItem> 해당하는 단어가 없습니다.</DropDownItem>
              )
            }
            {
              dropDownList.map((item, index) => {
                return(
                  <DropDownItem 
                    key={dropDownItemIndex}
                    onClick ={ () => clickDropDownItem(item)}
                    onMouseOver = {() => setDropDownItemIndex(index)} 
                  >
                    {item}
                  </DropDownItem>  
                )
              })
            }
          </DropDownBox>
        )
        }
      </form>
      <ErrorMessage>{errors.tag?.message}</ErrorMessage>
    </TagContainer>);
}

export default CreateTag;