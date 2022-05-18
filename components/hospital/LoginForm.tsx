import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import styled from "@emotion/styled";
import useInputs from "../../hooks/useInputs";
import {useAppDispatch} from "../../store";
import {setSwitchLogin, setUserInfo} from "../../reduces/user";

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
    const [usersInfo, setUsersInfo] = useState(null)
    const [loginInput,handleLoginInput ,setLoginInput] = useInputs("")
    const { email, password } = loginInput;

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // const formData = new FormData();
        // formData.append('email', email)
        // formData.append('password', password)
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:"same-origin",
            body: JSON.stringify({
                email,
                password
            })
        })
            .then((res) => res.json())
            .then(data => {
                dispatch(setUserInfo(data))
                dispatch(setSwitchLogin(true))
                sessionStorage.setItem('token',data.token)
            })
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
