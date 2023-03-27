import { Outlet, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { CreateTextH1, FindHeaderDiv, LongInputDiv } from "./loginStyled";

function FindPage() {
  const navigate = useNavigate();
  return (
    <>
      <FindHeaderDiv>
        <BackButton></BackButton>
        <CreateTextH1>계정/비밀번호 찾기</CreateTextH1>
      </FindHeaderDiv>
      <LongInputDiv></LongInputDiv>
      <Outlet />
    </>
  );
}

export default FindPage;
