import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BackButton from "./BackButton";
import {
  CreateStyledInput,
  CreateStyledInputButton,
  CreateTextH1,
  CreateTextH2,
  ErrorConfirmDiv,
  ErrorDiv,
  ErrorPwDiv,
  LoginButton,
  LoginInputDiv,
  LongInputDiv,
} from "./loginStyled";
import { useRecoilState } from "recoil";
import { popUpMessage, popUpModal } from "../atom";
import PopupMessage from "./PopupMessage";

interface UserValue {
  email: string;
  password: string;
  nickname: string;
  passwordConfirm: string;
  idCheck: boolean;
  emailCheck: boolean;
  numberCheck: boolean;
}

function CreatePage() {
  const [admireNumber, setAdmireNumber] = useState("");
  const [modalOpen, setModalOpen] = useRecoilState(popUpModal);
  const [message, setMessage] = useRecoilState(popUpMessage);
  const [show, setShow] = useState<boolean>(false);
  const [confirmShow, setConfirmShow] = useState<boolean>(false);
  const handleInputAdmire = (e: any) => {
    setAdmireNumber(e.target.value);
  };

  const onShowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShow(!show);
  };

  const onConfirmShowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setConfirmShow(!confirmShow);
  };

  const Idcheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/user/check-join-nickname/?nickName=${watch(
          "nickname"
        )}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.result.valid === true) {
        setModalOpen(!modalOpen);
        setMessage("사용가능한 닉네임입니다.");
        setValue("idCheck", true);
      } else {
        setModalOpen(!modalOpen);
        setMessage("사용불가능한 아이디이거나 중복됩니다.");
        setValue("idCheck", false);
      }
    } catch (error) {
      console.log(error);
      setModalOpen(!modalOpen);
      setMessage("서버 오류가 발생했습니다.");
    }
  };

  const emailCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/mail/send",
        {
          email: watch("email"),
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 200) {
        setModalOpen(!modalOpen);
        setMessage("사용가능한 이메일입니다.인증번호를 보냈습니다");
        setValue("emailCheck", true);
      } else {
        setModalOpen(!modalOpen);
        setMessage("이미 사용중이거나 유효하지 않는 이메일입니다");
        setValue("emailCheck", false);
      }
    } catch (error) {
      setModalOpen(!modalOpen);
      setMessage("서버 오류가 발생했습니다.");
    }
  };

  const certifyCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/mail/check",
        {
          authCode: admireNumber,
          email: watch("email"),
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.result === true) {
        setModalOpen(!modalOpen);
        setMessage("인증번호가 맞습니다 비밀번호 설정을 해주세요");
        setValue("numberCheck", true);
      } else {
        setModalOpen(!modalOpen);
        setMessage("인증번호가 맞지않습니다. 다시 시도해주세요");
        setValue("numberCheck", false);
      }
    } catch (error) {
      setModalOpen(!modalOpen);
      setMessage("서버 오류가 발생했습니다");
    }
  };

  const clickSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      // watch("emailCheck") === false ||
      watch("idCheck") === false ||
      // watch("numberCheck") === false ||
      watch("password") !== watch("passwordConfirm")
    ) {
      setModalOpen(!modalOpen);
      setMessage("유효성 검사 및 비밀번호 설정을 완료해주세요");
    } else {
      try {
        const res = await axios.post(
          "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/user/join",
          {
            email: watch("email"),
            passWord: watch("password"),
            nickName: watch("nickname"),
          }
        );
        if (res.status === 200) {
          setModalOpen(!modalOpen);
          setMessage("가입이 완료되었습니다");
        } else {
          setModalOpen(!modalOpen);
          setMessage("조금 있다가 다시 시도해주세요");
        }
      } catch (error) {
        setModalOpen(!modalOpen);
        setMessage("서버 오류가 발생했습니다");
      }
    }
  };

  // const Idcheck = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   fetch(
  //     `https://seohamserver.shop/user/check-join-nickname/?nickName=${watch(
  //       "nickname"
  //     )}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.result.valid === true) {
  //         alert("사용가능한 닉네임입니다.");
  //         setValue("idCheck", true);
  //         console.log(watch("idCheck"));
  //       } else {
  //         alert("사용불가능한 아이디이거나 중복됩니다.");
  //         setValue("idCheck", false);
  //         console.log(watch("idCheck"));
  //       }
  //     });
  // };

  const regExpEm =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  const regExgPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserValue>({
    mode: "onChange",
  });

  return (
    <>
      <LoginInputDiv>
        <BackButton from="create"></BackButton>
        <CreateTextH1>회원가입</CreateTextH1>
      </LoginInputDiv>
      <LongInputDiv></LongInputDiv>
      <CreateTextH2>
        계정&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </CreateTextH2>
      <LoginInputDiv>
        <CreateStyledInput
          placeholder="이메일을 입력해주세요"
          type="email"
          id="userEmail"
          required
          {...register("email", { required: true, pattern: regExpEm })}
        />
        <CreateStyledInputButton onClick={emailCheck}>
          인증번호 전송
          <PopupMessage message={message} />
        </CreateStyledInputButton>
      </LoginInputDiv>
      {errors.email?.type === "required" && (
        <ErrorDiv>이메일을 입력해주세요</ErrorDiv>
      )}
      {errors.email?.type === "pattern" && (
        <ErrorDiv>잘못된 이메일 형식입니다</ErrorDiv>
      )}
      <LoginInputDiv>
        <CreateStyledInput
          placeholder="인증번호를 입력해주세요"
          type="text"
          id="admireNumber"
          value={admireNumber}
          onChange={handleInputAdmire}
        />
        <CreateStyledInputButton onClick={certifyCheck}>
          확인
          <PopupMessage message={message} />
        </CreateStyledInputButton>
      </LoginInputDiv>
      <CreateTextH2>닉네임&nbsp;&nbsp;&nbsp;&nbsp;</CreateTextH2>
      <LoginInputDiv>
        <CreateStyledInput
          placeholder="닉네임을 입력해주세요(2~8자)"
          type="nickname"
          id="userNickname"
          required
          {...register("nickname", {
            required: true,
            minLength: 2,
            maxLength: 8,
          })}
        />
        <CreateStyledInputButton onClick={Idcheck}>
          중복확인
          <PopupMessage message={message} />
        </CreateStyledInputButton>
      </LoginInputDiv>
      {errors.nickname?.type === "required" && (
        <ErrorDiv>닉네임을 입력해주세요</ErrorDiv>
      )}
      {errors.nickname?.type === "minLength" && (
        <ErrorDiv>닉네임 길이를 지켜주세요</ErrorDiv>
      )}
      {errors.nickname?.type === "maxLength" && (
        <ErrorDiv>닉네임 길이를 지켜주세요</ErrorDiv>
      )}
      <CreateTextH2>비밀번호</CreateTextH2>
      <LoginInputDiv>
        <CreateStyledInput
          placeholder="비밀번호 입력"
          type={show ? "text" : "password"}
          id="userPw"
          required
          {...register("password", { required: true, pattern: regExgPw })}
        />
        <button
          style={{
            position: "relative",
            backgroundColor: "transparent",
            borderColor: "transparent",
            marginLeft: "32px",
          }}
          onClick={onShowClick}
        >
          {show ? (
            <img
              src="/img/show.png"
              style={{ width: "18.33px", height: "15.27px" }}
              alt="show"
            />
          ) : (
            <img
              src="/img/hide.png"
              style={{ width: "18.33px", height: "15.27px" }}
              alt="hide"
            />
          )}
        </button>
      </LoginInputDiv>
      {errors.password?.type === "required" && (
        <ErrorDiv>비밀번호를 입력해주세요</ErrorDiv>
      )}
      {errors.password?.type === "pattern" && (
        <ErrorPwDiv>
          비밀번호는 영문+숫자+특수문자 조합으로 8자리 이상 입력해주세요
        </ErrorPwDiv>
      )}
      <LoginInputDiv>
        <CreateStyledInput
          placeholder="비밀번호를 확인해주세요"
          type={confirmShow ? "text" : "password"}
          id="userPasswordConfirm"
          required
          {...register("passwordConfirm", {
            required: true,
            validate: {
              check: (value) => {
                if (watch("password") !== value) {
                  return "비밀번호가 일치하지 않습니다.";
                }
              },
            },
          })}
        />
        <button
          style={{
            position: "relative",
            backgroundColor: "transparent",
            borderColor: "transparent",
            marginLeft: "32px",
          }}
          onClick={onConfirmShowClick}
        >
          {confirmShow ? (
            <img
              src="/img/show.png"
              style={{ width: "18.33px", height: "15.27px" }}
              alt="show"
            />
          ) : (
            <img
              src="/img/hide.png"
              style={{ width: "18.33px", height: "15.27px" }}
              alt="hide"
            />
          )}
        </button>
      </LoginInputDiv>
      {errors.passwordConfirm?.type === "required" && (
        <ErrorDiv>비밀번호 확인을 위해 입력해주세요</ErrorDiv>
      )}
      {errors.passwordConfirm && (
        <ErrorConfirmDiv>{errors.passwordConfirm.message}</ErrorConfirmDiv>
      )}
      <LongInputDiv>
        <LoginButton type="submit" disabled={!isValid} onClick={clickSignUp}>
          확인
          <PopupMessage message={message} />
        </LoginButton>
      </LongInputDiv>
    </>
  );
}

export default CreatePage;
