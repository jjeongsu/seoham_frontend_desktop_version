import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ILetter } from "./Components/ViewLetterList";
//테마
export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const isLogAtom = atom({
  key: "isLog",
  default: false,
});

//tagMaker
export interface INewTag {
  text: string;
  id: number;
}
export const tagState = atom<INewTag[]>({
  key: "tag",
  default: [],
});

//pickedDate
export const pickedDate = atom<Date>({
  key: "mydate",
  default: new Date(),
});

export interface ITag {
  tagName: string;
  tagIdx: number;
  tagColor: string;
}
//태그리스트에서 현재 선택한 편지
export const currentTagState = atom<ITag>({
  key: "currentTag",
  default: { tagName: " ", tagIdx: -1, tagColor: "" },
});

//현재 보여주는 편지목록에 담긴 편지들
export const currentLettersState = atom<ILetter[]>({
  key: "currentLetters",
  default: [],
});

//마이페이지 관련(닉네임과 비밀번호 변경 모달버튼)
export const mypageModal = atom({
  key: "mypageModal",
  default: false,
});

export const mypagePwModal = atom({
  key: "mypagePwModal",
  default: false,
});

//alert대신 custom modal창 관련 state
export const popUpModal = atom({
  key: "popUpModal",
  default: false,
});

export const popUpMessage = atom({
  key: "popUpModal",
  default: "",
});

//이중 모달 관련
export const modalInModal = atom({
  key: "modalInModal",
  default: false,
});

export const modalInModalMessage = atom({
  key: "modalInModal",
  default: "",
});

export interface IUserInfo {
  logintoken: string;
  userIdx: number;
}
const { persistAtom } = recoilPersist({
  //atom을 자동으로 로컬에 저장, 삭제해준다.
  key: "userInfoLocal", //로컬스토리지에 저장되는 키값
  storage: localStorage,
});
export const userInfoState = atom<IUserInfo>({
  key: "userInfo",
  default: { logintoken: "", userIdx: NaN },
  effects_UNSTABLE: [persistAtom],
});

//mypage 유저 정보가져오기
export interface UserInfo {
  name: string;
  email: string;
  letterNum: number;
}
export const Infostate = atom<UserInfo>({
  key: "UserInfo",
  default: {
    name: "",
    email: "",
    letterNum: 0,
  },
});

//sender
export interface ISender {
  sender: string;
  count: number;
}

export const currentSenderState = atom<ISender>({
  key: "currentSender",
  default: { sender: " ", count: 0 },
});

//toggle
export const sortByState = atom({
  key: "sort",
  default: false, //태그 "false", 보낸이 "true"
});

//편지 내용 임시 저장(실제로는 안쓸거임!!)
export const letterState = atom({
  key: "letter",
  default: "",
});

//현재 출력중인 편지 정보
export interface LetterInfo {
  postIdx: number;
  sender: string;
  date: number;
  tagIdx: number[];
  tagName: string[];
  tagColor: string[];
  letterIdx: number;
  image: string | null;
  content: string | null;
  paper: number | undefined;
}
export const currentViewLetter = atom({
  key: "currentViewLetter",
  default: {
    postIdx: -1,
    sender: "",
    date: 0,
    tagIdx: [],
    tagName: [],
    tagColor: [],
    letterIdx: -1,
    image: null,
    content: null,
    paper: 0,
  },
});
