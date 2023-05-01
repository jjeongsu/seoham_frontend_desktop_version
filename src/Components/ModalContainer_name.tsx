import { useRecoilState } from "recoil";
import { mypageModal } from "../atom";
import { CreateStyledInputButton } from "../Components/loginStyled";
import Modalname from "../Components/Modal_name";
import { FlexDiv, MypageInput } from "../styles/MypageStyled";

interface nickNameProps {
  nickName?: string;
}

function ModalContainername({ nickName }: nickNameProps) {
  const [modalOpenName, setmodalOpenName] = useRecoilState(mypageModal);
  const modalNameClick = () => {
    setmodalOpenName(!modalOpenName);
  };
  const modalNameClose = () => {
    setmodalOpenName(!modalOpenName);
  };
  return (
    <FlexDiv>
      <MypageInput name="nickname" disabled />
      <div style={{ width: "100%", marginLeft: "20px" }}>
        <CreateStyledInputButton onClick={modalNameClick}>
          변경
        </CreateStyledInputButton>
        {modalOpenName && (
          <Modalname modalClose={modalNameClose} nickName={nickName} />
        )}
      </div>
    </FlexDiv>
  );
}

export default ModalContainername;
