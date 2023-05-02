import { useState, useEffect } from "react";
import {
  ViewTagGrid,
  SettingWrap,
  MyBtn,
  TagSenderWrap,
} from "../styles/MaintestCss";
import Tag from "./Tag";
import { useNavigate } from "react-router-dom";
import ThemeChangeToggle from "./ThemeChangeToggle";
// import { FetchSenderList, FetchTagList } from "../api";
import { ITag, userInfoState, sortByState } from "../atom";
//import { useQuery } from "@tanstack/react-query";
import SenderTagChangeToggle from "./SenderTagChangeToggle";
import Sender from "./Sender";
import { useQuery } from "react-query";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";

interface propsType {
  setTag: Function;
  //setTagId:Funtion; 도 추가하기(api 호출에 필요할듯)
}
export interface ISender {
  sender: string;
  count: number;
}
const BASE_URL =  `http://ec2-13-209-41-214.ap-northeast-2.compute.amazonaws.com:8080`;
function ViewTag() {
  const navigate = useNavigate();
  const onClickMypage = () => {
    console.log("mypage");
    navigate('/mypage');
  };
  const onClickSetting = () => {
    console.log("setting");
  };
  const onClick = () => {
    navigate("/");
  };
  //태그리스트불러오기
  const { isLoading: taglistLoading, data: tagData } = useQuery(
    ["allTags"],
    () => FetchTagList()
  );
  const [tagList, setTagList] = useState<ITag[]>([]);
  useEffect(() =>{
    const TAGLIST: ITag[] = [];
    tagData?.data.result.map((item: ITag) => TAGLIST.push(item));

    console.log(TAGLIST);
    setTagList(TAGLIST);
  }, [tagData])

  //보낸이 목록 불러오기
  const { isLoading: senderlistLoading, data: senderData } = useQuery(["allSenders"], FetchSenderList);
  const [senderList, setSenderList] = useState<ISender[]>([]);
  useEffect(() =>{
    const SENDERLIST: ISender[] = [];
    senderData?.data.result.map((item: ISender) => SENDERLIST.push(item));

    console.log("SENDERLIST: ", senderData);
    setSenderList(SENDERLIST);
  }, [senderData])

  // const [sortBy, setSortBy] = useState<boolean>(false); 편지 페이지에서 다시 돌아왔을 때 보던 페이지 그대로 넘어오려고 recoil로 수정
  const [atomsortBy, setAtomSortBy] = useRecoilState(sortByState); //태그로 정렬: 0, 보낸이로 정렬: 1

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  function FetchTagList() {
    return axios({
      method: 'get',
      url: `${BASE_URL}/posts/tags`,
      headers: {
        "X-ACCESS-TOKEN": userInfo.logintoken,
      }
    })
  }
  function FetchSenderList() {
    return axios({
      method: 'get',
      url: `${BASE_URL}/posts/senders`,
      headers: {
        "X-ACCESS-TOKEN": userInfo.logintoken,
      }
    })
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
      <SenderTagChangeToggle sortBy={atomsortBy} setSortBy={setAtomSortBy} />
      <TagSenderWrap>
        {!atomsortBy
          ? //그러면 tagLoading
            taglistLoading
            ? "isloading the tags"
            : tagList?.map((tag: ITag) => (
                <Tag
                  key={tag.tagIdx}
                  tagName={tag.tagName}
                  tagIdx={tag.tagIdx}
                  tagColor={tag.tagColor}
                />
              ))
          : //그러면 senderLading
          senderlistLoading
          ? "isLoading the senders"
          : senderList?.map((sender: ISender, index) => (
              <Sender
                key={index}
                sender={sender.sender}
                count={sender.count}
              />
            ))
        }
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
