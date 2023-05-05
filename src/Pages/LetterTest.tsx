import styled, { keyframes } from "styled-components";
import ViewLetterList from "../Components/ViewLetterList";
import ViewTag from "../Components/ViewTag";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilSnapshot, useRecoilState, useRecoilValue } from "recoil";
import { currentSenderState, userInfoState } from "../atom"; // react-quill에서 넘어오는 버전으로 수정해서 다시 만들기
import axios from "axios";
import ViewLetter from "../Components/ViewLetter";

const DividedPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  width: 100%;
`;
const move = keyframes`
    from{
        width: 100%;
    }
    to{
        width: 50%;
    }
`;
const MenuBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  animation: ${move} 0.3s linear;
`;
const Opacity = keyframes`
    from{
        opacity: 0;
        width: 0%;
        visibility: hidden;
    }
    to{
        opacity: 1;
        width: 50%;
        visibility: visible;
    }
`;
const LetterPage = styled.div`
  // text-align: center;
  width: 50%;
  visibility: hidden;
  img {
    height: 80vh;
  }
  animation-duration: 2s;
  animation-name: ${Opacity};
  animation-fill-mode: forwards;
`;
const BackBtn = styled.button`
  display: block;
  background-color: transparent;
  // margin-left: 32px;
  // margin-top: 15px;
  border: 0;
  img {
    width: 16px;
    height: 16px;
    &:hover {
      border-radius: 9999px;
      background-color: gray;
    }
  }
`;
const DeleteBtn = styled.button`
  background: transparent;
  border: 0;
  border-radius: 8px;
  &:hover{
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
`

function LetterTest() {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const [currentSender, setCurrentSender] = useRecoilState(currentSenderState);
  // // 현재 선택된 태그 정보 불러오려면
  // const [currentTag, setCurrentTag] = useRecoilState(currentTagState);
  // //const [tag, setTag] = useState([location.state.tagName, location.state.tagId, location.state.tagColor])
  // const [Letter, setLetter] = useRecoilState(letterState);
  // const [plus, setPlus] = useState(false);
  console.log("letter Id:", location.state.letterId);
  console.log("letterId 타입: ", typeof Number(location.state.letterId));

  const onClickBack = () => {
    navigate("/home");
  };
  const BASE_URL = "http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080";
  const onClickDelete = () => {
    axios({
      method: 'delete',
      url: `${BASE_URL}/posts/delete/${location.state.letterId}`,
      headers: {
        "X-ACCESS-TOKEN": userInfo.logintoken,
      }
    }).then(function(response){
      console.log(response);
      window.alert("편지가 삭제되었습니다.");
      setCurrentSender({sender: " ", count: 0}) 
        //보낸이의 편지가 모두 비어서 보낸이 자체가 삭제될 수 있으니 보낸이 정보를 초기화, 태그의 경우 비어있을 경우에도 있을 수 있으니 초기화X
      navigate("/home");
    }).catch(function(error){
      console.log(error);
      window.alert("에러가 발생했습니다.");
    })
  }
  return (
    <div>
      {/* 분할 애니메이션 테스트입니다. */}
      <DividedPage>
        <MenuBar>
          <ViewTag />
          <ViewLetterList />
        </MenuBar>
        <LetterPage>
          <div style={{width:"100%", display:"flex", justifyContent:"space-around", marginTop:"20px", padding:"3px 0px"}}>
            <BackBtn onClick={onClickBack}>
              <img src="/img/left-arrow.png" />
            </BackBtn>
            <span></span>
            <DeleteBtn onClick={onClickDelete}>삭제</DeleteBtn>
          </div>
          <ViewLetter letterId={Number(location.state.letterId)} />
        </LetterPage>
      </DividedPage>
    </div>
  );
}

export default LetterTest;
