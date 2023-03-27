import moment from "moment";
import "../styles/quillstyle.css";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import { ImageResize } from "quill-image-resize-module-ts";
import QuillToolbar from "../EditorToolBar";
import QuillCustom from "./ReactQuill";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { pickedDate, tagState } from "../atom";
import Calender from "./Caldender";
import TagCreater from "./TagCreater";
import ThemeChangeBtn from "./ThemeChangeBtn";

Quill.register("modules/ImageResize", ImageResize);

const Font = Quill.import("attributors/class/font");
Font.whitelist = ["arial", "buri", "gangwon"];
Quill.register(Font, true);

function Editor() {
  const getdate = moment(useRecoilValue(pickedDate)).format("YYYY년 MM월 DD일");
  const gettags = useRecoilValue(tagState);
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
      <Header> 편지 작성하기</Header>
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
            {getdate} 에 <Sender /> 님으로 부터 온 편지
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
