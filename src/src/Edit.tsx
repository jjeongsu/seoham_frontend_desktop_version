import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #228be6;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 4px;
`;

const Edit = () => {
  return (
    <div style={{ marginLeft: "4px" }}>
      아니 중첩은 되었는데 위치가 왜 이러냐..
      <div></div>
      <StyledButton>중첩 라우팅 성공!</StyledButton>
    </div>
  );
};

export default Edit;
