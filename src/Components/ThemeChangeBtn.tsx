import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atom";

function ThemeChangeBtn(){
  const setIsDark = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDark((prev) => !prev);
  }
  const icon = isDark ? "../sun.png": "../moon.png";
  return (<>
    <Button onClick = {handleClick}> 
      <BtnImg src = {icon} alt="theme change button"/>
    </Button>
  </>)
}
export default ThemeChangeBtn;

const BtnImg = styled.img`
  width: 30px;
  height: 30px;

`;

const Button = styled.button`
  border: none;
  background-color: transparent; 
`;