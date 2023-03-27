import React from "react";
// import back from "../../public/img/Vector 4.png";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/");
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
          width: "10px",
          color: "black",
          border: "2px solid",
          borderColor: "transparent",
        }}
      />
    </button>
  );
}

export default BackButton;
