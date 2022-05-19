import React, {useCallback} from 'react';
import styled from '@emotion/styled'
import {useAppDispatch, useAppSelector} from "../../store";
import {setModalOnOffSwitch} from "../../reduces/modalSlice";

const Layout = styled.div<{modalSwitch: boolean}>`
  display:${({modalSwitch}) => modalSwitch ? "flex" : "none"};
  align-items: center;
  top:0;
  width:100%;
  height:100vh;
  background-color:rgba(0,0,0,0.5);
  position:absolute;
`;

const Content = styled.div`
  width:400px;
  height:250px;
  margin:0 auto;
  
  
  box-sizing: border-box;
  
  border-radius: 8px;
  background-color:white;
  
  .head {
    height: 45px;
    margin-bottom:20px;
    padding:5px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background-color:forestgreen;
  }
  
  .head-text {
    width:100%;
    color:white;
    text-align: center;
    font-weight: bold;
  }
  
  .close {
    color:white;
    text-align: right;
    cursor: pointer;
  }
  
  .message {
    display:flex;
    align-items: center;
    justify-content: center;
    height:120px;
    p {
      font-weight: bold;
      font-size:20px;
      color:red;
    }
  }
`;

interface Props {
    head?:string;
    message?:string
}

const Modal = ({head, message}:Props) => {
    const dispatch = useAppDispatch()
    const modalSwitch = useAppSelector(state => state.modal.modalSwitch)
    const handleModalSwitch = useCallback(()=>{
        dispatch(setModalOnOffSwitch(false))
    },[])

    return (
        <Layout modalSwitch={modalSwitch}>
            <Content>

                <div className={"head"}>
                    <p className={"close"} onClick={handleModalSwitch}>닫기</p>
                    <p className={"head-text"}>{head}</p>
                </div>
                <div className={"message"}>
                    <p>{message}</p>
                </div>
            </Content>
        </Layout>)
}

export default Modal
