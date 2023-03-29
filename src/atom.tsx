import { atom, selector} from "recoil";
import {recoilPersist} from "recoil-persist"
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
export interface ITag {
  text: string;
  id: number;
}
export const tagState = atom<ITag[]>({
  key: "tag",
  default: [],
});

//편지 내용 임시 저장(실제로는 안쓸거임!!)
export const letterState = atom({
  key: "letter",
  default: "",
});

//pickedDate
export const pickedDate = atom<Date>({
  key: "mydate",
  default: new Date(),
});

//로그인토큰과 userIdx 관련
export interface IUserInfo {
  logintoken: string;
  userIdx: number;
};
const {persistAtom} = recoilPersist({ //atom을 자동으로 로컬에 저장, 삭제해준다.
  key:"userInfoLocal", //로컬스토리지에 저장되는 키값
  storage: localStorage,
})
export const userInfoState = atom<IUserInfo>({
  key:"userInfo",
  default: {logintoken: "", userIdx: NaN },
  effects_UNSTABLE: [persistAtom],
})
