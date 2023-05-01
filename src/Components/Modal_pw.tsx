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
  MyPageModal,
} from "styles/Modal";
import { FlexDiv } from "styles/MypageStyled";

type Props = {
  modalClose: () => void;
};

interface PwValue {
  password: string;
  passwordConfirm: string;
  numberCheck: boolean;
}

function ModalPw({ modalClose }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const [confirmShow, setConfirmShow] = useState<boolean>(false);
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
  } = useForm<PwValue>({
    mode: "onChange",
  });

  const changePawword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/mypage/password/check",
        {
          password: watch("password"),
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("login_token"),
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.result.valid) {
      } else {
        const res = await axios.patch(
          "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080/mypage/password/modify",
          {
            newPassword: watch("password"),
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("login_token"),
              "Content-Type": "application/json",
            },
          }
        );
        if (res.data.isSuccess) {
          alert(res.data.result);
        } else {
          alert("오류가 발생했습니다");
        }
      }
    } catch (error) {
      console.log(error);
    }
    modalClose();
  };

  return (
    <MyModal>
      <MyPageModal>
        <ModalH1>비밀번호 변경</ModalH1>
        <ModalMargin>
          <FlexDiv>
            <ModalStyledInput
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
          </FlexDiv>
          <ModalErrorDivWrap>
            {errors.password?.type === "pattern" && (
              <ModalErrorDiv>
                비밀번호는 영문+숫자+특수문자 조합으로 8자리 이상 입력해주세요
              </ModalErrorDiv>
            )}
          </ModalErrorDivWrap>
        </ModalMargin>
        <ModalMargin>
          <FlexDiv>
            <ModalStyledInput
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
          </FlexDiv>
          <ModalErrorDivWrap>
            {errors.passwordConfirm?.type === "pattern" && (
              <ModalErrorDiv>비밀번호 확인을 위해 입력해주세요</ModalErrorDiv>
            )}
            {errors.passwordConfirm && (
              <ModalErrorDiv>{errors.passwordConfirm.message}</ModalErrorDiv>
            )}
          </ModalErrorDivWrap>
        </ModalMargin>
        <ModalMargin>
          <ModalButton
            type="submit"
            disabled={!isValid}
            onClick={changePawword}
          >
            변경 완료
          </ModalButton>
        </ModalMargin>
      </MyPageModal>
    </MyModal>
  );
}

export default ModalPw;
