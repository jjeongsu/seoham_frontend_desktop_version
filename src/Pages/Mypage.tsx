import { useEffect } from "react";
import {
  DeleteButton,
  InfoP,
  LogoutDiv,
  MypageMaindiv,
  ProfileDiv,
} from "../styles/MypageStyled";
import BackButton from "../Components/BackButton";
import { LoginButton } from "../Components/loginStyled";
import ModalContainername from "../Components/ModalContainer_name";
import ModalContainerPw from "../Components/ModalContainerPw";
import { useRecoilState } from "recoil";
import {
  Infostate,
  UserInfo,
  isLogAtom,
  popUpMessage,
  popUpModal,
} from "../atom";
import PopupMessage from "../Components/PopupMessage";
import S3Uploader from "../Components/ProfileAws";
import axios from "axios";

function Mypage() {
  const [modalOpen, setModalOpen] = useRecoilState(popUpModal);
  const [message, setMessage] = useRecoilState(popUpMessage);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean>(isLogAtom);
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(Infostate);
  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await axios.get(
          "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/mypage/info",
          { headers: { "x-access-token": localStorage.getItem("login_token") } }
        );
        setUserInfo({
          name: res.data.result.nickname,
          email: res.data.result.email,
          letterNum: res.data.result.letter,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, [userInfo, setUserInfo]);

  const Logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.removeItem("login_token");
    localStorage.removeItem("userIdx");
    setIsLoggedIn(false);
    setModalOpen(!modalOpen);
    setMessage("로그아웃 되었습니다.");
  };
  const Withdrawl = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      e.preventDefault();
      try {
        const res = await axios.delete(
          "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/mypage/delete",
          { headers: { "x-access-token": localStorage.getItem("login_token") } }
        );
        if (res.data.isSuccess) {
          setIsLoggedIn(false);
          localStorage.removeItem("login_token");
          setModalOpen(!modalOpen);
          setMessage("탈퇴가 완료되었습니다.");
        } else {
          setModalOpen(!modalOpen);
          setMessage(res.data.message);
        }
      } catch (error) {
        setModalOpen(!modalOpen);
        setMessage("서버 오류가 발생했습니다.");
      }
    }
  };

  const LetterIcon = () => {
    return (
      <div
        style={{
          width: "20px",
          marginRight: "8px",
          backgroundColor: "transparent",
        }}
      >
        <svg viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.8333 0.166687H2.16659C1.02075 0.166687 0.083252 1.10419 0.083252 2.25002V14.75C0.083252 15.8959 1.02075 16.8334 2.16659 16.8334H18.8333C19.9791 16.8334 20.9166 15.8959 20.9166 14.75V2.25002C20.9166 1.10419 19.9791 0.166687 18.8333 0.166687ZM18.4166 4.59377L11.6041 8.85419C10.927 9.28127 10.0728 9.28127 9.39575 8.85419L2.58325 4.59377C2.32284 4.4271 2.16659 4.14585 2.16659 3.84377C2.16659 3.14585 2.927 2.72919 3.52075 3.09377L10.4999 7.45835L17.4791 3.09377C18.0728 2.72919 18.8333 3.14585 18.8333 3.84377C18.8333 4.14585 18.677 4.4271 18.4166 4.59377Z"
            fill="white"
          />
        </svg>
      </div>
    );
  };
  return (
    <div>
      <div style={{ backgroundColor: "#EF9F9F" }}>
        <MypageMaindiv>
          <BackButton></BackButton>
        </MypageMaindiv>
        <S3Uploader />
        <ProfileDiv>
          <LetterIcon />
          <p style={{ backgroundColor: "transparent" }}>{userInfo.letterNum}</p>
        </ProfileDiv>
        <ProfileDiv>
          <div style={{ backgroundColor: "transparent" }}>
            <span>{userInfo.name}</span>
            <span>님</span>
          </div>
        </ProfileDiv>
      </div>
      <ProfileDiv>
        <div>
          <InfoP>이메일</InfoP>
          <p>{userInfo.email}</p>
          <InfoP>닉네임</InfoP>
          <ModalContainername nickName={userInfo.name} />
          <InfoP>현재 비밀번호</InfoP>
          <ModalContainerPw />
        </div>
      </ProfileDiv>
      <LogoutDiv>
        <LoginButton onClick={Logout}>
          로그아웃
          <PopupMessage message={message} />
        </LoginButton>
      </LogoutDiv>
      <ProfileDiv>
        <DeleteButton onClick={Withdrawl}>회원탈퇴</DeleteButton>
        <PopupMessage message={message} />
      </ProfileDiv>
    </div>
  );
}
export default Mypage;
