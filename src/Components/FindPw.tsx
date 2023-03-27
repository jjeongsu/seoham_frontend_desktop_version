import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  FindButton,
  LongInputDiv,
  NotFindButton,
  LoginInputDiv,
  CreateStyledInput,
  ChangePwInput,
  InfoFindButton,
  ErrorDiv,
  PWfindStyledInputButton,
  CreateTextH2,
} from "./loginStyled";

interface UserValue {
  email: string;
  password: string;
  passwordConfirm: string;
  emailCheck: boolean;
  numberCheck: boolean;
}

function FindPwPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [confirmShow, setConfirmShow] = useState<boolean>(false);
  const [admireNumber, setAdmireNumber] = useState("");
  const handleInputAdmire = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdmireNumber(e.target.value);
  };
  const onShowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShow(!show);
  };
  const onConfirmShowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setConfirmShow(!confirmShow);
  };
  const regExgPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserValue>({
    mode: "onChange",
  });
  const emailCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://seohamserver.shop/mail/send",
        {
          email: watch("email"),
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 200) {
        window.alert("사용가능한 이메일입니다.인증번호를 보냈습니다");
        setValue("emailCheck", true);
      } else {
        window.alert("이미 사용중이거나 유효하지 않는 이메일입니다");
        setValue("emailCheck", false);
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다.");
    }
  };

  const certifyCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://seohamserver.shop/mail/check",
        {
          authCode: admireNumber,
          email: watch("email"),
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.result === true) {
        alert("인증번호가 맞습니다 비밀번호 설정을 해주세요");
        setValue("numberCheck", true);
      } else {
        alert("인증번호가 맞지않습니다. 다시 시도해주세요");
        setValue("numberCheck", false);
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다.");
    }
  };

  const ChangePw = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      watch("emailCheck") === true &&
      watch("numberCheck") === true &&
      watch("password") === watch("passwordConfirm")
    ) {
      try {
        const res = await axios.patch(
          "https://seohamserver.shop/user/find-password",
          {
            email: watch("email"),
            passWord: watch("password"),
          },
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.data.result.success === true) {
          alert("비밀번호가 변경되었습니다. 로그인을 진행해주세요");
          navigate("/");
        } else {
          alert("조금 있다가 다시 시도해주십시오");
        }
      } catch (error) {
        alert("서버 오류가 발생했습니다.");
      }
    } else {
      alert("비밀번호 확인 및 이메일 인증번호 검사를 진행해주세요");
    }
  };
  return (
    <>
      <Link to="/find/Id">
        <NotFindButton>계정 찾기</NotFindButton>
      </Link>
      <FindButton>비밀번호 찾기</FindButton>
      <LongInputDiv></LongInputDiv>
      <CreateTextH2>비밀번호 찾기</CreateTextH2>
      <LoginInputDiv>
        <CreateStyledInput
          placeholder="이메일을 입력해주세요"
          type="email"
          id="userEmail"
          required
          {...register("email", { required: true })}
        />
        <PWfindStyledInputButton onClick={emailCheck}>
          인증번호 전송
        </PWfindStyledInputButton>
      </LoginInputDiv>
      <LoginInputDiv>
        <CreateStyledInput
          placeholder="인증번호를 입력해주세요"
          type="text"
          id="admireNumber"
          value={admireNumber}
          onChange={handleInputAdmire}
        />
        <PWfindStyledInputButton onClick={certifyCheck}>
          확인
        </PWfindStyledInputButton>
      </LoginInputDiv>
      <CreateTextH2>비밀번호 수정</CreateTextH2>
      <LoginInputDiv>
        <ChangePwInput
          placeholder="비밀번호를 입력해주세요"
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
      {errors.password?.type === "pattern" && (
        <ErrorDiv>
          비밀번호는 영문+숫자+특수문자 조합으로 8자리 이상 입력해주세요
        </ErrorDiv>
      )}
      <LoginInputDiv>
        <ChangePwInput
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
      {errors.passwordConfirm?.type === "pattern" && (
        <ErrorDiv>비밀번호 확인을 위해 입력해주세요</ErrorDiv>
      )}
      {errors.passwordConfirm && (
        <ErrorDiv>{errors.passwordConfirm.message}</ErrorDiv>
      )}
      <div style={{ paddingTop: "12px", paddingBottom: "12px" }}></div>
      <LongInputDiv>
        <InfoFindButton type="submit" disabled={!isValid} onClick={ChangePw}>
          비밀번호 변경
        </InfoFindButton>
      </LongInputDiv>
    </>
  );
}

export default FindPwPage;
