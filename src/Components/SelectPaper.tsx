import styled from "styled-components";
import {useState} from "react";

interface propstype {
    modalRef: React.ForwardedRef<HTMLDivElement>;
    modalClose: Function;
    modalOutSideClick: (e:any) => void;
    setPaper: Function;
}

function SelectPaper({modalRef, modalClose, modalOutSideClick, setPaper}:propstype) {
    const [paper, setPaper_inner] = useState(0);
    const paperList = [
        "/img/autumn.png",
        "/img/birthday.png",
        "/img/christmas.png",
        "/img/congratulation.png",
        "/img/letter1.png",
        "/img/love.png",
        "/img/spring.png",
        "/img/tradition.png",
        "/img/winter.png"
    ];
    const handleClick = (e:any) => {
        setPaper_inner(e.currentTarget.id);
    }
    const onClickApply = () => {
        console.log("확인버튼", paper);
        setPaper(paper);
        modalClose()
    }
    
    return(
        <Layer ref={modalRef} onClick={(e) => modalOutSideClick(e)}>
            <ModalLayer>
                <p style={{margin:"5px", fontSize:"large"}}>편지지 선택하기</p>
                <ImgDiv>
                    {
                        paperList.map((p, index) => (
                            <ImgBtn key={index+1} onClick={handleClick} id={(index+1).toString()}>
                                <img src={p}/>
                            </ImgBtn>
                        )) 
                    }
                </ImgDiv>
                <p style={{margin: "6px"}}>
                    현재 선택한 편지지는 <span style={{fontWeight:"bold"}}>{paper}번</span> 편지지입니다.
                </p>
                <ApplyBtn onClick={onClickApply}>확인</ApplyBtn>
            </ModalLayer>
        </Layer>
    )
}

export default SelectPaper;

const Layer = styled.div`
    z-index: 1500;
    display: block;
    background: rgba(0,0,0,0.3);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`
const ModalLayer = styled.div`
    z-index: 2000;
    width: 65%;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2px 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const ImgDiv = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 5px 0px;

    // 스크롤바 커스텀
    /* 아래의 모든 코드는 영역::코드로 사용 */
    &::-webkit-scrollbar {
        width: 6px;  /* 스크롤바의 너비 */
    }
  
    &::-webkit-scrollbar-thumb {
        height: 30%; /* 스크롤바의 길이 */
        background: #667182; /* 스크롤바의 색상 */
        border-radius: 10px;
    }
  
    &::-webkit-scrollbar-track {
        background: #d8d8d8;  /*스크롤바 뒷 배경 색상*/
    }
    //
`
const ImgBtn = styled.button`
    width: 20%;
    height: 50%;
    background: whitesmoke;
    border: 0;
    margin: 2px;
    &:hover, &:focus {
        background: #ccd6e8;
    }
    img{
        width: 100%;
        height: 100%;
        padding: 2px;
    }
`
const ApplyBtn = styled.button`
    border-radius: 16px;
    border: 0;
    &:hover{
        background: #6c798e;
    }
    margin-bottom: 5px;
    padding: 3px;
`