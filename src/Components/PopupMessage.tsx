import Modal from "react-modal";
import { useRecoilState } from "recoil";
import { popUpModal } from "../atom";
import ReactModal from "react-modal";
import { ModalButton, ResponseMessage } from "styles/Modal";
import { useNavigate } from "react-router-dom";

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "360px",
    height: "180px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
};

type Props = {
  message?: string;
};

function PopupMessage({ message }: Props) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useRecoilState(popUpModal);
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customModalStyles}
      ariaHideApp={false}
      contentLabel="Pop up Message"
      shouldCloseOnOverlayClick={false}
    >
      <img
        src="/img/love-letter.png"
        alt="배너"
        style={{
          width: "50px",
          height: "40px",
          marginLeft: "40%",
        }}
      />
      <ResponseMessage>{message}</ResponseMessage>
      <ModalButton
        onClick={() => {
          if (
            message === "가입이 완료되었습니다" ||
            message === "비밀번호가 변경되었습니다. 로그인을 진행해주세요" ||
            message === "로그아웃 되었습니다." ||
            message === "탈퇴가 완료되었습니다."
          ) {
            setModalOpen(false);
            navigate("/");
          } else {
            setModalOpen(false);
          }
        }}
      >
        닫기
      </ModalButton>
    </Modal>
  );
}
export default PopupMessage;
