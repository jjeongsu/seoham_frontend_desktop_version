import moment from "moment";
import "../styles/quillstyle.css";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import { ImageResize } from "quill-image-resize-module-ts";
import QuillToolbar from "../EditorToolBar";
import QuillCustom from "./ReactQuill";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { letterState, pickedDate, tagState } from "../atom";
import Calender from "./Caldender";
import TagCreater from "./TagCreater";
import ThemeChangeBtn from "./ThemeChangeBtn";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

Quill.register("modules/ImageResize", ImageResize);

const Font = Quill.import("attributors/class/font");
Font.whitelist = ["arial", "buri", "gangwon"];
Quill.register(Font, true);

/*register함수에 필요한 값
  date : getdate
  sender : sender로 정의된 state
  tagIdx -> 기존에는 idx로 전달된 값, dt에서는 string으로 전달해야함.
  letterIdx : 편지지 선택하는 부분 만들기
  contents : from quill
*/

function Editor() {
  const navigate = useNavigate();
  const [sender, setSender] =useState<string>("")
  const getdate = String(moment(useRecoilValue(pickedDate)).format("YYYY년 MM월 DD일"));
  const gettags = useRecoilValue(tagState);
  const getcontents = useRecoilValue(letterState);
  const handleSenderChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSender(e.target.value);
  }
  const [isSaveClick, setIsSaveClick] = useState<boolean>(false); //최종 POST버튼
  const register = (e : React.MouseEvent<HTMLButtonElement>) => {
    setIsSaveClick(prev => !prev); //버튼색 바꾸고
    const tagIdlist: any[] = (()=> {
      let newlist: any[] = [];
      gettags.map((t) => newlist.push(t.id));
      return newlist;
    })();
    console.log('서버에 보낼 태그 아이디 리스트', tagIdlist);
    //서버에 보낼 객체 만들기 -> 만드는 중..
    const newPost = {
      date : getdate.slice(0,4)+getdate.slice(6,-5)+getdate.slice(10,-1),
      sender : sender, 
      contents: getcontents,
      letterIdx : null, //여기에 선택한 편지지 id,
      tagIdx: tagIdlist, //여기에 선택한 태그리스트 
    }
    //여기에 fetch 함수

    //페이지 넘기기
    setTimeout(() =>navigate("/home"), 1000);
  }
  console.log('tagids', gettags);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
      }}
    >
      <Header> 편지 작성하기
        <SaveBtn onClick = {register}>
          <BtnImg
            src={isSaveClick?
            "../savebtn_on.png"
            :
            "../savebtn_off.png"
            } />
        </SaveBtn>
      </Header>
      <Letter>
        <QuillContainer>
          <QuillToolbar />
          <QuillCustom />
        </QuillContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
          }}
        >
          <div>
            {getdate} 에 
            <Sender value={sender} onChange={handleSenderChange}/> 님으로 부터 온 편지
          </div>
          <TagCreater />
          <Calender />
        </div>
      </Letter>
      <ThemeChangeBtn />
    </div>
  );
}
export default Editor;

const Header = styled.h1`
  display: block;
  font-size: larger;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
  text-align: center;
  margin-bottom: 5vh;
`;
const SaveBtn = styled.button`
  border: none;
  width: 15px;
  height: 15px;
  background-color: transparent;
`;
const BtnImg = styled.img`
  width: 18px;
  height: 18px;
`
const QuillContainer = styled.div`
  background-color: aliceblue;
  border: 1px solid black;
  width: 60%;
  height: 70%;
`;
const Letter = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const Sender = styled.input`
  display: inline-block;
  margin-left: 5px;
  border: none;
  border-bottom: 0.2px solid ${(props) => props.theme.textColor};
  background-color: transparent;
  width: 3rem;
  &:focus {
    outline: none;
  }
  color: ${(props) => props.theme.textColor};
`;
