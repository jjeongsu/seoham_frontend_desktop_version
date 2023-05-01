import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MyModal,
  ModalButton,
  ModalErrorDiv,
  ModalErrorDivWrap,
  ModalH1,
  ModalMargin,
  ModalStyledInput,
  ModalStyledInputButton,
  MyPageModal,
} from "../styles/Modal";
import { FlexDiv } from "../styles/MypageStyled";

type Props = {
  modalClose: () => void;
  nickName?: string;
};

function Modalname({ modalClose }: Props, { nickName }: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<{ nickname: string; idCheck: boolean }>({ mode: "onChange" });

  const [check, setCheck] = useState<string>("");

  const CheckName = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/mypage/nickname/check/",
        {
          newNickname: watch("nickname"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (res.data.result.valid) {
        setCheck("사용 가능한 닉네임입니다");
        setValue("idCheck", true);
      } else {
        setCheck("사용 불가능한 닉네임입니다");
        setValue("idCheck", false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ChangeName = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (watch("idCheck")) {
      try {
        const res = await axios.patch(
          "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/mypage/nickname/modify/",
          {
            newNickname: watch("nickname"),
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("login_token"),
              "Content-Type": "application/json",
            },
          }
        );
        if (res.data.isSuccess) {
          alert(res.data.message);
          modalClose();
        } else {
          alert("오류가 발생하였습니다");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setCheck("해당 닉네임을 사용할 수 없습니다");
    }
  };

  return (
    <MyModal>
      <MyPageModal>
        <ModalH1>닉네임 중복 확인</ModalH1>
        <ModalMargin>
          <FlexDiv>
            <ModalStyledInput
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
            <ModalStyledInputButton onClick={CheckName}>
              중복확인
            </ModalStyledInputButton>
          </FlexDiv>
          <ModalErrorDivWrap>
            {errors.nickname?.type === "required" && (
              <ModalErrorDiv>닉네임을 입력해주세요</ModalErrorDiv>
            )}
            {errors.nickname?.type === "minLength" && (
              <ModalErrorDiv>닉네임 길이를 지켜주세요</ModalErrorDiv>
            )}
            {errors.nickname?.type === "maxLength" && (
              <ModalErrorDiv>닉네임 길이를 지켜주세요</ModalErrorDiv>
            )}
          </ModalErrorDivWrap>
        </ModalMargin>
        <ModalMargin>
          <p
            style={{
              justifyContent: "center",
              color: "#989898",
              fontSize: "11px",
              marginLeft: "30%",
            }}
          >
            {check}
          </p>
        </ModalMargin>
        <ModalMargin>
          <ModalButton type="submit" disabled={!isValid} onClick={ChangeName}>
            사용하기
          </ModalButton>
        </ModalMargin>
      </MyPageModal>
    </MyModal>
  );
}

export default Modalname;
