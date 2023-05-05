import styled from "styled-components";

export const MyModal = styled.div`
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

export const ModalH1 = styled.h1`
  left: calc(50% - 110px / 2 - 51px);
  top: calc(50% - 25px / 2 - 77.5px);
  width: 110px;
  height: 25px;
  font-weight: 600;
  align-items: center;
  margin: 50px 20px 40px 36%;
`;

export const MyPageModal = styled.div`
  width: 360px;
  height: 330px;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
`;

//사용하기 버튼들
export const ModalButton = styled.button`
  width: 110px;
  height: 35px;
  border-radius: 30px;
  color: white;
  background-color: #ef9f9f;
  border: transparent;
  font-size: 15px;
  font-weight: 600;
  margin: 10px 0px 0px 30%;
`;

export const ModalMargin = styled.div`
  margin: 30px 0px 30px 30px;
`;

export const ModalErrorDiv = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  align-items: center;
  color: #989898;
  display: flex;
  justify-content: start;
`;

export const ModalErrorDivWrap = styled.div`
  margin: 10px 0px 10px 20px;
`;

export const ModalStyledInputButton = styled.button`
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
  margin-left: 15px;
  color: #ef9f9f;
`;

export const ModalStyledInput = styled.input`
  width: 180px;
  height: 25px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  background-color: transparent;
  border: 0.5px solid;
  margin-left: 20px;
  border-color: transparent transparent #989898 transparent;
`;

//이건 팝업창 전용
export const ResponseMessage = styled.div`
  text-align: center;
  color: black;
  background-color: transparent;
  justify-content: center;
  margin: 10px 0px 10px 0px;
`;

//이중 모달 관련
export const ModalinPopup = styled.div`
  width: 360px;
  height: 180px;
  z-index: 150;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  background-color: white;
  justify-content: center;
  overflow: auto;

  img {
    width: 50px;
    height: 50px;
    justify-content: center;
    margin: 10px 0px 10px 0px;
  }
`;

export const ModalinButton = styled.button`
  width: 110px;
  height: 35px;
  border-radius: 30px;
  color: white;
  background-color: #ef9f9f;
  border: transparent;
  font-size: 15px;
  font-weight: 600;
  justify-content: center;
  margin: 10px 0px 0px 10px;
`;
