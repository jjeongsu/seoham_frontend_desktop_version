import React from "react";
// import back from "../../public/img/Vector 4.png";
import { useNavigate } from "react-router-dom";

type Props = {
  from?: string;
};

function BackButton({ from }: Props) {
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (from === "mypage") {
      navigate(-1);
    } else {
      navigate("/login");
    }
  };
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "transparent",
        borderColor: "transparent",
        margin: "16px 0px 16px 0px",
        position: "absolute",
        left: "0%",
      }}
    >
      <img
        src="/img/Vector 3.png"
        alt="back"
        style={{
          width: "16px",
          color: "black",
          border: "2px solid",
          borderColor: "transparent",
        }}
      />
    </button>
  );
}

export default BackButton;
