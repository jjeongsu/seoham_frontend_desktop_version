import styled from "styled-components";

interface propsType {
    tagName: string;
    tagId: number;
    tagColor: string;
    setTag: Function;
}

function Tag({tagName, tagId, tagColor, setTag}:propsType){
    const onClickTag = (e:any) => {
        const tagName = e.target.name
        console.log(tagName, tagId, tagColor)
        setTag([tagName, tagId, tagColor])
    }
    
    return(
        <TagBtn onClick={onClickTag} name={tagName} color={tagColor}>
            {tagName}
        </TagBtn>
    )
}

const TagBtn = styled.button<{color:string}>`
    background: ${props => props.color || '#C7AC98'};
    border: 0;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    padding: 10px;
    margin: 5px;
    &:active, 
    &:hover{
        box-shadow: 0 0 0 3px #BABABA;
    }

`

export default Tag