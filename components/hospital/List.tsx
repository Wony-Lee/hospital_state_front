import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {IPosts} from "../../interface/posts";



const List = ({posts}:IPosts) => {
    console.log('????',posts)
    const [uploadImg, setUploadImg] = useState<string[]>([])

    const handleCheckParam = useCallback( (param:string)  => {
        console.log(param)
         fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${param}`)
            .then(data => data.json())
            .then(post => console.log('post ==>',post))
            .catch((e) => console.log(e, 'error'))
    }, [])

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    },[uploadImg])

    const handleImgUpdate = useCallback( async(e: React.ChangeEvent<HTMLInputElement>, hospitalName: string) =>{
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

    return (
        <div>
            {
                posts.map((item) =>
                    <form key={item.id} onSubmit={handleSubmit} encType="multipart/form-data">
                        {/*<button onClick={() => handleCheckParam(item.hospitalName) }>*/}
                        {item.hospitalName}{" "}
                        {/*</button>{" "}*/}
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
