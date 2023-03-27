import styled from "styled-components";
import Tag from "../Components/Tag";
import ViewTag from "../Components/ViewTag";
import ViewLetterList from "../Components/ViewLetterList";
import { useEffect, useState } from "react";
import { MainGrid } from "../styles/MaintestCss";
import { TagList } from "../dummydata";

function MainTest(){
    const [tag, setTag] = useState([])
    useEffect(()=>{
        console.log("tag변함", tag)
    }, [tag])
    return(
        <MainGrid>
            <ViewTag setTag={setTag}/>
            <ViewLetterList tagName={tag[0]} tagId={tag[1]} tagColor={tag[2]}/>
        </MainGrid>
    )
}

export default MainTest;