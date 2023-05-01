import {
  LetterPaper,
  LetterContent,
  PlusBtn,
  ContentDiv,
} from "../styles/LetterTestCss";
import { Letters_tag1, Letters_tag2, LetterType } from "../dummydata";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { letterState } from "../atom"; // react-quill에서 넘어오는 버전으로 수정해서 다시 만들기

interface propsType {
  letterId: number;
  //setTagId:Funtion; 도 추가하기(api 호출에 필요할듯)
}

function ViewLetter({ letterId }: propsType) {
  console.log(typeof letterId, letterId);
  const [plus, setPlus] = useState(false);
  const [Letter, setLetter] = useRecoilState(letterState);
  useEffect(() => {
    setPlus(false);
  }, [letterId]);
  const onClickPlus = () => {
    setPlus(true);
    console.log("plus");
  };
  console.log(plus);
  let currentLetter: LetterType = {
    id: 0,
    sender: "",
    date: "",
    content: "",
    paper: 0,
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "90vh" }}>
      <LetterPaper paper={currentLetter.paper} />
      <LetterContent paper={Number(currentLetter.paper)}>
        <p className="sender">
          <span>{currentLetter.sender}</span>님에게서 온 편지
        </p>
        {/* content, button 둘 다 styled-component로 수정해서 props 전달받을 수 있게 수정하기 */}
        <ContentDiv
          clickprops={plus}
          dangerouslySetInnerHTML={{ __html: Letter }}
        ></ContentDiv>
        <PlusBtn clickprops={plus} onClick={onClickPlus}>
          더보기
        </PlusBtn>
        <p className="date">{currentLetter.date}</p>
      </LetterContent>
    </div>
  );
}

export default ViewLetter;
