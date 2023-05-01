import styled from "styled-components";
//padding 이나 margin 순서 위부터! 시계방향으로!
export const LoginButton = styled.button`
  background-color: #f47c7c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 48px 8px 48px;
  width: 240px;
  height: 40px;
  top: calc(50% - 40px / 2 + 70.5px);
  cursor: pointer;
`;
//서함 타이틀 부분
export const TextHeader = styled.h1`
  margin: 40px 0px 40px 0px;
  padding: 20px 0px 28px 0px;
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  color: #ff8080;
`;

export const StyledInput = styled.input`
  border-radius: 4px;
  border-width: 1px;
  padding: 4px 0px 4px 0px;
  width: 200px;
  height: 25px;
  top: 20%;
  left: 9px;
  bottom: 17.5%;
  background-color: transparent;
  border-color: #989898;
  line-height: 17px;
  align-items: center;
`;

export const LongInputDiv = styled.div`
  justify-content: center;
  margin: 48px 0px 24px 0px;
  display: flex;
`;

export const LoginInputDiv = styled.div`
  justify-content: center;
  margin: 12px 0px 12px 0px;
  display: flex;
`;

export const FindHeaderDiv = styled.div`
  justify-content: center;
  margin: 12px 0px 12px 0px;
  display: flex;
  position: sticky;
  top: 0;
`;

//아이디, 비번, 회원가입 버튼 부분
export const FindInfoText = styled.button`
  padding: 4px;
  margin: 4px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  align-items: center;
  text-align: center;
  letter-spacing: -0.05em;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  /* border-color: transparent black transparent transparent; */
  /* border-right: solid; */
`;
// 사이 줄 생성(버튼 border로 하려했으나 margin으로 인해 원하는대로 되지않아서 이걸로 대체)
export const LineInfoText = styled.button`
  padding: 4px;
  margin: 4px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  align-items: center;
  text-align: center;
  letter-spacing: -0.05em;
  background-color: transparent;
  border-color: transparent;
`;

export const CreateTextH2 = styled.h2`
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -200px;
`;

export const CreateTextH1 = styled.h1`
  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  align-items: center;
  margin: 20px 0px 20px 0px;
`;

export const CreateStyledInput = styled.input`
  width: 180px;
  height: 25px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  background-color: transparent;
  border: 0.5px solid;
  border-color: transparent transparent #989898 transparent;
`;

export const CreateStyledInputButton = styled.button`
  width: 75px;
  height: 25px;
  background-color: transparent;
  border-radius: 20px;
  border: 0.5px solid;
  border-color: #ef9f9f;
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
  text-align: center;
  color: #ef9f9f;
`;

export const CreateStyledInputButtonWhite = styled.button`
  width: 75px;
  height: 25px;
  background-color: transparent;
  border-radius: 20px;
  border: 0.5px solid;
  border-color: #ef9f9f;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  text-align: center;
  color: #ef9f9f;
  background-color: white;
`;

export const PWfindStyledInputButton = styled.button`
  width: 75px;
  height: 25px;
  background-color: transparent;
  border-radius: 20px;
  border: 0.5px solid;
  border-color: #ef9f9f;
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
  margin-left: 35px;
  text-align: center;
  color: #ef9f9f;
`;

export const ErrorDiv = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  align-items: center;
  color: #989898;
  display: flex;
  justify-content: center;
  margin-left: -150px;
`;

export const ErrorConfirmDiv = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  align-items: center;
  color: #989898;
  display: flex;
  justify-content: center;
  margin-left: -120px;
`;

export const ErrorEmailCheckDiv = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  align-items: center;
  color: #989898;
  display: flex;
  justify-content: center;
  margin-left: -230px;
`;

export const ErrorPwDiv = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  align-items: center;
  color: #989898;
  display: flex;
  justify-content: center;
  margin-left: 25px;
`;

export const LoginErrorDiv = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  margin: 0% 30% 0% 0%;
  padding-left: 30%;
  align-items: center;
  text-align: center;
`;

//이건 계정찾기, 비밀번호 찾기(위에 있는 버튼) 용도
export const FindButton = styled.button`
  width: 50%;
  text-align: center;
  background-color: transparent;
  color: #ef9f9f;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid;
  padding-bottom: 20px;
  border-color: transparent transparent #ef9f9f transparent;
`;

export const NotFindButton = styled.button`
  width: 50%;
  text-align: center;
  background-color: transparent;
  color: #bababa;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid;
  padding-bottom: 20px;
  border-color: transparent transparent #bababa transparent;
`;
//이메일 찾기나 비밀번호 찾기 버튼
export const InfoFindButton = styled.button`
  width: 260px;
  height: 40px;
  background-color: #ef9f9f;
  color: white;
  border-radius: 20px;
  justify-content: center;
  text-align: center;
  border-color: transparent;
`;
//비밀번호 찾기 페이지에서의 비밀번호 수정 전용 CSS
export const ChangePwInput = styled.input`
  width: 220px;
  height: 25px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14.4px;
  background-color: transparent;
  border: 0.5px solid;
  border-color: transparent transparent #989898 transparent;
`;
