import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import styled from "@emotion/styled";
import useInputs from "../../hooks/useInputs";
import {useAppDispatch, useAppSelector} from "../../store";
import {setSwitchLogin, setUserInfo} from "../../reduces/userSlice";
import Link from 'next/link'
import axios from "axios";
import {setModalOnOffSwitch} from "../../reduces/modalSlice";
import Modal from "../Modal/Modal";

const Form = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
  max-width:300px;
  input {
    margin:3px;
  }
  button {
    margin:3px;
  }
`;

const Write = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    // const [errorData, setErrorData] = useState<string[]>([])
    const [loginInput,handleLoginInput] = useInputs("")
    const { email, password } = loginInput;
    const handleSubmit = useCallback( (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`,loginInput)
            .then((res) => {
                    const accessToken = res.data
                    dispatch(setUserInfo(res.data.user))
                    dispatch(setSwitchLogin(true))
                    axios.defaults.headers.common["Authorization"] = `${accessToken.token}`;
                    document.cookie = `jwt=${accessToken.token}`;
                    router.push('/')
                }
            ).catch((err) => {
                // setErrorData(err.response.data)
                console.error(err, 'LOGIN FAILURE')
                dispatch(setModalOnOffSwitch(true))
        })
    } ,[loginInput])

    useEffect(() => {
    }, [])
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <label>email : </label>
                <input type={"text"} value={email || ""} name={"email"} onChange={handleLoginInput} />
                <label>password : </label>
                <input type={"password"} value={password || ""} name={"password"} onChange={handleLoginInput}/>
                <button type={"submit"}>?????????</button>
                <Link href={"/signup"}>
                    <button>????????????</button>
                </Link>
            </Form>
            <Modal head={"????????? ??????"} message={"???????????? ??????????????? ??????????????????."}/>
        </>
    )
}

export default Write
