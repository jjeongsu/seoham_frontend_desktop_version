import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";
interface IContent {
  text: string;
}
const QuilContainer = styled.div`
  width: 45vw;
  height: 650px;
  margin-top: 30px;

`

const modules = {
  toolbar : "yes",
}

function Editor(){
  const [content, setContent] = useState();
  const onChangeContents= (contents : any) =>{
    console.log(contents);
    setContent(contents);
  }
  return( 
  <QuilContainer>
    <ReactQuill 
      value = {content}
      placeholder="내용을 입력해 주세요"
      onChange={onChangeContents}/>
  </QuilContainer>
  );
}
export default Editor;