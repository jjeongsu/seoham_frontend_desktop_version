import { useRecoilValue } from "recoil";
import { userInfoState } from "./atom";

const BASE_URL = `https://seohamserver.shop`;

export function fetchTagList(){
  const userInfo = useRecoilValue(userInfoState);
  return fetch(`${BASE_URL}/posts/tags?userIdx=${userInfo.userIdx}`).then(res => res.json); //일단 간단하게 적고 이후 수정
}
