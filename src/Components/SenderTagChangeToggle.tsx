import styled from "styled-components";
interface IToggleState {
  sortBy: boolean;
  setSortBy: React.Dispatch<React.SetStateAction<boolean>>;
}

function SenderTagChangeToggle({ sortBy, setSortBy }: IToggleState) {
  const handleTagToggleClick = () => {
    setSortBy(false); //태그 선택시 0값이 들어감
  };
  const handleSenderToggleClick = () => {
    setSortBy(true); // 보낸이별 선택시 1값이 들어감
  };
  return (
    <div style={{display: "flex", justifyContent:"center", margin : "20px 0px"}}>
      <ToggleContainer>
        <ToggleBackElement />
        <ToggleElement
          onClick={handleTagToggleClick}
          isChosen={!sortBy}
          isTag={true}
        >
          태그별
        </ToggleElement>
        <ToggleElement
          onClick={handleSenderToggleClick}
          isChosen={sortBy}
          isTag={false}
        >
          보낸이별
        </ToggleElement>
        <ToggleCircle isChosen={!sortBy} isTag={false}></ToggleCircle>
      </ToggleContainer>
    </div>
  );
}
export default SenderTagChangeToggle;

interface IToggleElem {
  isChosen: boolean;
  isTag: boolean;
}
const ToggleContainer = styled.div`
  cursor: pointer;
  position: relative;
`;
const ToggleBackElement = styled.div`
  background-color: rgb(219, 219, 221);
  border-radius: 30px;
  width: 155px;
  height: 33px;
`;
const ToggleElement = styled.div<IToggleElem>`
  background-color: transparent;
  color: ${(props) => (props.isChosen ? "white" : " rgb(168, 168, 168)")};
  position: absolute;
  top: 7px;
  left: ${(props) => (props.isTag ? "17px" : "85px")};
  width: 70px;
  height: 30px;
  z-index: 2;
  font-weight: 700;
`;
const ToggleCircle = styled.div<IToggleElem>`
  background-color: ${(props) => (props.isChosen ? "#FF9494" : "#c0cf7e")};
  position: absolute;
  width: 80px;
  width: ${(props) => (props.isChosen ? "75px" : "80px")};
  height: 29px;
  border-radius: 30px;
  top: 2px;
  left: 1px;
  z-index: 1;
  transition: 0.5s;
  left: ${(props) => (props.isChosen ? "2px" : "73px")};
`;
