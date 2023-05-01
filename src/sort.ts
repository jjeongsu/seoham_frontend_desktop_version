import { ILetter } from "./Components/ViewLetterList";

export function sortByNew(arr: ILetter[]) {
  //최신순으로 정렬
  return mergeSortByNew(arr);
}
export function sortByOld(arr: ILetter[]) {
  //오래된순으로 정렬
  return mergeSortByOld(arr);
}

//반으로 나눠주는 함수
function mergeSortByOld(arr: any): any[] {
  if (arr.length === 1) return arr;
  const boundary = Math.ceil(arr.length / 2);
  const left = arr.slice(0, boundary);
  const right = arr.slice(boundary);
  return mergeOld(mergeSortByOld(left), mergeSortByOld(right));
}
//반으로 나누어준 함수를 갖고 정렬해 새로운 배열로 만들어주는 함수
function mergeOld(left: any, right: any) {
  const sortedArr = [];
  while (left.length && right.length) {
    if (left[0].date <= right[0].date) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }
  return [...sortedArr, ...left, ...right];
}

function mergeSortByNew(arr: any): any[] {
  if (arr.length === 1) return arr;
  const boundary = Math.ceil(arr.length / 2);
  const left = arr.slice(0, boundary);
  const right = arr.slice(boundary);
  return mergeNew(mergeSortByNew(left), mergeSortByNew(right));
}
function mergeNew(left: any, right: any) {
  const sortedArr = [];
  while (left.length && right.length) {
    if (left[0].date > right[0].date) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }
  return [...sortedArr, ...left, ...right];
}
