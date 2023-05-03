import { letterState } from "../atom";
import axios from "axios";
import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/quillstyle.css";
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
  const ImageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file: any = input.files ? input.files[0] : null;
      if (!file) return;
      const formData = new FormData();
      formData.append("profile", file);
      let quillObj = quillRef.current?.getEditor();
      const range = quillObj?.getSelection()!;
      try {
        const res = await axios.post(
          "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/images",
          formData
        );
        const imgUrl = res.data;
        quillObj?.insertEmbed(range.index, "image", `${imgUrl}`);
      } catch (error) {
        console.log(error);
      }
    };
  };

  // const ImageChanger = () => {
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   input.onchange = async () => {
  //     const file: any = input.files ? input.files[0] : null;
  //     if (!file) return;
  //     try {
  //       let quillObj = quillRef.current?.getEditor();
  //       const range = quillObj?.getSelection()!;
  //       console.log(range);
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = (el) => {
  //         const imgUrl = el.target?.result as string;

  //         const img = document.createElement("img");
  //         img.src = imgUrl;

  //         quillObj?.insertEmbed(range.index, "image", `${img.src}`);
  //       };
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // };

  // Modules object for setting up the Quill editor
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: ImageHandler,
        },
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
  }, []);

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
