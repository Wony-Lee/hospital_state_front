import React, {FormEvent, useCallback} from 'react';
import styled from "@emotion/styled";
import useInputs from "../../hooks/useInputs";

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
    const [loginInput,handleLoginInput ,setLoginInput] = useInputs("")
    const { email, password } = loginInput;

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData();

        formData.append('email', email)
        formData.append('password', password)

        for(let val of formData.values()) {
            console.log('value', val)
        }

        const usersInfo = {
            email,
            password
        }

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            })

        })
            .then((res) => res.json())
            .then(data => console.log(data))

    } ,[loginInput])

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