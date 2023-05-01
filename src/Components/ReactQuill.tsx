import { letterState } from "../atom";
import axios from "axios";
import { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

function QuillCustom() {
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);
  const navigate = useNavigate();
  // 저장 버튼 -> recoil 임시 사용
  // const setLetter = useSetRecoilState(letterState);
  // const onClickSave = () => {
  //   setLetter(value);
  //   console.log(value);
  // };
  const [letter, setLetter] = useRecoilState(letterState);
  const onClickSave = () => {
    setLetter(value);
    console.log(value);
  };
  const onClickMenu = () => {
    navigate("/home");
  };
  //image URL로 변환하는 과정
  const ImageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async (e: any) => {
      const file: any = input && input.files ? input.files[0] : null;
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await axios.post("아히흥헹", formData);
        const URL = res.data.url;
        let quillObj = quillRef.current?.getEditor();
        const range = quillObj?.getSelection()!;
        quillObj?.insertEmbed(range?.index, "image", URL);
      } catch (error) {
        console.log("실패 ㅠㅜ");
      }
    };
  };
  // Modules object for setting up the Quill editor
  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {},
    },
    ImageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
  };

  // Formats objects for setting up the Quill editor
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "image",
    "color",
    "clean",
  ];
  return (
    <>
      <ReactQuill
        style={{
          height: "400px",
        }}
        ref={quillRef}
        modules={modules}
        formats={formats}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="내용을 입력하세요."
      />
      <button onClick={onClickSave}>저장</button>
      <button onClick={onClickMenu}>페이지 전환 테스트</button>
    </>
  );
}
export default QuillCustom;
