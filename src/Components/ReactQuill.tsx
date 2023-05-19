import { imgSrcState, letterState } from "../atom";
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
  const [imgSrc, setImgSrc] = useRecoilState(imgSrcState);
  const onClickSave = () => {
    setLetter(value);
    console.log(value);
    setImgSrc(separateImg());
  };
  const onClickMenu = () => {
    navigate("/home");
  };

  const separateImg = () => {
    // 나올 수 있는 모든 태그로 쪼개고 조인하고 쪼개서 배열로 만들기(,는 태그 안에도 포함될 수 있어서 제일 안쓰일 것 같은 *로 구분자를 생성함)
    let tmp_letter = value
      .split("</p>")
      .join("*")
      .split("</h1>")
      .join("*")
      .split("</h2>")
      .join("*")
      .split("</h3>")
      .join("*")
      .split("</h4>")
      .join("*")
      .split("</h5>")
      .join("*")
      .split("</h6>")
      .join("*")
      .split("</blockquote>")
      .join("*")
      .split("*");
    let first_img = ""; //첫번째 img src를 담을 변수

    for (let idx = 0; idx < tmp_letter.length; idx++) {
      if (tmp_letter[idx].includes("<img")) {
        //<img 태그를 포함하면 if문 통과
        // console.log(tmp_letter[idx])
        let newSrc = "";
        for (let i = tmp_letter[idx].length - 1; i >= 0; i--) {
          newSrc += tmp_letter[idx][i];
          if (newSrc.slice(-9, -1) === "=crs gmi") {
            // 역순으로 확인하기 때문에 마지막에 나오는 문자열을 비교할때도 역순으로
            // console.log(newSrc);
            break;
          }
        }
        // console.log(newSrc);
        const result = newSrc.split("").reverse().join(""); //다시 역순으로 돌리기
        if (result != "") {
          first_img = result.slice(10).split('"')[0];
          //<img src="~~~" 형식으로 저장돼서 slice로 앞에 "까지 자르고, split으로 " 기준으로 자르고 첫번째 원소 선택
          break;
        }
      }
    }
    console.log("진짜 최종 img src:", first_img);
    return first_img;
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
      try {
        const res = await axios.post(
          "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/images",
          formData
        );
        const imgUrl = res.data;
        let quillObj = quillRef.current?.getEditor();
        const range = quillObj?.getSelection()!;
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
      {/* <button onClick={onClickSave}>저장</button>
      <button onClick={onClickMenu}>페이지 전환 테스트</button> */}
    </>
  );
}
export default QuillCustom;
