import {atom} from "recoil";

//테마
export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const isLogAtom = atom({
  key: "isLog",
  default: false,
})

//tagMaker
export interface ITag {
  text: string,
  id: number,
}
export const tagState = atom<ITag []>({
  key: "tag",
  default: [],
})