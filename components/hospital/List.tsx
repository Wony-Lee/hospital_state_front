import React, {useCallback, useEffect, useState} from 'react';
import {useAppSelector} from "../../store";
import axios from "axios";

interface Item {
    id:string;
    address:string;
    category:string;
    hospitalName:string;
    phoneNumber:number;
    userId:string;
    imgUrl?:string;
}

const List = () => {
    const {userInfo, isLogin} = useAppSelector(state => state.user)
    const [res, setRes] = useState<[]>([])
    const [uploadImg, setUploadImg] = useState<string[]>([])
    const testApiCall = useCallback(async ()=>{
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts`)
            .then(data => data.json())
            .then(posts => setRes(posts))
            .catch((e) => console.error(e, 'error'))
    },[res])

    const handleCheckParam = useCallback(async (param:string)  => {
        console.log(param)
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${param}`)
            .then(data => data.json())
            .then(post => console.log('post ==>',post))
            .catch((e) => console.log(e, 'error'))
    }, [])

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData()

        // uploadImg.forEach((p) => {
        //     formData.append('image',p)
        // })
        //
    },[uploadImg])

    const handleImgUpdate = useCallback(async (e: React.ChangeEvent<HTMLInputElement>, hospitalName: string) =>{
        const token = sessionStorage.getItem('token')
        const images = e.target.files![0];
        const formData = new FormData();
        if(!images) return
        // formData.append('image', images as any)
        [].forEach.call(e.target.files, (f) => {
            console.log('f', f)
            formData.append('image', f)
            setUploadImg(prev => prev.concat(f))
        })
        formData.append('hospitalName',hospitalName)
        for (let key of formData.keys()) {
            console.log("handleSubmit Key Form Data Check", key);
        }
        for (let value of formData.values()) {
            console.log("handleSubmit Key Form Data value", value);
        }
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/upload`,
                formData,
            {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true,
                })
    } ,[])
    console.log('uploadImags',uploadImg)

    useEffect(()=>{
        console.log(`==> process ${process.env.NEXT_PUBLIC_SERVER_URL}`)
        testApiCall()
    },[])
    console.log(res)


    return (
        <div>
            {
                res.map((item:Item) =>
                    <form key={item.id} onSubmit={handleSubmit} encType="multipart/form-data">
                        <button onClick={() => handleCheckParam(item.hospitalName) }>
                        {item.hospitalName}{" "}
                        </button>{" "}
                        <input type={"file"}
                               onChange={(e)=>handleImgUpdate(e, item.hospitalName)}
                               multiple
                               accept="image/jpeg, image/jpg, image/png"
                        />
                        {item.category}{" "}
                        {item.userId}{" "}
                        {item.phoneNumber}{" "}
                        {item.address}
                        <img src={item.imgUrl} alt={"병원사진"}/>
                        {item.imgUrl}
                        <button type={"submit"}>확인</button>
                    </form>
                )
            }
        </div>
    );
};

export default List;
