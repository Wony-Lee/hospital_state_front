import React, {FormEvent, useCallback, useState} from 'react';
import styled from '@emotion/styled'
import {useAppSelector} from "../../store";
import useInputs from "../../hooks/useInputs";
import axios from "axios";

const Form = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
  border:1px solid red;
`;

const WriteForm = () => {
    const [images, setImages] = useState('')
    const {userInfo} = useAppSelector(state => state.user)
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

    return (
        <Form onSubmit={handleSubmit}>
            <label>id : {userInfo.id}</label>
            <input type={"text"} readOnly={true} value={userInfo.id} name={"userId"}/>

            <label>병원이름</label>
            <input type={"text"} value={hospitalName || ""} name={"hospitalName"} onChange={handlePosts}/>

            <label>병원주소</label>
            <input type={"text"} value={address || ""} name={"address"} onChange={handlePosts}/>

            <label>진료과목</label>
            <input type={"text"} value={category || ""} name={"category"} onChange={handlePosts}/>
            <label>병원 연락처</label>
            <input type={"text"} value={phoneNumber || ""} name={"phoneNumber"} onChange={handlePosts}/>
            <input type={"file"}
                   onChange={handleImgUpdate}
                   multiple
                   accept="image/jpeg, image/jpg, image/png"
            />
            <button type={"submit"}>확인</button>
        </Form>
    )
}

export default WriteForm
