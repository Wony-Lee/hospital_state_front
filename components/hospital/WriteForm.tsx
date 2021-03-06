import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router'
import styled from '@emotion/styled'
import {useAppSelector} from "../../store";
import useInputs from "../../hooks/useInputs";
import axios from "axios";
import Modal from "../Modal/Modal";
import {setModalOnOffSwitch} from "../../reduces/modalSlice";

const Form = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
  border:1px solid red;
`;

const WriteForm = () => {
    const modalSwitch = useAppSelector(state => state.modal.modalSwitch)
    const router = useRouter()
    const [images, setImages] = useState('')
    const {userInfo, isLogin} = useAppSelector(state => state.user)
    const [postsInput, handlePosts, setPostsInput] = useInputs('')
    const { hospitalName, address, phoneNumber, category, imgUrl } = postsInput
    const handleImgUpdate = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
        const image = e.target.files![0];
        if(!image) return;
        setImages(image as any)
        console.log(images)
    },[images])
    const handleSubmit = useCallback(async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData
        formData.append('hospitalName', hospitalName)
        formData.append('category', category)
        formData.append('address', address)
        formData.append('phoneNumber', phoneNumber)
        formData.append('image', images)
        const post = {
            hospitalName,
            address,
            phoneNumber,
            category,
            images,
            userId:userInfo.id
        }
        for (let key of formData.keys()) {
            console.log("handleSubmit Key Form Data key", key);
        }
        for (let value of formData.values()) {
            console.log("handleSubmit Key Form Data value", value);
        }
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts`, post,
            {
                withCredentials: true,
            }
        ).then(res => console.log('what?', res))
        // await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/upload`,formData)
    },[postsInput, images, category])

    useEffect(()=>{
        if(!isLogin) {
            router.push('/')
        }
    },[])

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <label>id : {userInfo.id}</label>
                <input type={"text"} readOnly={true} value={userInfo.id} name={"userId"}/>

                <label>????????????</label>
                <input type={"text"} value={hospitalName || ""} name={"hospitalName"} onChange={handlePosts}/>

                <label>????????????</label>
                <input type={"text"} value={address || ""} name={"address"} onChange={handlePosts}/>

                <label>????????????</label>
                <input type={"text"} value={category || ""} name={"category"} onChange={handlePosts}/>
                <label>?????? ?????????</label>
                <input type={"text"} value={phoneNumber || ""} name={"phoneNumber"} onChange={handlePosts}/>
                <input type={"file"}
                       onChange={handleImgUpdate}
                       multiple
                       accept="image/jpeg, image/jpg, image/png"
                />
                <button type={"submit"}>??????</button>
            </Form>
        </>
    )
}

export default WriteForm
