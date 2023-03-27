import { atom } from "recoil";

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
