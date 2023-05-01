import { useRecoilState } from "recoil";
import { mypagePwModal } from "../atom";
import { CreateStyledInputButton } from "../Components/loginStyled";
import ModalPw from "../Components/Modal_pw";
import { FlexDiv, MypageInput } from "../styles/MypageStyled";
import { useRef } from "react";
import axios from "axios";

function ModalContainerPw() {
  const [modalOpen, setmodalOpen] = useRecoilState(mypagePwModal);
  const passRef = useRef<HTMLInputElement>(null);
  const modalClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/mypage/password/check",
        {
          password: passRef.current?.value,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("login_token"),
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.result.valid) {
        setmodalOpen(!modalOpen);
      } else {
        alert("다시 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      alert("서버 에러가 발생했습니다");
      console.log(error);
    }
  };
  const modalClose = () => {
    setmodalOpen(!modalOpen);
  };
  return (
    <FlexDiv>
      <MypageInput
        name="password"
        type="password"
        placeholder="현재 비밀번호 입력"
        ref={passRef}
      />
      <div style={{ width: "100%", marginLeft: "20px" }}>
        <CreateStyledInputButton onClick={modalClick}>
          변경
        </CreateStyledInputButton>
        {modalOpen && <ModalPw modalClose={modalClose} />}
      </div>
    </FlexDiv>
  );
}

export default ModalContainerPw;
