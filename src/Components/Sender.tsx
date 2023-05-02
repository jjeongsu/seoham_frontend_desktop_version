import { ISender } from "./ViewTag";
import styled from 'styled-components'
import { ReactComponent as Icon } from '../assets/letterIcon.svg';
import { isDarkAtom, currentSenderState } from "../atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

function Sender({sender, count}: ISender){
  const isDark = useRecoilValue(isDarkAtom);
  const setCurrentSender = useSetRecoilState(currentSenderState);
  const onClickSender = (e:any) => {
      const senderName = e.target.name;
      setCurrentSender({
          sender: sender,
          count: count,
      })
  }
  const profileArr = [
      '/img/Profile_Main.png',
      '/img/Profile.png',
      '/img/Profile1.png',
      '/img/Profile2.png',
      '/img/Profile3.png',
      '/img/Profile4.png'
  ]
  console.log(profileArr[Math.floor(Math.random()*6)])
  return(
      <SenderBtn onClick={onClickSender} name={sender} color={isDark ? '#57606f' : 'whitesmoke'}>
          <div>
              <img src={profileArr[Math.floor(Math.random()*6)]}/>
              <div className='content'>
                  <p><span>{sender}</span>님으로부터 온 편지</p>
                  <span><Icon/> {count}</span>
              </div>
          </div>
      </SenderBtn>
  )
}

const SenderBtn = styled.button`
    background: ${props => props.color};
    border: 0;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    padding: 10px;
    margin: 5px;
    &:active, 
    &:hover{
        box-shadow: 0 0 0 3px #BABABA;
    }
    div{
        display: flex;
        flex-direction: row;
    }
    .content{
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    img{
        margin: 0px 20px;
        width: 20%;
        max-width: 70px;
        height: 20%;
        max-height: 70px;
        align-self: center;
    }
    p{
        background: transparent;
        padding: 10px 0px;
        span{
            font-weight: bold;
            font-size: medium;
        }
    }
`

export default Sender;