import { useState } from "react";
import {
  ViewTagGrid,
  SettingWrap,
  MyBtn,
  TagSenderWrap,
} from "../styles/MaintestCss";
import Tag from "./Tag";
import { useNavigate } from "react-router-dom";
import ThemeChangeToggle from "./ThemeChangeToggle";
import { FetchSenderList, FetchTagList } from "../api";
import { ITag, userInfoState } from "../atom";
//import { useQuery } from "@tanstack/react-query";
import SenderTagChangeToggle from "./SenderTagChangeToggle";
import Sender from "./Sender";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
interface propsType {
  setTag: Function;
  //setTagId:Funtion; 도 추가하기(api 호출에 필요할듯)
}
export interface ISender {
  senderName: string;
  senderCount: number;
}
const BASE_URL = `https://seohamserver.shop`;
function ViewTag() {
  const onClickMypage = () => {
    console.log("mypage");
  };
  const onClickSetting = () => {
    console.log("setting");
  };
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  //태그리스트불러오기
  const { isLoading: taglistLoading, data: tagData } = useQuery<ITag[]>(
    ["allTags"],
    FetchTagList
  );
  //보낸이 목록 불러오기
  const { isLoading: senderlistLoading, data: senderData } = useQuery<
    ISender[]
  >(["allSenders"], FetchSenderList);
  const [sortBy, setSortBy] = useState<boolean>(false); //태그로 정렬: 0, 보낸이로 정렬: 1
  
  function FetchTagList() {
    const userInfo = useRecoilValue(userInfoState);
    const TAGLIST: ITag[] = [];
    fetch(`${BASE_URL}/posts/tags?userIdx=${userInfo.userIdx}`, {
      method: "GET",
      headers: {
        "X-ACCESS-TOKEN": userInfo.logintoken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        res.result.map((item: ITag) => TAGLIST.push(item));
      });
    return [...TAGLIST]; //꼭 스프레드 연산자를 써야하나,,?
  }
  function FetchSenderList() {
    const userInfo = useRecoilValue(userInfoState);
    const SENDERLIST: ISender[] = [];
    fetch(`${BASE_URL}/post/senders`, {
      method: "GET",
      headers: {
        "X-ACCESS-TOKEN": userInfo.logintoken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        res.result.map((item: ISender) => SENDERLIST.push(item));
      });
    return [...SENDERLIST];
  }
  return (
    <ViewTagGrid>
      {/* 게시판 페이지로 돌아가기 */}
      <button
        onClick={onClick}
        style={{
          background: "transparent",
          border: "none",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        <img
          src="/img/left-arrow.png"
          style={{ width: "12px", height: "12px" }}
        />
      </button>
      {/* 태그 선택 파트 */}
      <h1
        style={{ textAlign: "center", fontSize: "x-large", fontWeight: "bold" }}
      >
        서함
      </h1>
      <SenderTagChangeToggle sortBy={sortBy} setSortBy={setSortBy} />
      <TagSenderWrap>
        {!sortBy
          ? //그러면 tagLoading
            taglistLoading
            ? "isloading the tags"
            : tagData?.map((tag: ITag) => (
                <Tag
                  tagName={tag.tagName}
                  tagIdx={tag.tagIdx}
                  tagColor={tag.tagColor}
                />
              ))
          : //그러면 senderLading
          senderlistLoading
          ? "isLoading the senders"
          : senderData?.map((sender: ISender) => (
              <Sender
                senderName={sender.senderName}
                senderCount={sender.senderCount}
              />
            ))}
      </TagSenderWrap>
      <SettingWrap>
        <MyBtn onClick={onClickMypage}>
          <div>
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="100"
                cy="100"
                r="99"
                fill="white"
                stroke="#BABABA"
                strokeWidth="2"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M88.9344 110.246C72.1782 110.246 58.3579 122.816 56.3882 139.04C56.1219 141.233 57.9384 143.033 60.1475 143.033H139.852C142.062 143.033 143.878 141.233 143.612 139.04C141.642 122.816 127.822 110.246 111.066 110.246H88.9344Z"
                fill="#FAD4D4"
              />
              <circle
                cx="100"
                cy="77.4591"
                r="22.9508"
                fill="black"
                fillOpacity="0.4"
              />
              <circle cx="100" cy="77.4591" r="22.9508" fill="#FAD4D4" />
            </svg>
          </div>
        </MyBtn>
        <MyBtn onClick={onClickSetting}>
          <div>
            <img
              style={{ width: "20px", height: "20px" }}
              src="/img/settings.png"
            />
          </div>
        </MyBtn>
        <ThemeChangeToggle />
      </SettingWrap>
    </ViewTagGrid>
  );
}

export default ViewTag;
