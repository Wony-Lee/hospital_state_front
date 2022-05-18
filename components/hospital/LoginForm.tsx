import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import styled from "@emotion/styled";
import useInputs from "../../hooks/useInputs";
import {useAppDispatch, useAppSelector} from "../../store";
import {setSwitchLogin, setUserInfo} from "../../reduces/user";
import axios, {AxiosResponse} from "axios";

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
    const userInfo = useAppSelector(state => state.user.userInfo)
    const [usersInfo, setUsersInfo] = useState(null)
    const [loginInput,handleLoginInput] = useInputs("")
    const { email, password } = loginInput;

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`,loginInput)
            .then((res) => {
                    const accessToken = res.data
                    dispatch(setUserInfo(res.data.user))
                    dispatch(setSwitchLogin(true))
                    axios.defaults.headers.common["Authorization"] = `${accessToken.token}`;
                    document.cookie = `jwt=${accessToken.token}`;
                }
            )
        router.push('/')
    } ,[loginInput])
    useEffect(() => {
    }, [usersInfo])
    return (
        <Form onSubmit={handleSubmit}>
            <label>email : </label>
            <input type={"text"} value={email || ""} name={"email"} onChange={handleLoginInput} />
            <label>password : </label>
            <input type={"password"} value={password || ""} name={"password"} onChange={handleLoginInput}/>
            <button type={"submit"}>로그인</button>
        </Form>
    )
}

export default Write
