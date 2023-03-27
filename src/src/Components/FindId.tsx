import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  CreateStyledInput,
  CreateStyledInputButton,
  ErrorEmailCheckDiv,
  FindButton,
  InfoFindButton,
  LoginInputDiv,
  LongInputDiv,
  NotFindButton,
} from "./loginStyled";

function FindIdPage() {
  const [emailMessage, setEmailMessage] = useState<String>("");
  const {
    register,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<{ nickname: string; findEmail: boolean }>({ mode: "onChange" });
  const ValidEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://seohamserver.shop/user/check-find-email/?nickName=${watch(
          "nickname"
        )}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.result.exist === true) {
        alert("닉네임이 유효합니다. 이메일 찾기를 눌러주세요");
        setValue("findEmail", true);
      } else {
        alert("닉네임이 존재하지 않습니다");
        setValue("findEmail", false);
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다.");
    }
  };
  const FindEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (watch("findEmail") === true) {
      try {
        const res = await axios.get(
          `https://seohamserver.shop/user/find-email/?nickName=${watch(
            "nickname"
          )}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.data.isSuccess === true) {
          setEmailMessage(` : 당신의 이메일은 ${res.data.result.email}입니다.`);
        } else {
          alert("이메일이 존재하지 않습니다");
          setEmailMessage("");
        }
      } catch (error) {
        alert("서버 오류가 발생했습니다.");
      }
    } else {
      alert("닉네임 확인을 먼저 해주세요");
      setEmailMessage("");
    }
  };
  return (
    <>
      <FindButton>계정 찾기</FindButton>
      <Link to="/find/Pw">
        <NotFindButton>비밀번호 찾기</NotFindButton>
      </Link>
      <div style={{ paddingTop: "40px", paddingBottom: "40px" }}></div>
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
        <CreateStyledInputButton
          type="submit"
          disabled={!isValid}
          onClick={ValidEmail}
        >
          확인
        </CreateStyledInputButton>
      </LoginInputDiv>
      <ErrorEmailCheckDiv>인증결과 {emailMessage}</ErrorEmailCheckDiv>
      <div style={{ paddingTop: "12px", paddingBottom: "12px" }}></div>
      <LongInputDiv>
        <InfoFindButton onClick={FindEmail}>이메일 찾기</InfoFindButton>
      </LongInputDiv>
    </>
  );
}

export default FindIdPage;
