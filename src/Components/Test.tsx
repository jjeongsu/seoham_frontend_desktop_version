import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Editor from "./Editor";
import CreateTag from "./TagMaker";

const Header = styled.h1`
  display: block;
  color: #393053;
  text-align: center;
`

function Test(){
  console.log("this is test page");
  return (
    <div style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <Header> Editor Test</Header>
      <CreateTag />
      <Editor />
    </div>);
}

export default Test;