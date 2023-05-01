import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentTagState, ITag } from "../atom";

function Tag({ tagName, tagIdx, tagColor }: ITag) {
  const setCurrentTag = useSetRecoilState(currentTagState); //현재 선택한 태그 담기
  const onClickTag = (e: any) => {
    const tagName = e.target.name;
    setCurrentTag({
      tagName: tagName,
      tagIdx: tagIdx,
      tagColor: tagColor,
    });
  };

  return (
    <TagBtn onClick={onClickTag} name={tagName} color={tagColor}>
      {tagName}
    </TagBtn>
  );
}

const TagBtn = styled.button<{ color: string }>`
  background: ${(props) => props.color || "#C7AC98"};
  border: 0;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 10px;
  margin: 5px;
  &:active,
  &:hover {
    box-shadow: 0 0 0 3px #bababa;
  }
`;

export default Tag;
