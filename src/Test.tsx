import QuillCustom from "./Components/ReactQuill";
import QuillToolbar from "./EditorToolBar";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

interface IBtn {
  submit: boolean;
  pay: string;
}

const BUTTON = styled.button<IBtn>`
  border: 1px ${(props) => (props.submit ? "solid" : "dotted")} yellow;
  background: blue;
  color: white;
  font-weight: ${(props) => (props.pay === "shopping" ? "bold" : 500)};
`;

function Test() {
  const [value, setValue] = useState("");
  const [back, setBack] = useState(true);
  const quillRef = useRef<ReactQuill>(null);

  const onImage = () => {
    if (back === true) {
      setBack(false);
    } else {
      setBack(true);
    }
  };

  return (
    <div>
      <BUTTON submit={true} onClick={onImage} pay="nothing">
        First Button
      </BUTTON>
      {back === true ? (
        <div>
          <QuillToolbar />
          <QuillCustom />
        </div>
      ) : (
        <div>
          <QuillToolbar />
          <QuillCustom />
        </div>
      )}
    </div>
  );
}

export default Test;
