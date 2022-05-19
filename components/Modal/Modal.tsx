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
  height:400px;
  margin:0 auto;
  padding:5px;
  
  
  box-sizing: border-box;
  
  border-radius: 8px;
  background-color:white;
  
  p {
    text-align: right;
    cursor: pointer;
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
                <p onClick={handleModalSwitch}>닫기</p>
                <div>{head}</div>
                <div>{message}</div>
            </Content>
        </Layout>)
}

export default Modal
